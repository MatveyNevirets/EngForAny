import { NextResponse } from 'next/server';
import { validateLead } from '@/lib/lead-validation';
import { sendLeadNotification } from '@/lib/send-lead-notification';
import { demoContent } from '@/lib/studio-data';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 4096;
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  // Next can expose its bind address (0.0.0.0) in request.url. The browser's
  // actual origin uses the incoming Host, or the configured public SITE_URL.
  const url = new URL(request.url);
  const expectedOrigin = process.env.SITE_URL
    ? new URL(process.env.SITE_URL).origin
    : `${url.protocol}//${request.headers.get('host') || url.host}`;
  if (origin && origin !== expectedOrigin) return json({ message: 'Отправьте форму со страницы студии.' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ message: 'Нужен запрос в формате JSON.' }, 415);
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return json({ message: 'Слишком большой запрос.' }, 413);
  let value: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ message: 'Заполните форму.' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      size += chunk.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return json({ message: 'Слишком большой запрос.' }, 413); }
      chunks.push(chunk);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    value = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return json({ message: 'Не удалось прочитать форму. Проверьте данные и попробуйте ещё раз.' }, 400);
  }
  const { lead, errors } = validateLead(value);
  if (!lead) return json({ message: 'Проверьте выделенные поля.', errors }, 400);
  try {
    const result = await sendLeadNotification(lead);
    return json({ ...result, message: demoContent.booking.success });
  } catch {
    return json({ message: 'Не удалось отправить запрос. Данные остались в форме — попробуйте ещё раз или свяжитесь со студией напрямую.' }, 503);
  }
}
