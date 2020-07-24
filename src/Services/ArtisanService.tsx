import API from '../APIs/Apis';
import { Pagination, Artisans, Tokens } from '../interfaces/interface';
import { TokenValidator } from './TokenValidator';

export default class AuthService {

  tokens: any | Tokens;
  constructor() {
    this.tokens = TokenValidator();

  }

  artisans = API.artisans;

  async createArtisan(data: Artisans) {
    try {
      let response = await fetch(this.artisans + 'create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokens.auth_token}`
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async getArtisans(data: Pagination) {
    try {
      let response = await fetch(
        this.artisans + `all/?page=${data.page}/pageSize=${data.pageSize}/whereCondition=${data.whereCondition}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.tokens.auth_token}`
          }
        });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }



};