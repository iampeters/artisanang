import API from '../APIs/Apis';
import {io} from 'socket.io-client';

export default class NotificationService {

  constructor(
    public socket = io({
      host: API.notifications,
      autoConnect: true
    })
  ) { }
}