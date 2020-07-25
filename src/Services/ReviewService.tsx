import API from '../APIs/Apis';
import { Pagination, Artisans, Tokens, Reviews } from '../interfaces/interface';
import { TokenValidator } from './TokenValidator';

export default class AuthService {

  tokens: any | Tokens;
  constructor() {
    this.tokens = TokenValidator();

  }

  reviews = API.reviews;

  async createReviews(data: Reviews) {
    try {
      let response = await fetch(this.reviews + 'create', {
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

  async getReviews(data: Pagination) {
    try {
      let response = await fetch(
        this.reviews + `all/?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`,
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

  async getReviewDetails(id: string) {
    try {
      let response = await fetch(
        this.reviews + `${id}`,
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

  async updateReview(data: Reviews) {
    try {
      let response = await fetch(
        this.reviews + `${data.reviewId}`,
        {
          method: 'PUT',
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

  async deleteReview(id: string) {
    try {
      let response = await fetch(
        this.reviews + `${id}`,
        {
          method: 'DELETE',
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



};