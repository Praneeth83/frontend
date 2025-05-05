import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class token extends Model {
  static table = 'tokens';

  @field('email') email;
  @field('token') token;
}