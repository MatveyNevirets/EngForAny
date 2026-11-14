import { ageOptions, formatOptions } from './studio-data';

export type LeadInput = { name: string; phone: string; age: string; format: string; website: string };
export type Lead = Omit<LeadInput, 'website'>;
export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export function normalizeRussianPhone(phone: string): string | null {
  if (phone.length > 40 || !/^[+\d\s()\-]+$/.test(phone)) return null;
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 10) digits = `7${digits}`;
  if (digits.length === 11 && digits[0] === '8') digits = `7${digits.slice(1)}`;
  return /^7[3489]\d{9}$/.test(digits) ? `+${digits}` : null;
}

export function validateLead(value: unknown): { lead?: Lead; errors: FieldErrors } {
  const errors: FieldErrors = {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { errors: { name: 'Проверьте данные формы.' } };
  const input = value as Record<string, unknown>;
  const name = typeof input.name === 'string' ? input.name.trim().replace(/\s+/g, ' ') : '';
  if (name.length < 2 || name.length > 60 || !/^[\p{L}\p{M} '\-]+$/u.test(name)) errors.name = 'Введите имя взрослого: от 2 до 60 букв.';
  const phone = typeof input.phone === 'string' ? normalizeRussianPhone(input.phone) : null;
  if (!phone) errors.phone = 'Введите российский номер полностью, например +7 (922) 123-45-67.';
  if (!ageOptions.some(option => option.value === input.age)) errors.age = 'Выберите возрастную группу или «Для себя».';
  if (!formatOptions.some(option => option.value === input.format)) errors.format = 'Выберите один из предложенных вариантов.';
  if (typeof input.website !== 'string' || input.website.length !== 0) errors.website = 'Не удалось проверить форму. Обновите страницу и попробуйте снова.';
  if (Object.keys(errors).length) return { errors };
  return { lead: { name, phone: phone!, age: input.age as string, format: input.format as string }, errors };
}
