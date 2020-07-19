export interface CustomThemeInterface {
  dark?: boolean;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    card?: string;
    text?: string;
    border?: string;
    light?: string;
    danger?: string;
    info?: string;
    active?: string;
    purple?: string;
    success?: string;
    white?: string;
    warn?: string;
    dark?: string;
    black?: string;
    surface?: string;
    onPrimary?: string;
    borderColor?: string;
    onSecondary?: string;
    onSurface?: string;
    onBackground?: string;
    appBar?: string;
  };
  fonts?: {
    Roboto?: string;
    RobotoMedium?: string;
    ProductSansRegular?: string;
    ProductSansBold?: string;
    ProductSansLight?: string;
    ProductSansMedium?: string;
  };
}

export interface CardInterface {
  onPress?: () => void;
  margin?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
  name?: string;
  iconName?: string;
  backgroundColor?: string;
  image?: any;
  children?: any;
}
export interface CourseInterface {
  onPress?: () => void;
  onUserPress?: () => void;
  onContentPress?: () => void;
  onLike?: () => void;
  onMessageClick?: () => void;
  onShare?: () => void;
  marginBottom?: number;
  width?: number;
  height?: number;
  elevation?: number;
  name?: string;
  children?: any;
  author?: any;
  authorPhoto?: any;
  image?: any;
  title?: any;
  content?: any;
  comments?: number;
  shares?: number;
  likes?: number;
  readTime?: string;
  datePosted?: string;
}

export interface PaginationConfig {
  page?: number;
  pageSize?: number;
  whereCondition?: any;
  token?: string;
}

export interface Courses {
  name?: any;
  tags?: Array<any>;
  lastUpdatedOn?: any;
  _id?: any;
  author?: any;
  authorId?: any;
  imageUrl?: any;
  color?: any;
  createdOn?: any;
}

export interface CustomResponse {
  result?: any;
  successful?: boolean;
  message?: string;
  type?: string;
  hasResult?: boolean;
  hasErrors?: boolean;
}