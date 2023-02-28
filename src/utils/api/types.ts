export type LoginDto = {
  login: string;
  password: string;
};

export type CreateUserDto = {} & LoginDto;

type Donate = {
  name: string;
  buyDate: string;
  serverName: string;
};

export type ResponseUser = {
  id?: string;
  _id?: string;
  userId: string;
  avatarUrl: string;
  login: string;
  email: string;
  token?: string;
  createdAt?: string;
  balance?: number;
  donate?: Donate;
};
