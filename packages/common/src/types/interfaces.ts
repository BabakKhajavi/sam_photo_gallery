import { EnumSeverity } from './enums';

export interface IAlert {
  alertType: EnumSeverity;
  alertMessage: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ToastMessageContextType {
  showMessage: (message: string, severity: EnumSeverity) => void;
}
