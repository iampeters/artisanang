import API from '../APIs/Apis';
import { TokenValidator } from './TokenValidator';
import { Tokens, Pagination } from '../interfaces/interface';

export default class JobService {

  jobs = API.jobs;
  tokens: any | Tokens

  constructor() {
    this.tokens = TokenValidator();
  }

  async getJobs(data: Pagination) {
    try {
      let response = await fetch(this.jobs + `all?page=${data.page}&&pageSize=${data.pageSize}&&whereCondition=${data.whereCondition}`, {
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

  async getJobDetails(id: any) {
    try {
      let response = await fetch(this.jobs + `${id}`, {
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

  async createJob(data: any) {
    try {
      let response = await fetch(this.jobs + 'create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tokens.auth_token}`
        },
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}