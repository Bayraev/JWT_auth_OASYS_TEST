import $api from '../http/http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
  static async getCurrentUserById(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/${id}`);
  }

  static async getUsers(): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/`);
  }

  static async getUserBalance(
    id: string,
  ): Promise<AxiosResponse<{ _id: string; balance: number }>> {
    return $api.get(`/users/${id}/balance`);
  }

  static async updUser(user: IUser): Promise<AxiosResponse<IUser>> {
    const { _id } = user;
    return $api.put(`/users/${_id}`, user);
  }
}
