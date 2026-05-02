/**
 * Generates public/legal.html and public/terms.html from:
 * - content/site-copy.legal.en.json
 * - public/data/WebsiteTextVariables.json (impressum block for legal page only)
 *
 * Run: node scripts/render-static-legal-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const legalJson = JSON.parse(fs.readFileSync(path.join(root, 'content/site-copy.legal.en.json'), 'utf8'));
const websiteText = JSON.parse(
  fs.readFileSync(path.join(root, 'public/data/WebsiteTextVariables.json'), 'utf8'),
);
const impressum = websiteText.impressum ?? {};

const ownerName = impressum.ownerName ?? 'Dennis Schneider';
const tradingName = impressum.tradingName ?? 'theschneider.hair';
const addressLines = (impressum.addressLines ?? 'Berlin\nGermany').split('\n').map((l) => l.trim()).filter(Boolean);
const contactEmail = impressum.contactEmail ?? 'theschneiderhair@gmail.com';
const contactPhone = impressum.contactPhone ?? '';

const css = `
:root { color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; background: #fafaf9; color: #44403c; line-height: 1.65; }
a { color: #57534e; }
a:hover { color: #1c1917; }
.wrap { max-width: 1000px; margin: 0 auto; padding: 8rem 1.5rem 4rem; }
.nav { margin-bottom: 2rem; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; }
.nav a { text-decoration: none; color: #a8a29e; }
.nav a:hover { color: #57534e; }
header { border-bottom: 1px solid #e7e5e4; padding-bottom: 2.5rem; margin-bottom: 3rem; }
h1 { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 400; color: #1c1917; margin: 0 0 0.5rem; }
.sub { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #a8a29e; }
.grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media (min-width: 768px) {
  .grid { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 3rem; }
}
.aside h4 { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a8a29e; margin: 0 0 0.5rem; }
.aside p { margin: 0; font-size: 0.875rem; color: #57534e; font-weight: 300; line-height: 1.6; }
.aside .block { margin-bottom: 2rem; }
.owner { font-weight: 500; color: #1c1917; }
main h3 { font-family: Georgia, serif; font-size: 1.25rem; color: #1c1917; margin: 0 0 1.5rem; }
.sec h4 { font-size: 0.75rem; font-weight: 500; color: #1c1917; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
.sec p { margin: 0 0 0.75rem; font-size: 0.875rem; color: #57534e; font-weight: 300; text-align: justify; }
.sec ul { margin: 0 0 0.75rem; padding-left: 1.25rem; font-size: 0.875rem; color: #57534e; font-weight: 300; }
.sec li { margin-bottom: 0.25rem; }
.divider { height: 1px; background: #e7e5e4; width: 3rem; margin: 2.5rem 0; }
.data-block { margin-bottom: 2.5rem; }
`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderGdprElement(el) {
  if (el.type === 'p') {
    return `<p>${esc(el.text)}</p>`;
  }
  if (el.type === 'ul') {
    const items = el.items.map((item) => `<li>${esc(item)}</li>`).join('');
    return `<ul>${items}</ul>`;
  }
  if (el.type === 'plink') {
    const inner = el.parts
      .map((part) =>
        part.href
          ? `<a href="${esc(part.href)}" target="_blank" rel="noreferrer">${esc(part.text)}</a>`
          : esc(part.text),
      )
      .join('');
    return `<p>${inner}</p>`;
  }
  return '';
}

function renderGdprSection(section) {
  const body = section.elements.map(renderGdprElement).join('\n');
  return `<div class="data-block sec"><h4>${esc(section.heading)}</h4>${body}</div>`;
}

const lp = legalJson.legalPage;

const legalAside = `
<div class="aside">
  <div class="block">
    <h4>${esc(lp.aside.ownerLabel)}</h4>
    <p class="owner">${esc(ownerName)}</p>
  </div>
  <div class="block">
    <h4>${esc(lp.aside.addressLabel)}</h4>
    <p>${esc(tradingName)}${addressLines.map((line) => `<br>${esc(line)}`).join('')}</p>
  </div>
  <div class="block">
    <h4>${esc(lp.aside.contactLabel)}</h4>
    <p>${esc(lp.aside.emailPrefix)} <a href="mailto:${esc(contactEmail)}">${esc(contactEmail)}</a><br>${esc(lp.aside.phonePrefix)} ${esc(contactPhone)}</p>
  </div>
</div>`;

const dataController = `
<div class="data-block sec">
  <h4>${esc(lp.dataControllerHeading)}</h4>
  <p>${esc(tradingName)}</p>
  <p>${esc(ownerName)}</p>
  ${addressLines.map((line) => `<p>${esc(line)}</p>`).join('')}
  <p>${esc(lp.gdprEmailPrefix)} <a href="mailto:${esc(contactEmail)}">${esc(contactEmail)}</a></p>
  <p>${esc(lp.aside.phonePrefix)} ${esc(contactPhone)}</p>
</div>`;

const gdprRest = lp.gdprSections.map(renderGdprSection).join('<div class="divider"></div>\n');

const legalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(lp.header.title)} — theschneider.hair</title>
  <style>${css}</style>
</head>
<body>
  <div class="wrap">
    <nav class="nav"><a href="index.html">← Back to Home</a> · <a href="terms.html">Terms &amp; Conditions</a></nav>
    <header>
      <h1>${esc(lp.header.title)}</h1>
      <p class="sub">${esc(lp.header.subtitle)}</p>
    </header>
    <section class="grid">
      ${legalAside}
      <div>
        <main>
          <h3>${esc(lp.privacyMainTitle)}</h3>
          ${dataController}
          <div class="divider"></div>
          ${gdprRest}
        </main>
      </div>
    </section>
  </div>
</body>
</html>`;

const tp = legalJson.termsPage;
const termsAside = `
<div class="aside">
  <div class="block">
    <h4>${esc(tp.aside.ownerLabel)}</h4>
    <p class="owner">${esc(tp.aside.ownerName)}</p>
  </div>
  <div class="block">
    <h4>${esc(tp.aside.addressLabel)}</h4>
    <p>${tp.aside.addressLines.map((line) => esc(line)).join('<br>')}</p>
  </div>
</div>`;

const termsSections = tp.sections
  .map(
    (sec, idx) => `
<div class="sec">
  <h4>${esc(sec.heading)}</h4>
  ${sec.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
</div>
${idx < tp.sections.length - 1 ? '<div class="divider"></div>' : ''}`,
  )
  .join('\n');

const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(tp.header.title)} — theschneider.hair</title>
  <style>${css}</style>
</head>
<body>
  <div class="wrap">
    <nav class="nav"><a href="index.html">← Back to Home</a> · <a href="legal.html">Legal &amp; Privacy</a></nav>
    <header>
      <h1>${esc(tp.header.title)}</h1>
      <p class="sub">${esc(tp.header.subtitle)}</p>
    </header>
    <section class="grid">
      ${termsAside}
      <div>
        <main>
          <h3>${esc(tp.mainTitle)}</h3>
          ${termsSections}
        </main>
      </div>
    </section>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(root, 'public/legal.html'), legalHtml, 'utf8');
fs.writeFileSync(path.join(root, 'public/terms.html'), termsHtml, 'utf8');
console.log('Wrote public/legal.html and public/terms.html');
