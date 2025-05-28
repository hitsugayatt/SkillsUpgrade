import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_DATABASE_URL!,
  },
});
