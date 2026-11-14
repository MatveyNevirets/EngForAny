'use client';

import { useEffect, useRef, useState } from 'react';
import { legalDetails, legalDocuments } from '@/lib/legal-data';

type DocumentKind = keyof typeof legalDocuments;
export function LegalLink({ kind, children }: { kind: DocumentKind; children: React.ReactNode }) {
  return <a href={`#${kind}`} onClick={event => { event.preventDefault(); window.dispatchEvent(new CustomEvent('studio:legal', { detail: kind })); }}>{children}</a>;
}

export function LegalDocuments() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<DocumentKind>('privacy');
  useEffect(() => {
    let opener: HTMLElement | null = null;
    const open = (event: Event) => {
      const nextKind = (event as CustomEvent<DocumentKind>).detail;
      if (!(nextKind in legalDocuments)) return;
      opener = document.activeElement as HTMLElement;
      setKind(nextKind);
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
      if (dialog.current) dialog.current.scrollTop = 0;
    };
    const close = () => { document.body.style.overflow = ''; opener?.focus({ preventScroll: true }); };
    const element = dialog.current;
    window.addEventListener('studio:legal', open);
    element?.addEventListener('close', close);
    return () => { window.removeEventListener('studio:legal', open); element?.removeEventListener('close', close); document.body.style.overflow = ''; };
  }, []);
  const currentDocument = legalDocuments[kind];
  return <dialog ref={dialog} className="legal-dialog" aria-labelledby="legal-title" onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}>
    <div className="legal-dialog-content"><button type="button" className="legal-close" aria-label="Закрыть документ" onClick={() => dialog.current?.close()}>Закрыть <span aria-hidden="true">×</span></button><span className="eyebrow">ДОКУМЕНТЫ СТУДИИ · РЕДАКЦИЯ {legalDetails.version}</span><h2 id="legal-title">{currentDocument.title}</h2><p className="legal-subtitle">{currentDocument.subtitle}</p>
    {!legalDetails.operatorName && <div className="legal-draft"><strong>Проект для согласования с владельцем</strong><p>Реквизиты ниже — заглушки. До их замены и утверждения условий приём реальных заявок не подключён.</p><p>{legalDetails.placeholders.name}<br/>ИНН {legalDetails.placeholders.inn} · {legalDetails.placeholders.registration}<br/>{legalDetails.placeholders.address}<br/>Email: {legalDetails.placeholders.email} (пример, не адрес для обращений)</p></div>}
    {legalDetails.operatorName && <p>{legalDetails.operatorName} · ИНН {legalDetails.inn} · ОГРН(ИП) {legalDetails.registrationNumber}<br/>{legalDetails.legalAddress}<br/>{legalDetails.privacyEmail}</p>}
    {currentDocument.sections.map(section => <section key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}<button type="button" className="button button-primary" onClick={() => dialog.current?.close()}>Вернуться на сайт</button></div>
  </dialog>;
}
