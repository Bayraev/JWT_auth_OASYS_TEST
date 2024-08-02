import $api from '../http/http';
import { AxiosResponse } from 'axios';
import { IRegCredentials } from '../models/IAuth';
import { IUser } from '../models/IUser';

export default class AuthService {
  static async registration(credentials: IRegCredentials): Promise<AxiosResponse<IUser[]>> {
    const { nickname, password, type, lvl } = credentials;
    return $api.post('/registration', { nickname, password, type, lvl });
  }
}
