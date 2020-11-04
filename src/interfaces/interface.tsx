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
    primaryFont?: string;
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
    ProductSansRegular?: string;
    boldFont?: string;
    lightFont?: string;
    mediumFont?: string;
  };
  fontSizes?: {
    heading?: number;
    title?: number;
    subtitle?: number;
    body?: number;
    small?: number;
  }
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
  name?: string | any;
  lastname?: string;
  rating?: number | any;
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
  categoryId?: any;
  experience?: number | any;
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
  chatUser: User;
  tokens: Tokens;
  login: any;
  alert: any;
  dashboard: Dashboard;
  artisan: ResponseDetails;
  file: ResponseDetails;
  reviews: ResponseDetails
  jobs: ResponseDetails;
  requests: ResponseDetails;
  category: ResponseDetails;
  chats: ResponseDetails;
  activeChats: ResponseDetails;
}

export interface Dashboard {
  allJobs?: number;
  artisans?: number;
  reviews?: number
  ongoing?: number;
  completed?: number;
  newRequest?: number;
  declinedRequest?: number;
}

export interface JobProps {
  title: string;
  description?: string;
  categoryId?: any;
  createdOn?: string;
  phoneNumber?: string;
  budget?: number;
  artisanId?: any;
  status?: "NEW" | "ASSIGNED" | "PENDING" | "ACCEPTED" | "COMPLETED" | "TIMEOUT"
  _id: string;
  requestId: string;
  duration: any;
  address?: string;
  lga?: string;
  country?: string;
  state?: string;
}

export interface Category {
  name: string;
  imageUrl: string;
  _id: string;
}

export interface Tokens {
  auth_token: string;
  refresh_token: string
}

export interface User {
  firstname?: string | any;
  lastname?: string | any;
  name?: string | any;
  lastLogin?: string;
  createdOn?: string;
  businessName?: string | any;
  RCNumber?: string;
  rating?: number | any;
  _id?: string;
  email?: string | any;
  phoneNumber?: string | any;
  address?: string | any;
  imageUrl?: string;
  state?: string | any;
  categoryId?: string | any;
  userType?: number;
  country?: string | any;
  isEmailVerified?: boolean;
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
  message?: string;
}

export interface Search {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onClick?: any;
  onSubmit?: ((event: React.FormEvent<HTMLDivElement>) => void) | undefined;
  value: string;
  placeholder?: string;
}

export interface Ratings {
  rating: any;
}

export interface Chats {
  _id: string;
  sender: User;
  userId: User;
  receiver: User;
  message: string;
  createdOn: string;
}