import { ImageResponse } from 'next/og';
export const alt = 'Студия английского — маленький шаг, большое I can!';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', background: '#FFF8EE', color: '#18162D', padding: '66px', flexDirection: 'column', justifyContent: 'space-between' }}><div style={{ display: 'flex', fontSize: 28 }}>Студия английского · Екатеринбург</div><div style={{ display: 'flex', fontSize: 76, fontWeight: 700, maxWidth: 960, lineHeight: 1.05 }}>Маленький шаг. Большое «I can!»</div><div style={{ display: 'flex', gap: 25, alignItems: 'center' }}><div style={{ display: 'flex', background: '#5634E8', color: '#FFF8EE', padding: '20px 30px', borderRadius: 14, fontSize: 26 }}>Начнём со знакомства</div><div style={{ display: 'flex', fontSize: 25 }}>Родонитовая, 20а</div></div></div>, size);
}
