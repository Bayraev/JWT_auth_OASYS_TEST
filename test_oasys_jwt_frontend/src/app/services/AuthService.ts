import $api from '../http/http';
import { AxiosResponse } from 'axios';
import { IAuthCredentials, IRegCredentials } from '../models/IAuth';
import { IUser } from '../models/IUser';

export default class AuthService {
  static async registration(credentials: IRegCredentials): Promise<AxiosResponse<IUser[]>> {
    const { nickname, password, type, lvl } = credentials;
    return $api.post('/registration', { nickname, password, type, lvl });
  }

  static async authorization(credentials: IAuthCredentials): Promise<AxiosResponse<IUser[]>> {
    const { nickname, password } = credentials;
    return $api.post('/login', { nickname, password });
  }

  static async getCurrentUserById(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/${id}`);
  }

  static async getUsers(): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/`);
  }
}
