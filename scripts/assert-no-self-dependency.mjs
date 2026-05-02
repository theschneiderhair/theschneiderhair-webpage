/**
 * Fails install if package.json lists itself as a dependency (e.g. after `pnpm add .`).
 * @license Apache-2.0
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const name = typeof pkg.name === 'string' ? pkg.name.trim() : '';
if (!name) process.exit(0);

const sections = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
for (const section of sections) {
  const deps = pkg[section];
  if (!deps || typeof deps !== 'object') continue;
  if (Object.prototype.hasOwnProperty.call(deps, name)) {
    console.error(
      `\n[assert-no-self-dependency] Remove "${name}" from "${section}" (self link). Do not run \`pnpm add .\` in this repo.\n`,
    );
    process.exit(1);
  }
}
