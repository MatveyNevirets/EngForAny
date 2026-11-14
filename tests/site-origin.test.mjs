import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceptsRequestOrigin, publicSiteOrigin } from '../src/lib/site-origin.ts';

function withOrigins(values, run) {
  const keys = ['SITE_URL', 'DEPLOY_PRIME_URL', 'URL'];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  try {
    for (const key of keys) {
      if (values[key]) process.env[key] = values[key];
      else delete process.env[key];
    }
    run();
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}
const request = origin => new Request('http://internal-function/api/leads', { headers: { origin } });

test('local server accepts its browser Host, rejects foreign Origin', () => withOrigins({}, () => {
  assert.equal(publicSiteOrigin(), 'http://localhost:3000');
  assert.equal(acceptsRequestOrigin(new Request('http://0.0.0.0:3000/api/leads', { headers: { host: 'localhost:3000', origin: 'http://localhost:3000' } })), true);
  assert.equal(acceptsRequestOrigin(request('https://foreign.example')), false);
}));

test('Netlify production origin works behind an internal HTTP proxy', () => withOrigins({ URL: 'https://english-studio.netlify.app' }, () => {
  assert.equal(publicSiteOrigin(), 'https://english-studio.netlify.app');
  assert.equal(acceptsRequestOrigin(request('https://english-studio.netlify.app')), true);
  assert.equal(acceptsRequestOrigin(request('https://foreign.example')), false);
}));

test('Netlify deploy previews have working metadata and form origin', () => withOrigins({ URL: 'https://english-studio.netlify.app', DEPLOY_PRIME_URL: 'https://deploy-preview-12--english-studio.netlify.app' }, () => {
  assert.equal(publicSiteOrigin(), 'https://deploy-preview-12--english-studio.netlify.app');
  assert.equal(acceptsRequestOrigin(request('https://deploy-preview-12--english-studio.netlify.app')), true);
  assert.equal(acceptsRequestOrigin(request('https://evil.netlify.app')), false);
  assert.equal(acceptsRequestOrigin(request('null')), false);
}));

test('custom domain takes precedence without breaking deployment previews', () => withOrigins({ SITE_URL: 'https://english.example.ru/', DEPLOY_PRIME_URL: 'https://preview--english-studio.netlify.app', URL: 'https://english-studio.netlify.app' }, () => {
  assert.equal(publicSiteOrigin(), 'https://english.example.ru');
  for (const origin of ['https://english.example.ru', 'https://preview--english-studio.netlify.app', 'https://english-studio.netlify.app']) assert.equal(acceptsRequestOrigin(request(origin)), true);
  assert.equal(acceptsRequestOrigin(request('https://english.example.ru.evil.example')), false);
}));
