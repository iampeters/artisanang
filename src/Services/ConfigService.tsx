import API from '../APIs/Apis';
import { Tokens } from '../interfaces/interface';
import { TokenValidator } from './TokenValidator';

export default class FileService {

  config = API.configuration;
  tokens: any | Tokens
  constructor() {
    this.tokens = TokenValidator();
  }

  async fileUpload(data: FormData) {
    try {
      let response = await fetch(this.config + 'fileUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokens.auth_token}`
        },
        body: data,
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }


  async getArtisanDashboard() {
    try {
      let response = await fetch(this.config + 'artisan/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokens.auth_token}`
        },
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async getUserDashboard() {
    try {
      let response = await fetch(this.config + 'users/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokens.auth_token}`
        },
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}