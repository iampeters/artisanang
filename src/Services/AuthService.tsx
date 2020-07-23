// import db from '../../db/';
import API from '../APIs/Apis';

export default class AuthService {
  // constructor() {}

  token = API.identity + 'token';
  socialAuthentication = API.social + 'auth';
  create = API.users + 'create';
  // getUserDetails = API.users;
  // updateUserDetails = API.users + 'update';

  async login(data: any) {
    try {
      let response = await fetch(this.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async signUp(data: any) {
    try {
      let response = await fetch(this.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }


  async socialAuth(data: any) {
    try {
      let response = await fetch(this.socialAuthentication, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  // async register(data: any) {
  //   try {
  //     let response = await fetch(this.create, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     return await response.json();
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async getUser(id: string) {
  //   try {
  //     let response = await fetch(this.getUserDetails + id, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     return await response.json();
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async updateUser(data: object) {
  //   try {
  //     let response = await fetch(this.updateUserDetails, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     return await response.json();
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
