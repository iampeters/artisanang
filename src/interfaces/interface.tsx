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
  rating: number;
  specialization: any;
  imageUrl: any;
}