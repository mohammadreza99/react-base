import { ReactNode } from "react";
import { PaletteMode, SnackbarProps } from "@mui/material";
import { Locale } from "@models/theme";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { UserState } from "@models/business";

export type Nullable<T = void> = T | null | undefined;

export type SafeAny = any;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethod;
  // null: default message, false: don't show message, string: custom message
  successMessage?: string | null | false | ((request: AxiosRequestConfig<any>, response?: AxiosResponse) => string | null | false);
  failureMessage?: string | null | false | ((request: AxiosRequestConfig<any>, response?: AxiosResponse) => string | null | false);
  loading?: boolean | ((request: AxiosRequestConfig<any>) => boolean);
  isCustomApi?: boolean;
  loadingOnlyOnce?: boolean;
  timeout?: number | 'none' | ((request: AxiosRequestConfig<any>) => number | 'none');
}

export type Events = {
  showToast: SnackbarProps;
  loading: boolean;
}

export interface ConfigState {
  paletteMode: PaletteMode;
  rtl: boolean;
  locale: Locale;
  langStorageKey: string;
  apiUrl: string;
  requestTimeout: number;
}

export interface RootState {
  user: UserState;
  config: ConfigState;
}

export type WithChildren<T = any> = { children: ReactNode; } & T;
