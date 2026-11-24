import { useEffect, useState } from 'react';
import { useLanguage } from '../services/LanguageContext.jsx';

function getTimeLeft(target) {
  const diff = new Date(target).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return null;
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export default function Countdown({ target }) {
  const { t } = useLanguage();
  const [left, setLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    setLeft(getTimeLeft(target));
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!left) return <p className="countdown__done">{t.countdown.done}</p>;

  const units = ['days', 'hours', 'minutes', 'seconds'];
  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {units.map((u) => (
        <div className="countdown__unit" key={u}>
          <span className="countdown__number">{String(left[u]).padStart(2, '0')}</span>
          <span className="countdown__label">{t.countdown[u]}</span>
        </div>
      ))}
    </div>
  );
}
