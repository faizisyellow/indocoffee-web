export type Register = {
  token: string;
};

export type Login = {
  token: string;
  user: {
    id: number;
    email: string;
    role_name: string;
  };
};

export type User = {
  email: string;
  username: string;
  isActive: boolean;
  createdAt: string;
};
