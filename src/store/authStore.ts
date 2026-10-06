import { action, makeObservable, observable } from "mobx";

class AuthStore {
  isAuth = false;
  idInstance: string = "";
  apiTokenInstance: string = "";
  phoneNumber: string = "";

  constructor() {
    this.idInstance = localStorage.getItem("idInstance") || "";
    this.apiTokenInstance = localStorage.getItem("apiTokenInstance") || "";
    this.phoneNumber = localStorage.getItem("phoneNumber") || "";
    makeObservable(this, {
      isAuth: observable,
      idInstance: observable,
      apiTokenInstance: observable,
      phoneNumber: observable,

      setIsAuth: action,
      login: action,
      logout: action,
      setIdInstance: action,
      setApiTokenInstance: action,
      setPhoneNumber: action,
    });
  }
  setIsAuth(value: boolean) {
    this.isAuth = value;
  }
  authorized = (): boolean => {
    return this.isAuth;
  };

  login = () => {
    this.isAuth = true;
  };
  logout = () => {
    this.isAuth = false;
  };

  setIdInstance(idInstance: string): void {
    this.idInstance = idInstance;
  }

  setApiTokenInstance = (apiTokenInstance: string): void => {
    this.apiTokenInstance = apiTokenInstance;
  };

  setTokens = (idInstance = "", apiTokenInstance = "") => {
    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;

    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
  };

  getTokens() {
    return {
      idInstance: this.idInstance,
      apiTokenInstance: this.apiTokenInstance,
    };
  }
  setPhoneNumber = (phoneNumber: string): void => {
    this.phoneNumber = phoneNumber;
    localStorage.setItem("phoneNumber", phoneNumber);
  };
  getPhoneNumber = (): string => {
    return this.phoneNumber;
  };
}

export default AuthStore;

export type TAuthStore = AuthStore;
