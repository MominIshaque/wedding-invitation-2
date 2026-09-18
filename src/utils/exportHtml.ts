import { WeddingData } from '../types';

export function generateStandaloneHtml(data: WeddingData): string {
  const eventsHtml = data.events
    .map((evt, idx) => {
      return `
          <article class="timeline-item">
            <span class="timeline-node" aria-hidden="true"></span>
            <div class="event">
              <h3>${escapeHtml(evt.name)} ${
                evt.subtitle
                  ? `<small>${escapeHtml(evt.subtitle)}</small>`
                  : ''
              }</h3>
              <div class="day">${escapeHtml(evt.dayOfWeek)}</div>
              <div class="date">
                <div class="date-number">${escapeHtml(evt.dayNumber)}</div>
                <div class="date-month"><strong>${escapeHtml(
                  evt.month
                )}</strong>${escapeHtml(evt.year)}</div>
              </div>
              <div class="hijri">${escapeHtml(evt.hijriDate)}</div>
              <p class="venue">
                ${escapeHtml(evt.timeAndDetails)}<br>
                <strong>${escapeHtml(evt.venueName)}</strong>
                ${escapeHtml(evt.venueAddress)}
              </p>
              ${
                evt.mapsUrl
                  ? `<a class="map-btn" href="${escapeHtml(
                      evt.mapsUrl
                    )}" target="_blank" rel="noopener">View Location</a>`
                  : ''
              }
            </div>
          </article>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(data.hero.groomName)} &amp; ${escapeHtml(
    data.hero.brideName
  )} — Wedding Invitation</title>
