export default {
  schema: './lib/schema.js',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || process.env.TURSO_VALUE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN || process.env.TURSO_CURRENT_AUTH_TOKEN || '',
  },
};
