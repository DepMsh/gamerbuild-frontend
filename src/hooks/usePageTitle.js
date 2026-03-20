import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    const base = 'PCBux';
    document.title = title ? `${title} | ${base}` : `${base} — جمّع جهازك | أول منصة سعودية لتجميعات القيمنق`;
  }, [title]);
}
