export interface IRegCredentials {
  nickname: string;
  password: string;
  type: number;
  lvl: number;
}

export interface IAuthCredentials {
  nickname: string;
  password: string;
}

export type TRegAuthCredentials = IRegCredentials | IAuthCredentials;
