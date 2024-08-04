import { IUser } from '../models/IUser';

export const deletePropertyFromObj = (obj: IUser, property: any) => {
  return { ...obj, [property]: property };
};
