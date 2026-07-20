import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

function requireEnv(name, fallbackName) {
  const value = process.env[name] || (fallbackName ? process.env[fallbackName] : '');

  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }

  return value;
}

const client = createClient({
  url: requireEnv('TURSO_DATABASE_URL', 'TURSO_VALUE_URL'),
  authToken: requireEnv('TURSO_AUTH_TOKEN', 'TURSO_CURRENT_AUTH_TOKEN'),
});

export const db = drizzle(client, {
  schema,
});

export { schema };
