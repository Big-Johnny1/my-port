import { useState, useEffect } from 'react';

type WeatherState =
  | { status: 'loading' }
  | { status: 'ok'; city: string; country: string; temp: number }
  | { status: 'error' };

async function fetchTemp(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  if (!res.ok) throw new Error('weather');
  const data = await res.json();
  return Math.round(data.current_weather.temperature as number);
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        /* IP-based location — no browser permission needed */
        const geo = await fetch('https://ipapi.co/json/').then((r) => r.json());
        const temp = await fetchTemp(geo.latitude, geo.longitude);
        if (!cancelled) {
          setState({
            status: 'ok',
            city: geo.city ?? 'Lagos',
            country: geo.country_code ?? 'NG',
            temp,
          });
        }
      } catch {
        /* Fallback: Lagos coordinates */
        try {
          const temp = await fetchTemp(6.5244, 3.3792);
          if (!cancelled) {
            setState({ status: 'ok', city: 'Lagos', country: 'NG', temp });
          }
        } catch {
          if (!cancelled) setState({ status: 'error' });
        }
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  return state;
}
