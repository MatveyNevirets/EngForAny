import { verifiedContacts as contacts } from '@/lib/studio-data';
import { Icon } from './illustrations';
import { LegalDocuments, LegalLink } from './legal-documents';

export function SiteFooter() {
  return <footer className="studio-footer"><div className="container">
    <div className="footer-top"><div className="footer-brand"><a className="logo" href="#home"><span className="logo-icon"><Icon name="chat"/></span><span>Студия<br/>английского.</span></a><p>От первых фраз —<br/>к своим большим историям.</p><span className="footer-city">Екатеринбург · Ботанический</span></div>
    <nav aria-label="Программы в футере"><h3>Английский для вас</h3><a href="#programs">Детям 6–8 лет</a><a href="#programs">Школьникам 9–12 лет</a><a href="#programs">Подросткам 13–16 лет</a><a href="#booking">Взрослым</a></nav>
    <nav aria-label="Информация о студии"><h3>Давайте познакомимся</h3><a href="#first-lesson">Первое занятие</a><a href="#location">Как добраться</a><a href={contacts.listingUrl} target="_blank" rel="noopener noreferrer">Студия в 2ГИС <Icon name="arrow"/></a><a href="#booking">Оставить заявку <Icon name="arrow"/></a></nav>
    <div className="footer-contact"><h3>Мы на связи</h3><a className="footer-phone" href={contacts.phoneHref}>{contacts.phone}</a><p>{contacts.fullAddress}</p><a className="footer-max" href={contacts.maxUrl} target="_blank" rel="noopener noreferrer"><Icon name="chat"/>Написать в MAX<Icon name="arrow"/></a><span>Время визита согласуем заранее</span></div></div>
    <div className="footer-bottom"><p>© 2026 Студия английского</p><div><LegalLink kind="privacy">Политика конфиденциальности</LegalLink><LegalLink kind="consent">Согласие на обработку данных</LegalLink></div><a className="footer-up" href="#home">Наверх<Icon name="arrow"/></a></div>
    <p className="footer-caption">Информация о программах носит ознакомительный характер. Стоимость, расписание и условия занятий уточняйте у студии.</p>
  </div><LegalDocuments/></footer>;
}
