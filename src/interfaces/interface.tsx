export interface Theme {
  text: string;
  textPrimary: string;
  background: string;
  primary: string;
  dark: string;
  light: string;
  transparent: string;
  transparentSurface: string;
  icon: string;
  appBar: string;
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
  rating?: string;
  apple?: string;
  fonts?: {
    Roboto?: string;
    RobotoMedium?: string;
    ProductSansRegular?: string;
    ProductSansBold?: string;
    ProductSansLight?: string;
    ProductSansMedium?: string;
    LemonadaMedium?: string;
    LemonadaBold?: string;
    LemonadaLight?: string;
    LemonadaSemiBold?: string;
    LemonadaRegular?: string;
    RubikRegular?: string;
    RubikMedium?: string;
    RubikLight?: string;
    RubikItalic?: string;
    RubikBold?: string;
  };
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
}

export interface Routes {
  name: string;
  icon: string;
  color: any;
  path?: any;
  button?: any;
  className?: any;
}

export interface Artisans {
  firstname?: string;
  name?: string;
  lastname?: string;
  rating?: number;
  phoneNumber?: string;
  email?: string;
  specialization?: string;
  imageUrl?: string;
  address?: string;
  state?: string;
  country?: string;
  reviews?: any;
  onClick?: any;
  _id?: string;
  businessName?: string;
  RCNumber?: string;
  NIN?: string;
}

export interface Reviews {
  title?: string;
  description?: string;
  rating?: any;
  reviews?: any;
  artisanId?: string;
  reviewId?: string;
  userId?: any;
  _id?: any;
  onClick?: any;
}

export interface Reducers {
  auth: boolean;
  theme: string
  loading: boolean;
  profileEditDrawer: boolean;
  menu: string;
  changePasswordDrawer: boolean;
  navBar: boolean;
  user: User;
  tokens: Tokens;
  login: any;
  alert: any;
  artisan: ResponseDetails;
  file: ResponseDetails;
  reviews: ResponseDetails
  jobs: ResponseDetails
}

export interface Tokens {
  auth_token: string;
  refresh_token: string
}

export interface User {
  firstname?: string;
  lastname?: string;
  lastLogin?: string;
  createdOn?: string;
  _id?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  imageUrl?: string;
  state?: string;
  country?: string;
}

export interface Pagination {
  page?: any | number;
  pageSize?: any | number;
  whereCondition?: any;
  total?: any | number;
  onChange?: any;
  onPageSizeChange?: any;
}

export interface ResponseDetails {
  hasErrors?: boolean;
  hasResults?: boolean;
  successful?: boolean;
  result?: any,
  items?: Array<any>;
  total?: any | number;
}

export interface Search {
  onChange?: any;
  onClick?: any;
  value: string;
  placeholder?: string;
}

export interface Ratings {
  rating: any;
}