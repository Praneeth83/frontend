import { tableSchema } from '@nozbe/watermelondb';

export const userSchema = tableSchema({
  name: 'tokens',
  columns: [
    { name: 'email', type: 'string' },
    { name: 'token', type: 'string' },
  ],
});