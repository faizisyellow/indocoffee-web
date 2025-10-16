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

export type Bean = {
  id: number;
  name: string;
};

export type Beans = Bean[];

export type Form = {
  id: number;
  name: string;
};

export type Forms = Form[];

export type Product = {
  id: number;
  roasted: string;
  bean_id: number;
  bean: {
    name: string;
  };
  form_id: number;
  form: {
    name: string;
  };
  price: number;
  quantity: number;
  image: string;
};

export type Products = Product[];
