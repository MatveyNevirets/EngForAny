'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ageOptions, demoContent, formatOptions, verifiedContacts } from '@/lib/studio-data';
import { validateLead, type FieldErrors, type LeadInput } from '@/lib/lead-validation';
import { maskRussianPhone } from '@/lib/phone-mask';
import { Icon, RouteArtwork } from './illustrations';

type Selection = { age?: string; format?: string };
function choose(selection: Selection) {
  window.dispatchEvent(new CustomEvent<Selection>('studio:choose', { detail: selection }));
}

export function SelectButton({ age, children, className = '' }: { age: string; children: React.ReactNode; className?: string }) {
  const [chosen, setChosen] = useState(false);
  return <button type="button" className={className} data-chosen={chosen} onClick={() => { setChosen(true); choose({ age }); }}>{children}<Icon name="arrow" /></button>;
}

export function MiniLesson() {
  const text = demoContent.lesson;
  const [answer, setAnswer] = useState<number | null>(null);
  const correct = answer === 0;
  return <div className="mini-lesson" data-reveal>
    <div className="lesson-intro"><span className="eyebrow">{text.eyebrow}</span><h3>{text.title}</h3><p>{text.intro}</p><small>{text.note}</small></div>
    <div className="lesson-play">
      <div className="lesson-question"><span className="cup-icon"><Icon name="cup" /></span><span>{text.question}</span></div>
      <div className="lesson-answers" aria-label="Выберите реплику">
        {text.answers.map((option, i) => <button type="button" key={option} className={`answer ${answer === i ? correct ? 'correct' : 'retry' : ''}`} onClick={() => setAnswer(i)} aria-pressed={answer === i}><span className="answer-letter">{i === 0 ? 'A' : 'B'}</span><span>{option}</span>{answer === i && <Icon name={correct ? 'check' : 'chat'} />}</button>)}
      </div>
      <div className={`lesson-feedback ${answer !== null ? 'has-answer' : ''}`} aria-live="polite" aria-atomic="true">
        {answer !== null && <div key={answer} className="feedback-in"><strong>{correct ? text.correctTitle : text.retryTitle}</strong><p>{correct ? text.correctText : text.retryText}</p>{correct && <button type="button" className="text-link" onClick={() => setAnswer(null)}>{text.again}<Icon name="arrow" /></button>}</div>}
      </div>
    </div>
  </div>;
}

export function TravelPlanner() {
  const text = demoContent.travel;
  const [selected, setSelected] = useState(0);
  const item = text.items[selected];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function changeTab(index: number) { setSelected(index); tabs.current[index]?.focus(); }
  return <div className="travel-planner">
    <div className="travel-tabs" role="tablist" aria-label="Как вы планируете добираться">
      {text.items.map((tab, i) => <button key={tab.id} ref={el => { tabs.current[i] = el; }} type="button" role="tab" aria-selected={selected === i} aria-controls="travel-panel" id={`travel-tab-${i}`} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => {
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          changeTab(event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : 2)) % 3);
        }
      }}><span className="tab-number">0{i + 1}</span>{tab.tab}<Icon name="arrow" /></button>)}
    </div>
    <div id="travel-panel" className="travel-panel" role="tabpanel" aria-labelledby={`travel-tab-${selected}`} tabIndex={0}>
      <div className="travel-panel-inner" key={item.id}><RouteArtwork /><span className="demo-label">Демоусловия</span><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={verifiedContacts.directionsUrl} target="_blank" rel="noopener noreferrer">{item.link}<Icon name="route" /></a><div className="travel-next"><Icon name="check" /><span>{item.next}</span></div></div>
      <button type="button" className="button button-primary" onClick={() => choose({ format: item.id })}>{text.action}<Icon name="arrow" /></button>
      <small className="travel-caveat">{text.caveat}</small>
    </div>
  </div>;
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{demoContent.faq.items.map((item, i) => <div key={item.question} className={`faq-item ${open === i ? 'is-open' : ''}`}>
    <h3><button type="button" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => setOpen(open === i ? null : i)}>{item.question}<Icon name="plus" /></button></h3>
    <div id={`faq-a-${i}`} className="faq-answer" inert={open !== i} role="region" aria-labelledby={`faq-q-${i}`}><div><p>{item.answer}</p></div></div>
  </div>)}</div>;
}

