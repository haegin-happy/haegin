import { createClient } from '@libsql/client';

export function getDb() {
  const url = process.env.TURSO_VALUE_URL;
  const authToken = process.env.TURSO_CURRENT_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error('Missing Turso environment variables.');
  }

  return createClient({
    url,
    authToken,
  });
}
