import { test, expect, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function noOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    offenders: Array.from(document.querySelectorAll('main *')).filter(el => {
      if (el.closest('svg') || el.classList.contains('honeypot')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
    }).map(el => `${el.tagName}.${el.className}`).slice(0, 8),
  }));
  expect(result.scrollWidth, JSON.stringify(result)).toBeLessThanOrEqual(result.width);
  expect(result.offenders, JSON.stringify(result)).toEqual([]);
}

test('visual layout and complete demo booking journey', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await mkdir('artifacts/qa', { recursive: true });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Английский,на котором ребёнок заговорит смелее');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await noOverflow(page);
  await page.screenshot({ path: `artifacts/qa/${testInfo.project.name}-hero.png`, animations: 'disabled', fullPage: false });

  await page.getByRole('button', { name: 'Добавить разговор' }).click();
  await expect(page.locator('#lead-age')).toHaveValue('9-12');
  await expect(page.locator('.selection-notice')).toHaveText('Выбрано: 9–12 лет');
  await expect(page.locator('.form-card h3')).toBeFocused();
  await expect(page.locator('.mobile-booking')).not.toHaveClass(/is-shown/);
  await noOverflow(page);

  await page.locator('.travel-section').scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: 'Едем из другого города' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Поймём, получится ли приезжать');
  await page.getByRole('tab', { name: 'Хотим сначала обсудить онлайн' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Его доступность пока не подтверждена');
  await noOverflow(page);
  await page.locator('.travel-section').screenshot({ path: `artifacts/qa/${testInfo.project.name}-travel.png`, animations: 'disabled', style: '.site-header,.mobile-booking,.skip-link{visibility:hidden!important}' });
  await page.getByRole('button', { name: 'Обсудить формат без поездки' }).click();
  await expect(page.locator('#lead-format')).toHaveValue('online-discussion');
  await expect(page.locator('#lead-age')).toHaveValue('9-12');

  await page.getByLabel('Имя взрослого', { exact: true }).fill('Тест');
  await page.getByLabel('Телефон', { exact: true }).fill('12345');
  await page.getByRole('button', { name: 'Отправить запрос на знакомство' }).click();
  await expect(page.locator('#error-phone')).toContainText('Введите российский номер полностью');
  await expect(page.locator('#lead-phone')).toBeFocused();
  await expect(page.locator('#lead-name')).toHaveValue('Тест');
  await expect(page.locator('.mobile-booking')).not.toHaveClass(/is-shown/);
  await page.locator('#lead-phone').fill('8 (999) 000-00-00');
  await page.locator('#lead-phone').blur();
  await page.locator('.booking-grid').screenshot({ path: `artifacts/qa/${testInfo.project.name}-form.png`, animations: 'disabled', style: '.site-header,.mobile-booking,.skip-link{visibility:hidden!important}' });

  // One transient delivery error: values must survive and retry must work.
  await page.route('**/api/leads', async route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ message: 'Проверка ошибки: повторите отправку.' }) }), { times: 1 });
  await page.getByRole('button', { name: 'Отправить запрос на знакомство' }).click();
  await expect(page.locator('.form-message[role="alert"]')).toHaveText('Проверка ошибки: повторите отправку.');
  await expect(page.locator('#lead-phone')).toHaveValue('8 (999) 000-00-00');
  const request = page.waitForRequest(req => req.url().endsWith('/api/leads') && req.method() === 'POST');
  await page.getByRole('button', { name: 'Отправить запрос на знакомство' }).click();
  const submitted = await request;
  expect(submitted.postDataJSON().phone).toBe('+79990000000');
  await expect(page.locator('.form-success')).toContainText('Демо: форма сработала. Сообщение в MAX не отправлено');
  await expect(page.locator('.form-success')).toBeFocused();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await noOverflow(page);

  await page.getByRole('button', { name: 'I am an orange juice.' }).click();
  await expect(page.locator('.lesson-feedback')).toContainText('Попробуйте ещё раз');
  await page.getByRole('button', { name: 'Can I have an orange juice, please?' }).click();
  await expect(page.locator('.lesson-feedback')).toContainText('Of course! Here you are.');
  await page.getByRole('button', { name: 'Сколько стоят занятия?' }).click();
  await expect(page.locator('#faq-a-2')).toContainText('цены не опубликованы');
  await expect(page.getByRole('button', { name: 'Сколько стоят занятия?' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Ищу занятия для себя' }).click();
  await expect(page.locator('#lead-age')).toHaveValue('adult');
  await expect(page.locator('#lead-format')).toHaveValue('online-discussion');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#programs').scrollIntoViewIfNeeded();
  await expect(page.locator('.floating-sticker')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  if ((page.viewportSize()?.width || 0) < 700) await expect(page.locator('.mobile-booking')).toHaveClass(/is-shown/);
  for (const selector of ['#home', '#programs', '#first-lesson', '.travel-section', '.faq-section', '#booking', '#location', '.site-footer']) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await noOverflow(page);
  }
  const tooSmallFields = await page.locator('input:not([name="website"]),select').evaluateAll(elements => elements.filter(el => parseFloat(getComputedStyle(el).fontSize) < 16).length);
  expect(tooSmallFields).toBe(0);
  expect(errors).toEqual([]);
});

test('API rejects invalid, oversized, honeypot and cross-origin requests', async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-1440', 'API is engine-independent');
  const valid = { name: 'Тест', phone: '8 (999) 000-00-00', age: '6-8', format: '', website: '' };
  const response = await request.post('/api/leads', { data: valid, headers: { origin: 'http://localhost:3000' } });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ mode: 'demo', delivered: false });
  expect(response.headers()['cache-control']).toBe('no-store');
  const invalid = await request.post('/api/leads', { data: { ...valid, phone: '123', age: 'unknown' } });
  expect(invalid.status()).toBe(400);
  expect((await invalid.json()).errors).toMatchObject({ phone: expect.any(String), age: expect.any(String) });
  expect((await request.post('/api/leads', { data: { ...valid, website: 'bot' } })).status()).toBe(400);
  expect((await request.post('/api/leads', { data: { ...valid, name: 'A'.repeat(5000) } })).status()).toBe(413);
  expect((await request.post('/api/leads', { data: valid, headers: { origin: 'https://unrelated.example' } })).status()).toBe(403);
  expect((await request.post('/api/leads', { data: '{bad json', headers: { 'content-type': 'application/json' } })).status()).toBe(400);
  expect((await request.post('/api/leads', { data: 'plain text', headers: { 'content-type': 'text/plain' } })).status()).toBe(415);
  const home = await request.get('/');
  expect(home.headers()['x-robots-tag']).toBe('noindex, nofollow');
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  expect((await request.get('/opengraph-image')).headers()['content-type']).toContain('image/png');
});