export function LeadForm() {
  const text = demoContent.booking;
  const [fields, setFields] = useState<LeadInput>({ name: '', phone: '', age: '', format: '', website: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [selectionNotice, setSelectionNotice] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  useEffect(() => {
    const listener = (event: Event) => {
      const selected = (event as CustomEvent<Selection>).detail;
      setFields(previous => ({ ...previous, ...selected }));
      setStatus('idle'); setErrors({}); setMessage('');
      const selectedLabels = [ageOptions.find(o => o.value === selected.age)?.label, formatOptions.find(o => selected.format && o.value === selected.format)?.label].filter(Boolean);
      setSelectionNotice(`Выбрано: ${selectedLabels.join(' · ')}`);
      document.getElementById('booking')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
    };
    window.addEventListener('studio:choose', listener);
    return () => window.removeEventListener('studio:choose', listener);
  }, []);

  function update(key: keyof LeadInput, value: string) {
    setFields(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    if (status === 'error') { setMessage(''); setStatus('idle'); }
  }
  function updatePhone(input: HTMLInputElement) {
    const raw = input.value;
    const caret = input.selectionStart ?? raw.length;
    let digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length;
    const digits = raw.replace(/\D/g, '');
    if (digits && digits[0] !== '7' && digits[0] !== '8') digitsBefore += 1;
    const formatted = maskRussianPhone(raw);
    update('phone', formatted);
    // Position by digits rather than characters, so editing in the middle works.
    let position = 0, seen = 0;
    while (position < formatted.length && seen < digitsBefore) {
      if (/\d/.test(formatted[position])) seen++;
      position++;
    }
    if (caret === raw.length) position = formatted.length;
    requestAnimationFrame(() => input.setSelectionRange(position, position));
  }
  function focusError(nextErrors: FieldErrors) {
    const field = ['name', 'phone', 'age', 'format'].find(key => nextErrors[key as keyof LeadInput]);
    if (field) requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const validation = validateLead(fields);
    setErrors(validation.errors); setMessage('');
    if (!validation.lead) { setStatus('error'); setMessage('Проверьте выделенные поля.'); focusError(validation.errors); return; }
    submitting.current = true; setStatus('pending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...validation.lead, website: fields.website }), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.mode !== 'demo' || result.delivered !== false) {
        if (result.errors) { setErrors(result.errors); focusError(result.errors); }
        throw new Error(result.message || 'Не удалось проверить заявку. Попробуйте ещё раз.');
      }
      setStatus('success');
      // Discard contact details after successful processing; nothing is persisted.
      setFields(previous => ({ ...previous, name: '', phone: '', website: '' }));
      requestAnimationFrame(() => successRef.current?.focus({ preventScroll: true }));
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error && error.name !== 'AbortError' ? error.message : 'Не удалось связаться с сайтом. Данные остались в форме. Попробуйте ещё раз.');
    } finally { window.clearTimeout(timeout); submitting.current = false; }
  }
  return <div className="form-card">
    <h3 ref={headingRef} tabIndex={-1}>{text.formTitle}</h3>
    <p className="selection-notice" role="status">{selectionNotice || 'Выберите возраст — остальное обсудим вместе.'}</p>
    {status === 'success' ? <div className="form-success" ref={successRef} tabIndex={-1} role="status"><div className="success-icon"><Icon name="check" /></div><h4>{text.success}</h4><p>{text.successDetail}</p><a href={verifiedContacts.maxUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">{text.max}<Icon name="arrow" /></a><button className="text-link" type="button" onClick={() => { setStatus('idle'); requestAnimationFrame(() => headingRef.current?.focus()); }}>{text.another}</button></div> :
    <form ref={formRef} onSubmit={submit} noValidate aria-busy={status === 'pending'}>
      <div className="form-field"><label htmlFor="lead-name">{text.name}</label><input id="lead-name" name="name" autoComplete="given-name" placeholder="Как к вам обращаться?" maxLength={60} value={fields.name} onChange={event => update('name', event.target.value)} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} />{errors.name && <p className="field-error" id="error-name">{errors.name}</p>}</div>
      <div className="form-field"><label htmlFor="lead-phone">{text.phone}</label><input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 999 99 99" maxLength={40} value={fields.phone} onChange={event => updatePhone(event.currentTarget)} onKeyDown={event => {
        const input = event.currentTarget;
        let start = input.selectionStart ?? 0;
        if (start !== input.selectionEnd) return;
        if (event.key === 'Backspace') {
          while (start > 0 && !/\d/.test(input.value[start - 1])) start--;
          input.setSelectionRange(start, start);
        } else if (event.key === 'Delete') {
          while (start < input.value.length && !/\d/.test(input.value[start])) start++;
          input.setSelectionRange(start, start);
        }
      }} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'error-phone' : undefined} />{errors.phone && <p className="field-error" id="error-phone">{errors.phone}</p>}</div>
      <div className="form-row"><div className="form-field"><label htmlFor="lead-age">{text.age}</label><select id="lead-age" name="age" value={fields.age} onChange={event => update('age', event.target.value)} required aria-invalid={!!errors.age} aria-describedby={errors.age ? 'error-age' : undefined}><option value="" disabled>Выберите возраст</option>{ageOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errors.age && <p className="field-error" id="error-age">{errors.age}</p>}</div><div className="form-field"><label htmlFor="lead-format">{text.format}<span>{text.optional}</span></label><select id="lead-format" name="format" value={fields.format} onChange={event => update('format', event.target.value)} aria-invalid={!!errors.format} aria-describedby={errors.format ? 'error-format' : undefined}>{formatOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errors.format && <p className="field-error" id="error-format">{errors.format}</p>}</div></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="lead-website">Ваш сайт</label><input id="lead-website" name="website" autoComplete="off" tabIndex={-1} value={fields.website} onChange={event => update('website', event.target.value)} /></div>
      <button className="button button-primary submit-button" type="submit" disabled={status === 'pending'}>{status === 'pending' ? text.pending : text.submit}<Icon name="arrow" /></button>
      <p className="form-message" role="alert">{status === 'error' ? message : ''}</p>
      <p className="form-disclaimer">{text.disclaimer}</p><p className="form-consent" id="demo-privacy">{text.consent}</p>
    </form>}
  </div>;
}

