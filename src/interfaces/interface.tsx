export interface Theme {
  text: string;
  background: string;
  primary: string;
  dark: string;
  light: string;
  icon: string;
  secondary?: string;
  border?: string;
  danger?: string;
  info?: string;
  active?: string;
  purple?: string;
  success?: string;
  white?: string;
  warn?: string;
  black?: string;
  surface?: string;
  onPrimary?: string;
  borderColor?: string;
  onSecondary?: string;
  onSurface?: string;
  onBackground?: string;
  variant?: string;
  facebook?: string;
  google?: string;
  apple?: string;
  fonts?: {
    Roboto?: string;
    RobotoMedium?: string;
    ProductSansRegular?: string;
    ProductSansBold?: string;
    ProductSansLight?: string;
    ProductSansMedium?: string;
  };
}

export interface Routes {
  name: string;
  icon: string;
  color: any;
  path: any;
}

export interface Artisans {
  firstname: string;
  lastname: string;
  rating?: number;
  specialization: any;
  imageUrl: any;
  address: any;
  state?: any;
  country?: any;

}

export interface Reducers {
  auth: boolean;
  theme: string
  loading: boolean;
  menu: string;
  user: any;
  tokens: Tokens;
  login: any;
  alert: any;
  artisan: any;
  file: ResponseDetails;
}


export interface Tokens {
  auth_token: string;
  refresh_token: string

}

export interface User {
  user: {
    firstname: string;
    lastname: string;
    lastLogin: string;
    _id: string;
    email: string;
    phoneNumber: string;
    address: string;
    imageUrl: string;
  },
}

export interface Pagination {
  page: number;
  pageSize: number;
  whereCondition: any;
}

export interface ResponseDetails {
  hasErrors: boolean;
  hasResults: boolean;
  successful: boolean;
  result: any,
}

export interface PaginatedResponse {
  hasErrors: boolean;
  hasResults: boolean;
  successful: boolean;
  items: Array<any>;
  total: number;
};