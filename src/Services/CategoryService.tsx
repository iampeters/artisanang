import API from '../APIs/Apis';
import { TokenValidator } from './TokenValidator';
import { Tokens, Pagination } from '../interfaces/interface';

export default class CategoryService {
  
  tokens: Tokens | any;
  category = API.category;

  constructor() {
    this.tokens = TokenValidator();
  }

  async getCategory(data: Pagination) {
    try {
      let response = await fetch(
        this.category + `?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`,
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

}