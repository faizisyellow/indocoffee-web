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

export type Order = {
  alternative_phone_number: string;
  city: string;
  created_at: string;
  customer_email: string;
  customer_name: string;
  id: string;
  items: [
    {
      bean_name: string;
      form_name: string;
      id: number;
      image: string;
      order_quantity: number;
      price: number;
      roasted: string;
    },
  ];
  phone_number: string;
  status: string;
  street: string;
  total_price: number;
};

export type Orders = Order[];

export type OrderCreate = {
  id: string;
};

export type UsersCarts = {
  id: number;
  username: string;
  carts: [
    {
      id: number;
      product: {
        bean: {
          name: string;
        };
        form: {
          name: string;
        };
        id: number;
        image: string;
        price: number;
        roasted: string;
        stock: number;
      };
      quantity: number;
    },
  ];
};
