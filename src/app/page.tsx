import { demoContent as content, verifiedContacts as contacts } from '@/lib/studio-data';
import { HeroArtwork, Icon, LocalMap } from '@/components/illustrations';
import { FAQ, LeadForm, MiniLesson, PageEffects, SelectButton, TravelPlanner } from '@/components/interactive';

function Logo() {
  return <a className="logo" href="#home" aria-label="Студия английского — на главную"><span className="logo-icon"><Icon name="chat" /></span><span>{contacts.shortName.split(' ')[0]}<br/>{contacts.shortName.split(' ')[1]}<span className="logo-dot">.</span></span></a>;
}

export default function Home() {
  return <>
    <header className="site-header"><div className="container header-inner"><Logo/><nav className="desktop-nav" aria-label="Основная навигация"><a href="#programs">{content.nav.programs}</a><a href="#first-lesson">{content.nav.first}</a><a href="#location">{content.nav.location}</a></nav><a className="button button-small button-ink" href="#booking">{content.nav.book}<Icon name="arrow" /></a></div></header>
    <main id="main">
      <section className="hero container" id="home" aria-labelledby="hero-heading">
        <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="status-dot"/>{content.hero.eyebrow}</div><h1 id="hero-heading">{content.hero.titleLines[0]}<br/>{content.hero.titleLines[1]}{' '}<span className="hero-highlight">{content.hero.titleLines[2]}<br className="desktop-break"/>{' '}{content.hero.titleLines[3]}<svg viewBox="0 0 340 18" preserveAspectRatio="none" aria-hidden="true"><path d="M4 13Q160-4 335 8"/></svg></span></h1><p className="hero-description">{content.hero.intro}</p><div className="hero-actions"><a className="button button-primary" href="#booking">{content.nav.fullBook}<Icon name="arrow"/></a><a className="secondary-link" href="#programs">{content.hero.secondary}<Icon name="arrow"/></a></div><p className="hero-note">{content.hero.note}</p><a className="hero-address" href={contacts.directionsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin"/><span>{contacts.address}<span className="address-separator"> / </span><span className="address-district">{contacts.district}</span></span><Icon name="arrow"/></a></div>
        <div className="hero-art-wrap"><span className="art-top-note">{content.hero.topNote}</span><HeroArtwork/><span className="art-bottom-note"><span className="little-line"/>{content.hero.bottom}</span></div>
        <div className="hero-page-number" aria-hidden="true">{content.hero.englishNote}</div>
      </section>
      <div className="ribbon" aria-hidden="true"><div className="container ribbon-inner">{content.ribbon.map(text => <span key={text}><Icon name="star"/>{text}</span>)}</div></div>

      <section className="programs section container" id="programs" aria-labelledby="programs-heading">
        <div className="section-heading" data-reveal><div><span className="eyebrow">{content.programs.eyebrow}</span><h2 id="programs-heading">{content.programs.title}</h2></div><p>{content.programs.intro}</p></div>
        <div className="program-grid">{content.programs.items.map((program, i) => <article className={`program-card program-${program.color}`} key={program.id} data-reveal style={{ '--delay': `${i * 90}ms` } as React.CSSProperties}><div className="program-top"><span className="age-tag">{program.age}</span><span className="program-symbol"><Icon name={program.icon}/></span></div><span className="demo-label">{content.programs.label}</span><h3>{program.title}</h3><p className="program-problem">{program.problem}</p><div className="program-tasks"><span className="task-caption">{content.programs.tasksCaption}</span>{program.tasks.map(task => <p key={task}><Icon name="check"/>{task}</p>)}</div><SelectButton age={program.id} className="program-select">{program.action}</SelectButton></article>)}</div>
        <div className="adult-path"><span>{content.programs.adultNote}</span><SelectButton age="adult" className="text-link">{content.programs.adult}</SelectButton></div>
      </section>

      <section className="first-section" id="first-lesson" aria-labelledby="first-heading"><div className="container section">
        <div className="first-heading" data-reveal><div><span className="eyebrow">{content.first.eyebrow}</span><h2 id="first-heading">{content.first.title}</h2></div><span className="first-sticker"><Icon name="chat"/><span>{content.first.sticker[0]}<br/>{content.first.sticker[1]}</span></span></div>
        <p className="first-demo-label">{content.first.label}</p>
        <div className="first-steps" data-reveal><svg className="step-connector" viewBox="0 0 1000 75" preserveAspectRatio="none" aria-hidden="true"><path d="M25 46C180-35 250 100 360 43S590-10 690 42s170 28 285-15"/></svg>{content.first.steps.map((step, i) => <article className="first-step" key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        <MiniLesson/>
      </div></section>

      <section className="travel-section section container" aria-labelledby="travel-heading"><div className="travel-heading" data-reveal><span className="eyebrow">{content.travel.eyebrow}</span><h2 id="travel-heading">{content.travel.title}</h2><p>{content.travel.intro}</p></div><TravelPlanner/></section>

      <section className="faq-section section container" aria-labelledby="faq-heading"><div className="faq-heading" data-reveal><span className="eyebrow">{content.faq.eyebrow}</span><h2 id="faq-heading">{content.faq.title}<span className="question-doodle" aria-hidden="true">?</span></h2><p>{content.faq.intro}</p><a className="text-link" href={contacts.listingUrl} target="_blank" rel="noopener noreferrer">{content.faq.listing}<Icon name="arrow"/></a></div><FAQ/></section>

      <section className="booking-section" id="booking" aria-labelledby="booking-heading"><div className="container section"><div className="booking-heading" data-reveal><div><span className="eyebrow">{content.booking.eyebrow}</span><h2 id="booking-heading">{content.booking.title}</h2></div><div><p>{content.booking.intro}</p><p className="demo-notice"><span className="demo-label">Демоусловия</span>{content.booking.demoNotice}</p></div></div>
        <div className="booking-grid"><LeadForm/><aside className="contact-card" id="location" aria-labelledby="contact-heading"><span className="eyebrow">{content.booking.contactEyebrow}</span><h3 id="contact-heading">{content.booking.contactsTitle}</h3><p className="contact-address">{contacts.address}<span>{contacts.city}, микрорайон {contacts.district}</span></p><div className="map-wrap"><LocalMap/><span>{content.booking.mapNote}</span></div><div className="walk-info"><Icon name="route"/><div><strong>{contacts.walkEstimate}</strong><small>{contacts.walkSource}</small></div></div><a className="button button-outline" href={contacts.directionsUrl} target="_blank" rel="noopener noreferrer">{content.booking.route}<Icon name="arrow"/></a><a className="contact-phone" href={contacts.phoneHref}>{contacts.phone}</a><div className="contact-links"><a className="text-link" href={contacts.phoneHref}><Icon name="phone"/>{content.booking.call}</a><a className="text-link" href={contacts.maxUrl} target="_blank" rel="noopener noreferrer"><Icon name="chat"/>{content.booking.max}</a></div></aside></div>
      </div></section>
    </main>
    <footer className="site-footer container"><Logo/><p>{content.footer.note}<br/><a href="#demo-privacy">{content.footer.privacy}</a></p><a className="back-top text-link" href="#home">{content.footer.top}<Icon name="arrow"/></a></footer>
    <PageEffects/>
  </>;
}
