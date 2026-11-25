import { useState } from 'react';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';
import weddingConfig from '../config/wedding.config.js';

// The public link to the invitation page. Uses the current address so it works
// wherever the site is hosted, and always ends with "#/invitation".
function invitationUrl() {
  return `${window.location.href.split('#')[0]}#/invitation`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older phones: fall back to a hidden text box.
    const box = document.createElement('textarea');
    box.value = text;
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.appendChild(box);
    box.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(box);
    return ok;
  }
}

export default function ShareBar() {
  const { lang, t } = useLanguage();
  const { couple, ceremony } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const message = t.invitation.shareText
    .replace('{names}', `${couple.groom[lang]} & ${couple.bride[lang]}`)
    .replace('{date}', ceremony.dateLabel[lang]);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${message}\n${invitationUrl()}`)}`;

  const handleCopy = async () => {
    const ok = await copyText(invitationUrl());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="share">
      <p className="share__title">{t.invitation.share}</p>
      <div className="share__buttons">
        <a className="btn btn--gold" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} strokeWidth={1.6} /> {t.invitation.whatsapp}
        </a>
        <button type="button" className="btn btn--ghost" onClick={handleCopy}>
          {copied ? <Check size={16} strokeWidth={1.6} /> : <Copy size={16} strokeWidth={1.6} />}{' '}
          {copied ? t.invitation.copied : t.invitation.copy}
        </button>
      </div>
    </div>
  );
}
