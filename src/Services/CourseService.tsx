// import db from '../../db/';
import API from '../APIs/Apis';
import { PaginationConfig } from '../utils/interface/interfaces';

export default class AuthService {
  constructor() {}

  // courses = API.courses;

  // async getCoursesList(state: PaginationConfig) {
  //   try {
  //     let response = await fetch(
  //       this.courses +
  //         `?page=${state.page}&pageSize=${state.pageSize}&whereCondition=${state.whereCondition}`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${state.token}`,
  //           Accept: 'application/json',
  //         },
  //       }
  //     );

  //     return await response.json();
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //   }
  // }

  // async getCourseDetails(courseId: string, token: string) {
  //   try {
  //     let response = await fetch(this.courses + courseId, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return await response.json();
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
