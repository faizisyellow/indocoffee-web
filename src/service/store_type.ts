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
