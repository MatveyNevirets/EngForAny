type IconName = 'arrow' | 'star' | 'chat' | 'pin' | 'check' | 'phone' | 'route' | 'plus' | 'cup';
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'arrow' && <path d="M5 12h14M13 5l7 7-7 7" />}
    {name === 'star' && <path d="m12 2 2.8 6.8L22 12l-7.2 2.6L12 22l-2.8-7.4L2 12l7.2-3.2L12 2Z" />}
    {name === 'chat' && <path d="M20.5 10.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 3V10.5A8.5 8.5 0 0 1 10.5 2H12a8.5 8.5 0 0 1 8.5 8.5ZM7 8h9M7 12h6" />}
    {name === 'pin' && <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>}
    {name === 'check' && <path d="m5 12 4 4L19 6" />}
    {name === 'phone' && <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3c-1 5-4 5-7 4C8 19 5 16 3 10 2 7 2 4 7 3Z" />}
    {name === 'route' && <><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h9a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h4"/></>}
    {name === 'plus' && <path d="M5 12h14M12 5v14" />}
    {name === 'cup' && <><path d="M5 7h12v9a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V7ZM17 8h2a3 3 0 1 1 0 6h-2M8 2v2M13 2v2"/></>}
  </svg>;
}

export function HeroArtwork() {
  return <svg className="hero-art" viewBox="0 0 570 570" role="img" aria-labelledby="hero-art-title">
    <title id="hero-art-title">Пример урока: яркая карточка миссии с напитком и диалогом Can I try? — Of course!</title>
    <defs>
      <pattern id="art-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0v28" fill="none" stroke="#18162D" strokeOpacity=".075"/></pattern>
      <pattern id="cup-stripes" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="9" height="18" fill="#5634E8"/><rect x="9" width="9" height="18" fill="#FFF8EE"/></pattern>
    </defs>
    <g className="art-sheet" transform="rotate(7 300 280)">
      <rect x="98" y="63" width="386" height="449" rx="9" fill="#18162D"/>
      <rect x="91" y="55" width="386" height="449" rx="9" fill="#DAD0FF" stroke="#18162D" strokeWidth="2"/>
      <rect x="91" y="55" width="386" height="449" rx="9" fill="url(#art-grid)"/>
      <path d="M91 116h386" stroke="#18162D" strokeWidth="2"/>
      <circle cx="114" cy="85" r="5" fill="#5634E8"/><circle cx="133" cy="85" r="5" fill="#FF846B"/><circle cx="152" cy="85" r="5" fill="#DDF46B"/>
      <text x="350" y="91" textAnchor="end" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="13" fill="#18162D">MISSION / 01</text>
      <text x="121" y="153" fontFamily="Manrope Variable, sans-serif" fontWeight="750" fontSize="12" letterSpacing="2" fill="#5634E8">ТВОЯ МИССИЯ</text>
      <text x="120" y="193" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="29" fill="#18162D">Попробовать.</text>
      <text x="120" y="229" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="29" fill="#18162D">Даже с ошибкой.</text>
      <path d="M126 460h153M126 472h113" stroke="#18162D" strokeOpacity=".3" strokeWidth="2"/>
      <text x="442" y="477" textAnchor="end" fontFamily="Manrope Variable, sans-serif" fontWeight="700" fontSize="11" fill="#18162D">LET’S TRY!</text>
    </g>
    <g className="art-cup" transform="rotate(-9 300 356)">
      <path d="m310 290 28-82h36" fill="none" stroke="#18162D" strokeWidth="17" strokeLinecap="round"/>
      <path d="m310 290 28-82h36" fill="none" stroke="url(#cup-stripes)" strokeWidth="12" strokeLinecap="round"/>
      <path d="M216 308h161l-20 129c-35 17-89 15-121-2Z" fill="#FF846B" stroke="#18162D" strokeWidth="3"/>
      <ellipse cx="296" cy="307" rx="81" ry="15" fill="#FFC09E" stroke="#18162D" strokeWidth="3"/>
      <path d="m242 321 10 99" stroke="#FFF8EE" strokeWidth="9" strokeLinecap="round" opacity=".7"/>
      <circle cx="284" cy="361" r="5" fill="#18162D"/><circle cx="325" cy="361" r="5" fill="#18162D"/>
      <path d="M290 380q16 19 31-1" fill="none" stroke="#18162D" strokeWidth="3" strokeLinecap="round"/>
      <path d="M223 354c-40-3-53-22-45-40m191 45c24 4 34-10 39-28M260 447l-7 24-20 4m93-27 9 24 20-2" fill="none" stroke="#18162D" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g className="art-bubble art-bubble-one" transform="rotate(-10 112 266)"><path d="M34 226h170a15 15 0 0 1 15 15v47a15 15 0 0 1-15 15h-28l-18 19v-19H34a15 15 0 0 1-15-15v-47a15 15 0 0 1 15-15Z" fill="#FFF8EE" stroke="#18162D" strokeWidth="2"/><text x="119" y="277" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="27" fill="#18162D">Can I try?</text></g>
    <g className="art-bubble art-bubble-two" transform="rotate(5 448 363)"><path d="M365 324h171a14 14 0 0 1 14 14v47a14 14 0 0 1-14 14H411l-22 20v-20h-24a14 14 0 0 1-14-14v-47a14 14 0 0 1 14-14Z" fill="#5634E8" stroke="#18162D" strokeWidth="2"/><text x="451" y="374" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="25" fill="#FFF8EE">Of course!</text></g>
    <g className="floating-sticker" transform="rotate(11 460 100)"><path d="m460 13 16 28 30-10 1 33 31 10-20 26 20 27-31 10-1 32-30-10-16 28-17-28-30 10-1-32-30-10 20-27-20-26 30-10 1-33 30 10Z" fill="#DDF46B" stroke="#18162D" strokeWidth="2"/><text x="460" y="83" textAnchor="middle" fill="#18162D" fontSize="15" fontWeight="800" fontFamily="Manrope Variable, sans-serif">I CAN</text><path d="m443 103 10 11 24-27" fill="none" stroke="#18162D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g>
    <g className="parallax-star"><path d="m54 100 8 24 26 7-26 8-8 25-8-25-25-8 25-7Z" fill="#FF846B" stroke="#18162D" strokeWidth="2"/></g>
    <path d="M25 399c-15 37 20 67 54 41 29-22 20-66-2-48-16 13 6 53 49 63" fill="none" stroke="#5634E8" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 6"/>
    <g transform="rotate(-7 145 496)"><rect x="35" y="470" width="220" height="62" rx="3" fill="#DDF46B" stroke="#18162D" strokeWidth="1.5"/><text x="145" y="496" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="13" fill="#18162D">маленький шаг,</text><text x="145" y="516" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="13" fill="#18162D">большое «I can!»</text></g>
  </svg>;
}

export function RouteArtwork() {
  return <svg className="route-art" viewBox="0 0 340 205" fill="none" aria-hidden="true">
    <path d="M25 155C82 180 82 38 157 63s38 125 114 42" stroke="#5634E8" strokeWidth="2" strokeDasharray="6 7"/>
    <g transform="rotate(-9 61 143)"><rect x="22" y="112" width="76" height="48" rx="11" fill="#DDF46B" stroke="#18162D" strokeWidth="2"/><path d="m37 112 10-22h30l12 22M48 94l-5 18m27-18 9 18" stroke="#18162D" strokeWidth="2"/><circle cx="41" cy="162" r="9" fill="#18162D"/><circle cx="83" cy="162" r="9" fill="#18162D"/><path d="M32 129h10m37 0h10" stroke="#18162D" strokeWidth="3"/></g>
    <path d="M305 55c0 28-35 56-35 56s-35-28-35-56a35 35 0 0 1 70 0Z" fill="#FF846B" stroke="#18162D" strokeWidth="2"/><circle cx="270" cy="55" r="12" fill="#FFF8EE" stroke="#18162D" strokeWidth="2"/>
    <path d="m165 119 4 13 14 4-14 4-4 14-4-14-14-4 14-4Z" fill="#5634E8"/>
    <path d="m107 34 3 8 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#FF846B"/>
  </svg>;
}

export function LocalMap() {
  return <svg className="local-map" viewBox="0 0 440 236" role="img" aria-label="Условная схема: студия на Родонитовой, 20а и метро Ботаническая. Точный маршрут — в 2ГИС.">
    <defs><pattern id="map-grid" width="27" height="27" patternUnits="userSpaceOnUse"><path d="M27 0H0v27" fill="none" stroke="#18162D" strokeOpacity=".055"/></pattern></defs>
    <rect width="440" height="236" fill="#FFF8EE"/><rect width="440" height="236" fill="url(#map-grid)"/>
    <path d="M-20 73h480M104-10v256M300-10v256" stroke="#EAE3D8" strokeWidth="25"/>
    <path d="M-20 73h480M104-10v256M300-10v256" stroke="#FFFDF9" strokeWidth="20"/>
    <rect x="137" y="105" width="127" height="42" rx="8" fill="#DDF46B"/><rect x="334" y="109" width="70" height="78" rx="8" fill="#E4DDFA"/>
    <path d="M123 173h177v-59" fill="none" stroke="#5634E8" strokeWidth="3" strokeDasharray="5 5"/>
    <circle cx="112" cy="188" r="14" fill="#18162D"/><path d="m104 194 2-12 6 8 6-8 2 12" fill="none" stroke="#FFF8EE" strokeWidth="2"/>
    <path d="M317 93c0 14-17 29-17 29s-17-15-17-29a17 17 0 1 1 34 0" fill="#5634E8" stroke="#FFF8EE" strokeWidth="2"/><circle cx="300" cy="93" r="5" fill="#FFF8EE"/>
    <text x="135" y="195" fontFamily="Manrope Variable, sans-serif" fontWeight="750" fontSize="12" fill="#18162D">Ботаническая</text>
    <rect x="214" y="24" width="168" height="35" rx="5" fill="#18162D"/><text x="298" y="46" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="700" fontSize="13" fill="#FFF8EE">Родонитовая, 20а</text>
  </svg>;
}
