import {TokenTypes} from '../services/asyncStorage';

export const baseUrl = 'http://localhost:3000';

export const TOKEN: {access: TokenTypes; refresh: TokenTypes} = {
  access: 'ACCESS_TOKEN',
  refresh: 'REFRESH_TOKEN',
};
