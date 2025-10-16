export type ApiResponse<StoreType> = {
  data: StoreType;
  error: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type ActivationRequest = {
  token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