export function PageEffects() {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); } }), { threshold: .12 });
    // Only hide offscreen elements after JS is running; no-JS content stays visible.
    elements.forEach(element => { if (element.getBoundingClientRect().top > window.innerHeight && !motion.matches) element.classList.add('will-reveal'); reveal.observe(element); });
    let heroVisible = true, formVisible = false;
    const update = () => setSticky(!heroVisible && !formVisible && !/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName || ''));
    const sections = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.target.id === 'home') heroVisible = entry.isIntersecting; if (entry.target.id === 'booking') formVisible = entry.isIntersecting; }); update(); });
    ['home', 'booking'].forEach(id => { const element = document.getElementById(id); if (element) sections.observe(element); });
    document.addEventListener('focusin', update); document.addEventListener('focusout', update);
    window.visualViewport?.addEventListener('resize', update);
    const reduce = () => { if (motion.matches) elements.forEach(element => element.classList.add('is-visible')); };
    motion.addEventListener('change', reduce);
    const artwork = document.querySelector<HTMLElement>('.hero-art-wrap');
    let frame = 0;
    const parallax = (event: PointerEvent) => {
      if (motion.matches || !window.matchMedia('(min-width: 1000px) and (pointer: fine)').matches || !artwork) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { artwork.style.setProperty('--px', `${(event.clientX / innerWidth - .5) * 12}px`); artwork.style.setProperty('--py', `${(event.clientY / innerHeight - .5) * 8}px`); });
    };
    document.addEventListener('pointermove', parallax, { passive: true });
    return () => { reveal.disconnect(); sections.disconnect(); cancelAnimationFrame(frame); document.removeEventListener('focusin', update); document.removeEventListener('focusout', update); document.removeEventListener('pointermove', parallax); window.visualViewport?.removeEventListener('resize', update); motion.removeEventListener('change', reduce); };
  }, []);
  return <div className={`mobile-booking ${sticky ? 'is-shown' : ''}`} inert={!sticky}><a href="#booking" className="button button-primary">{demoContent.nav.fullBook}<Icon name="arrow" /></a></div>;
}
