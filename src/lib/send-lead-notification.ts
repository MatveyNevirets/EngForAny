import 'server-only';
import type { Lead } from './lead-validation';
import { ageOptions, formatOptions } from './studio-data';

// Prepared for a future server adapter. Never log this string or expose bot secrets.
export function formatLeadMessage(lead: Lead): string {
  return [
    'Новая заявка с сайта',
    `Имя взрослого: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Возрастная группа: ${ageOptions.find(option => option.value === lead.age)?.label ?? lead.age}`,
    `Формат: ${formatOptions.find(option => option.value === lead.format)?.label ?? 'Выберем вместе'}`,
  ].join('\n');
}

// Deliberately no fetch, database, file writes, logging or MAX Bot API calls.
// Setting environment variables never switches this adapter into live mode.
export async function sendLeadNotification(_lead: Lead): Promise<{ mode: 'demo'; delivered: false }> {
  void _lead;
  return { mode: 'demo', delivered: false };
}
