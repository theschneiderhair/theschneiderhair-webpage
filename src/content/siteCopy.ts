import websiteTextVariablesJson from '#website-text-variables';
import type {LegalTermsCopy} from './legalSiteCopy';
import {formatSiteCopy} from './formatSiteCopy';

/** Shape of `public/data/WebsiteTextVariables.json` — editable UI strings in one place. */
export type WebsiteTextVariables = typeof websiteTextVariablesJson;

export const defaultWebsiteTextVariables = websiteTextVariablesJson as WebsiteTextVariables;

/** Full public-site copy: editable website text + legal/terms blocks. */
export type SiteCopy = WebsiteTextVariables & LegalTermsCopy;

export function formatCopy(template: string, vars: Record<string, string | number>): string {
  return formatSiteCopy(template, vars);
}
