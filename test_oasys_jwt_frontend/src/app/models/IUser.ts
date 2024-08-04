export interface IUser {
  _v?: boolean;
  _id: string;
  nickname: string;
  password?: string;
  type: number;
  lvl: number;
  balance?: number;
}

export type TUserWithoutPassword = Omit<IUser, 'password'>;
