import type { Environment } from 'vitest';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { Client } from 'pg';
import { execSync } from 'node:child_process';

dotenv.config({ path: '.env.test' });

const dbUser = process.env.DATABASE_USER;
const dbPass = process.env.DATABASE_PASS;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;

const dbSchema = `test_new_${randomUUID()}`;
const connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${dbSchema}`;

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup(global, options = {}) {
    process.env.DATABASE_URL = connectionString;
    global.process.env.DATABASE_URL = connectionString;

    await execSync(`npx prisma migrate deploy`);

    return {
      async teardown() {
        const client = new Client({
          connectionString: process.env.DATABASE_URL,
        });
        console.log(process.env.DATABASE_URL);
        await client.connect();
        //await client.query(`DROP SCHEMA IF EXISTS "${dbSchema}" CASCADE`);
        await client.end();
      },
    };
  },
};