<meta name="description" content="Wedding invitation of ${escapeHtml(
    data.hero.groomName
  )} and ${escapeHtml(data.hero.brideName)}." />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Great+Vibes&family=Playfair+Display:wght@400;500;600;700&display=swap');

  :root {
    --ink: #23425a;
    --muted: #6789a0;
    --gold: #5b9bc4;
    --accent: #2f6690;
    --paper: #ffffff;
    --cream: #eaf4fb;
    --line: rgba(91,155,196,.4);
    --line-soft: rgba(91,155,196,.2);
    --shadow: 0 26px 80px rgba(40,80,110,.16);
    --page-1: #eaf4fb;
    --page-2: #dcecf7;
    --gate-bg: #ffffff;
    --gate-bg-2: #eaf4fb;
    --gate-line: rgba(91,155,196,.5);
    --gate-ink: #23425a;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ink: #e4eff7;
      --muted: #a9c4d8;
      --gold: #7fb8de;
      --accent: #9ecbe8;
      --paper: #0f1e2b;
      --cream: #16283a;
      --line: rgba(127,184,222,.32);
      --line-soft: rgba(127,184,222,.16);
      --shadow: 0 26px 90px rgba(0,0,0,.6);
      --page-1: #0a161f;
      --page-2: #101f2c;
      --gate-bg: #0f1e2b;
      --gate-bg-2: #16283a;
      --gate-line: rgba(127,184,222,.45);
      --gate-ink: #e4eff7;
    }
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    color: var(--ink);
    background:
      radial-gradient(circle at 15% 15%, rgba(164,123,75,.09), transparent 25%),
      radial-gradient(circle at 85% 80%, rgba(112,65,65,.08), transparent 28%),
      linear-gradient(var(--page-1), var(--page-2));
    font-family: "Cormorant Garamond", Georgia, serif;
    transition: background .4s ease, color .4s ease;
  }
  body.gate-open { overflow: hidden; }

  a { color: inherit; }
  button { font-family: inherit; }

  :focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }

  svg use, svg path, svg circle, svg rect { color: var(--gold); }

  /* Gate / opening animation */
  .gate {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
  }
  .gate-panel {
    position: relative;
    flex: 1;
    height: 100%;
    background: linear-gradient(180deg, var(--gate-bg) 0%, var(--gate-bg-2) 100%);
    opacity: 1;
    transition: transform 1.05s cubic-bezier(.65,0,.35,1);
    will-change: transform;
    overflow: hidden;
  }
  .gate-panel::before {
    content: "";
    position: absolute;
    top: 24px;
    bottom: 24px;
    opacity: .45;
    pointer-events: none;
  }
  .gate-panel::after {
    content: "";
    position: absolute;
    top: 32px;
    bottom: 32px;
    opacity: .25;
    pointer-events: none;
  }
  .gate-left::before {
    left: 24px;
    right: 0;
    border-top: 1px solid var(--gate-line);
    border-bottom: 1px solid var(--gate-line);
    border-left: 1px solid var(--gate-line);
  }
  .gate-left::after {
    left: 32px;
    right: 0;
    border-top: 1px solid var(--gate-line);
    border-bottom: 1px solid var(--gate-line);
    border-left: 1px solid var(--gate-line);
  }
  .gate-right::before {
    right: 24px;
    left: 0;
    border-top: 1px solid var(--gate-line);
    border-bottom: 1px solid var(--gate-line);
    border-right: 1px solid var(--gate-line);
  }
  .gate-right::after {
    right: 32px;
    left: 0;
    border-top: 1px solid var(--gate-line);
    border-bottom: 1px solid var(--gate-line);
    border-right: 1px solid var(--gate-line);
  }
  .gate-left { border-right: none; }
  .gate-right { border-left: none; }
  .gate.opening .gate-left { transform: translateX(-102%); }
  .gate.opening .gate-right { transform: translateX(102%); }

  .gate-center {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    color: var(--gate-ink);
    transition: opacity .5s ease;
  }
  .gate.opening .gate-center { opacity: 0; pointer-events: none; }

  .gate-eyebrow {
    font-size: clamp(24px, 4.5vw, 50px);
    letter-spacing: .06em;
    color: var(--gold);
    margin: 0 0 12px;
    direction: rtl;
    font-family: Georgia, serif;
  }

  .gate-bismillah {
    margin: 0 0 28px;
    font-size: clamp(14px, 1.8vw, 19px);
    letter-spacing: .18em;
    font-style: italic;
    color: var(--gate-ink);
    opacity: .85;
    text-transform: uppercase;
  }

  .gate-names {
    font-family: "Great Vibes", cursive;
    font-weight: 400;
    font-size: clamp(54px, 10vw, 108px);
    margin: 0;
    line-height: 1.05;
    color: var(--accent);
  }
  .gate-names span { color: var(--gold); font-family: "Cormorant Garamond", serif; font-size: .55em; padding: 0 10px; }

  .gate-tagline {
    margin: 12px 0 36px;
    font-style: italic;
    letter-spacing: .06em;
    color: var(--gate-ink);
    opacity: .9;
    font-size: clamp(19px, 2.8vw, 30px);
  }

  .gate-btn {
    background: transparent;
    border: 2px solid var(--gold);
    color: var(--gate-ink);
    padding: 16px 44px;
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(18px, 2.2vw, 24px);
    letter-spacing: .15em;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    transition: background .25s ease, color .25s ease, transform .15s ease, box-shadow .25s ease;
  }
  .gate-btn:hover { background: var(--gold); color: #ffffff; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,0,0,0.22); }
  .gate-btn:active { transform: translateY(1px); }

  .gate-corner {
    position: absolute;
    width: clamp(52px, 7vw, 84px);
    height: clamp(52px, 7vw, 84px);
    color: var(--gold);
    opacity: .7;
    z-index: 1;
  }
  .gate-corner-tl { top: 24px; left: 24px; }
  .gate-corner-tr { top: 24px; right: 24px; transform: scaleX(-1); }
  .gate-corner-bl { bottom: 24px; left: 24px; transform: scaleY(-1); }
  .gate-corner-br { bottom: 24px; right: 24px; transform: scale(-1,-1); }
  .gate.opening .gate-corner { opacity: 0; transition: opacity .4s ease; }

  /* Main content reveal */
  .wrap {
    min-height: 100vh;
    padding: 28px 16px;
    display: grid;
    place-items: center;
    opacity: 0;
    transform: scale(.97);
    transition: opacity 1s ease .15s, transform 1s ease .15s;
  }
  .wrap.revealed { opacity: 1; transform: scale(1); }

  .invitation {
    width: min(960px, 100%);
    position: relative;
    overflow: hidden;
    background: var(--paper);
    box-shadow: var(--shadow);
    border: 1px solid var(--line);
  }
  .invitation::before,
  .invitation::after {
    content: "";
    position: absolute;
    inset: 15px;
    pointer-events: none;
    border: 1px solid var(--line);
  }
  .invitation::after { inset: 21px; border-color: var(--line-soft); }

  .corner { position: absolute; width: 48px; height: 48px; color: var(--gold); opacity: .55; z-index: 1; }
  .corner-tl { top: 30px; left: 30px; }
  .corner-tr { top: 30px; right: 30px; transform: scaleX(-1); }
  .corner-bl { bottom: 30px; left: 30px; transform: scaleY(-1); }
  .corner-br { bottom: 30px; right: 30px; transform: scale(-1,-1); }

  .hero {
    min-height: 740px;
    padding: 84px 70px 56px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  .arabic { font-size: clamp(25px, 4vw, 38px); margin-bottom: 2px; font-family: Georgia, serif; direction: rtl; }
  .bismillah { font-size: 14px; letter-spacing: .12em; color: var(--muted); font-style: italic; }

  .divider { margin: 22px auto; width: 150px; display: flex; align-items: center; gap: 10px; color: var(--gold); }
  .divider-line { height: 1px; flex: 1; background: var(--line); }
  .diamond { width: 9px; height: 9px; border: 1px solid var(--gold); transform: rotate(45deg); flex-shrink: 0; }

  .request { max-width: 640px; margin: 0 auto 30px; font-size: 19px; line-height: 1.45; font-style: italic; color: var(--muted); white-space: pre-line; }

  .couple-name {
    margin: 0;
    font-family: "Great Vibes", cursive;
    font-weight: 400;
    font-size: clamp(42px, 7vw, 76px);
    line-height: 1.05;
    color: var(--accent);
  }
  .degree { font-family: "Cormorant Garamond", Georgia, serif; font-size: .33em; vertical-align: middle; font-style: normal; letter-spacing: .02em; }
  .sonof { margin: 10px 0 18px; font-size: 17px; font-style: italic; }

  .with { display: inline-flex; align-items: center; gap: 13px; margin: 4px 0 16px; font-size: 17px; letter-spacing: .16em; font-weight: 600; }
  .with::before, .with::after { content: "✦"; color: var(--gold); font-size: 12px; }

  .bride { margin-top: 3px; margin-bottom: 7px; font-size: clamp(38px, 6vw, 64px); }
  .parents { margin: 0; font-size: 17px; font-style: italic; color: var(--muted); }

  .monogram-section {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 6px 40px 44px;
    background: linear-gradient(180deg, transparent, var(--cream) 55%, transparent);
  }
  .monogram-flowers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: var(--gold);
    opacity: .55;
    font-size: 20px;
    margin-bottom: 6px;
  }
  .monogram-flowers span:nth-child(2) { font-size: 26px; opacity: .8; }
  .monogram {
    font-family: "Great Vibes", cursive;
    font-size: clamp(50px, 9vw, 88px);
    color: var(--accent);
    line-height: 1;
  }
  .monogram span { color: var(--gold); font-family: "Cormorant Garamond", serif; font-style: italic; font-size: .5em; padding: 0 10px; }
  .monogram-tagline { max-width: 480px; margin: 12px auto 0; font-style: italic; color: var(--muted); font-size: 17px; line-height: 1.55; }

  .events { padding: 20px 60px 74px; position: relative; z-index: 2; }
  .events-title { text-align: center; font-family: "Playfair Display", Georgia, serif; font-size: 26px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; margin: 0 0 46px; }

  .timeline { position: relative; max-width: 800px; margin: 0 auto; }
  .timeline::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(var(--line-soft), var(--gold), var(--line-soft));
    transform: translateX(-50%);
  }

  .timeline-item { position: relative; width: 50%; padding: 0 46px 54px; }
  .timeline-item:nth-child(odd) { left: 0; text-align: right; }
  .timeline-item:nth-child(even) { left: 50%; text-align: left; }
  .timeline-node {
    position: absolute;
    top: 6px;
    width: 15px; height: 15px;
    background: var(--paper);
    border: 2px solid var(--gold);
    transform: rotate(45deg);
  }
  .timeline-item:nth-child(odd) .timeline-node { right: -8px; }
  .timeline-item:nth-child(even) .timeline-node { left: -8px; }

  .event { display: inline-block; text-align: center; padding: 30px 24px; border: 1px solid var(--line); background: var(--cream); max-width: 340px; width: 100%; }
  .event h3 { margin: 0 0 2px; font-family: "Playfair Display", Georgia, serif; font-size: 26px; letter-spacing: .05em; }
  .event h3 small { font-size: 14px; font-weight: 400; color: var(--muted); }
  .day { text-transform: uppercase; font-size: 15px; letter-spacing: .15em; color: var(--muted); margin-bottom: 12px; }
  .date { display: flex; align-items: center; justify-content: center; gap: 11px; margin: 6px 0 14px; }
  .date-number { font-family: "Playfair Display", Georgia, serif; font-size: 50px; line-height: 1; color: var(--accent); }
  .date-month { text-align: left; line-height: 1.1; font-size: 15px; letter-spacing: .08em; text-transform: uppercase; }
  .date-month strong { display: block; font-size: 18px; }
  .hijri { font-size: 15px; font-style: italic; color: var(--muted); margin-bottom: 12px; }
  .venue { font-size: 17px; line-height: 1.45; margin: 0 auto 16px; }
  .venue strong { display: block; font-weight: 600; }

  .map-btn {
    display: inline-block;
    padding: 9px 18px;
    border: 1px solid var(--gold);
    color: var(--ink);
    text-decoration: none;
    font-size: 14px;
    letter-spacing: .08em;
    text-transform: uppercase;
    transition: .2s ease;
  }
  .map-btn:hover { background: var(--gold); color: var(--paper); }

  .footer { text-align: center; padding: 0 30px 60px; position: relative; z-index: 2; }
  .compliments { font-family: "Great Vibes", cursive; color: var(--accent); font-size: 32px; margin: 0 0 5px; }
  .friends { font-size: 18px; font-style: italic; color: var(--muted); margin: 0; }

  .countdown { margin: 30px auto 0; max-width: 600px; padding: 18px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .countdown-label { font-size: 14px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .timer { display: flex; justify-content: center; gap: clamp(12px, 4vw, 34px); }
  .timer div { min-width: 58px; }
  .timer b { display: block; font-family: "Playfair Display", Georgia, serif; font-size: 27px; font-weight: 500; }
  .timer span { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }

  .share-row { margin-top: 34px; }
  .wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border: 1px solid var(--gold);
    color: var(--ink);
    text-decoration: none;
    font-size: 15px;
    letter-spacing: .06em;
    transition: .2s ease;
  }
  .wa-btn:hover { background: var(--gold); color: var(--paper); }
  .wa-btn svg { width: 18px; height: 18px; flex-shrink: 0; }

  .top-link { display: inline-block; margin-top: 26px; color: var(--muted); text-decoration: none; font-size: 14px; }

  @media (max-width: 700px) {
    .wrap { padding: 0; }
    .invitation { min-height: 100vh; border: 0; }
    .invitation::before { inset: 10px; }
    .invitation::after { inset: 15px; }
    .hero { min-height: 700px; padding: 64px 26px 40px; }
    .events { padding: 10px 20px 60px; }
    .request { font-size: 17px; }
    .corner { width: 54px; height: 54px; }
    .corner-tl, .corner-tr { top: 16px; }
    .corner-bl, .corner-br { bottom: 16px; }
    .corner-tl, .corner-bl { left: 16px; }
    .corner-tr, .corner-br { right: 16px; }

    .timeline::before { left: 20px; }
    .timeline-item,
    .timeline-item:nth-child(odd),
    .timeline-item:nth-child(even) {
      width: 100%;
      left: 0;
      text-align: left;
      padding: 0 20px 44px 52px;
    }
    .timeline-item:nth-child(odd) .timeline-node,
    .timeline-item:nth-child(even) .timeline-node { left: 12px; right: auto; }
    .event { max-width: 100%; }
  }
</style>
</head>
<body class="gate-open" id="top">

  <!-- Shared ornament symbols -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <!-- Simple, Clean & Aesthetic Corner Accent -->
    <symbol id="ornVine" viewBox="0 0 100 100">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer primary corner bracket -->
        <path d="M 64 10 L 10 10 L 10 64" stroke-width="1.3" />
        <!-- Inner delicate pinstripe -->
        <path d="M 46 18 L 18 18 L 18 46" stroke-width="0.8" opacity="0.65" />
      </g>
      <!-- Subtle diamond point -->
      <polygon points="18,15 21,18 18,21 15,18" fill="currentColor" />
    </symbol>
    <symbol id="ornStar" viewBox="0 0 120 120">
      <g fill="none" stroke="currentColor" stroke-width="2.2">
        <rect x="30" y="30" width="60" height="60"/>
        <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)"/>
      </g>
      <circle cx="60" cy="60" r="5" fill="currentColor"/>
    </symbol>
  </svg>

  <!-- Opening gate -->
  <div class="gate" id="gate">
    <div class="gate-panel gate-left">
      <svg class="gate-corner gate-corner-tl" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
      <svg class="gate-corner gate-corner-bl" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
    </div>
    <div class="gate-panel gate-right">
      <svg class="gate-corner gate-corner-tr" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
      <svg class="gate-corner gate-corner-br" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
    </div>
    <div class="gate-center">
      <p class="gate-eyebrow">${escapeHtml(data.gate.bismillahArabic)}</p>
      <p class="gate-bismillah">${escapeHtml(data.gate.bismillahEnglish)}</p>
      <h1 class="gate-names">${escapeHtml(
        data.gate.shortGroomName
      )} <span>&amp;</span> ${escapeHtml(data.gate.shortBrideName)}</h1>
      <p class="gate-tagline">${escapeHtml(data.gate.tagline)}</p>
      <button id="openGate" class="gate-btn" aria-label="Open the wedding invitation">${escapeHtml(
        data.gate.buttonText || 'Open the Invitation'
      )}</button>
    </div>
  </div>

  <main class="wrap" id="wrap">
    <article class="invitation">
      <svg class="corner corner-tl" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
      <svg class="corner corner-tr" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
      <svg class="corner corner-bl" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>
      <svg class="corner corner-br" viewBox="0 0 100 100" aria-hidden="true"><use href="#ornVine"/></svg>

      <section class="hero">
        <div class="arabic">${escapeHtml(data.hero.bismillahArabic)}</div>
        <div class="bismillah">${escapeHtml(data.hero.bismillahEnglish)}</div>

        <div class="divider"><span class="divider-line"></span><span class="diamond"></span><span class="divider-line"></span></div>

        <p class="request">${escapeHtml(data.hero.invitersText)}</p>

        <h1 class="couple-name">
          ${escapeHtml(data.hero.groomName)} <span class="degree">${escapeHtml(
    data.hero.groomDegree
  )}</span>
        </h1>
        <p class="sonof">${escapeHtml(data.hero.groomParentage)} ${escapeHtml(
    data.hero.groomGrandfather
  )}</p>

        <div class="with">WITH</div>

        <h2 class="couple-name bride">
          ${escapeHtml(data.hero.brideName)} <span class="degree">${escapeHtml(
    data.hero.brideDegree
  )}</span>
        </h2>
        <p class="parents">${escapeHtml(data.hero.brideParentage)}</p>

        <div class="divider"><span class="divider-line"></span><span class="diamond"></span><span class="divider-line"></span></div>
        <div class="bismillah">${escapeHtml(data.hero.closingWord)}</div>
      </section>

      <section class="monogram-section">
        <div class="monogram-flowers"><span>❧</span><span>✿</span><span>❧</span></div>
        <div class="monogram">${escapeHtml(
          data.monogram.groomInitial
        )} <span>&amp;</span> ${escapeHtml(data.monogram.brideInitial)}</div>
        <p class="monogram-tagline">${escapeHtml(data.monogram.quote)}</p>
      </section>

      <section class="events">
        <h2 class="events-title">${escapeHtml(data.eventsTitle)}</h2>
        <div class="timeline">
          ${eventsHtml}
        </div>
      </section>

      <footer class="footer">
        <p class="compliments">${escapeHtml(data.footer.complimentsHeader)}</p>
        <p class="friends">${escapeHtml(data.footer.complimentsFrom)}</p>

        <div class="countdown">
          <div class="countdown-label">${escapeHtml(
            data.footer.countdownLabel
          )}</div>
          <div class="timer">
            <div><b id="days">--</b><span>Days</span></div>
            <div><b id="hours">--</b><span>Hours</span></div>
            <div><b id="minutes">--</b><span>Minutes</span></div>
            <div><b id="seconds">--</b><span>Seconds</span></div>
          </div>
        </div>

        <div class="share-row">
          <a class="wa-btn" href="#" target="_blank" rel="noopener" aria-label="Share this invitation via WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.65-1.22A9 9 0 1 0 12 3Z"/>
              <path d="M8.5 8.6c.2-.4.5-.4.8-.4h.6c.2 0 .5 0 .7.5.3.6.9 1.9.9 2.1.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.5.8 1.1 1.5 1.9 2 .4.3.9.5 1.2.3.2-.1.4-.4.6-.6.2-.2.4-.3.6-.2.2.1 1.5.7 1.8.9.2.1.4.2.5.3.1.2.1.9-.2 1.4-.4.6-1.5 1.1-2 1.1-.6 0-1.5-.2-3.6-1.5-2.5-1.6-4.1-4.1-4.3-4.4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.8-2.1Z" fill="currentColor" stroke="none"/>
            </svg>
            Share Invitation
          </a>
        </div>

        <a class="top-link" href="#top">↑ Back to top</a>
      </footer>

    </article>
  </main>

  <script>
    const weddingDate = new Date("${data.footer.countdownTargetIso}").getTime();

    function updateCountdown() {
      const now = Date.now();
      const distance = weddingDate - now;
      const days = document.getElementById("days");
      const hours = document.getElementById("hours");
      const minutes = document.getElementById("minutes");
      const seconds = document.getElementById("seconds");

      if (!days || !hours || !minutes || !seconds) return;

      if (distance <= 0) {
        days.textContent = "0"; hours.textContent = "00"; minutes.textContent = "00"; seconds.textContent = "00";
        return;
      }
      days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours.textContent = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      minutes.textContent = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");
      seconds.textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    function buildShareLinks() {
      const message = "${escapeJs(data.footer.shareMessageTemplate)}\\n" + window.location.href;
      const link = "https://wa.me/?text=" + encodeURIComponent(message);
      document.querySelectorAll(".wa-btn").forEach(el => el.setAttribute("href", link));
    }
    buildShareLinks();

    const gate = document.getElementById("gate");
    const wrap = document.getElementById("wrap");
    const openBtn = document.getElementById("openGate");

    function openInvitation() {
      gate.classList.add("opening");
      wrap.classList.add("revealed");
      document.body.classList.remove("gate-open");
      window.setTimeout(() => {
        gate.style.display = "none";
      }, 1050);
    }
    if (openBtn) openBtn.addEventListener("click", openInvitation);
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJs(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}
