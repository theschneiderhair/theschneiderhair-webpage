import websiteTextVariablesJson from '#website-text-variables';
import {formatSiteCopy} from './formatSiteCopy';

/** Shape of `public/data/WebsiteTextVariables.json` — editable UI strings in one place. */
export type WebsiteTextVariables = typeof websiteTextVariablesJson;

export const defaultWebsiteTextVariables = websiteTextVariablesJson as WebsiteTextVariables;

/** Full public-site copy (legal/terms are static HTML: `public/legal.html`, `public/terms.html`). */
export type SiteCopy = WebsiteTextVariables;

export function formatCopy(template: string, vars: Record<string, string | number>): string {
  return formatSiteCopy(template, vars);
}
