import { Dispatch, SetStateAction, Props } from "react";
import { AxiosRequestConfig } from "axios";
import { RouteComponentProps } from "react-router-dom";
import { WithWidth } from "@material-ui/core/withWidth";
import { IDataGridOptions, dxDataGridOptions } from "../components/data-grid";

/**
 *  @general ts-utils
 *  @type Omit
 */

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 *  @constant appConfig
 *  @interface IAppConfigSecurity
 *  @interface IAppConfigValidationMessages
 *  @interface IAppConfigSnackbar
 *  @interface IAppConfigDatePicker
 *  @interface IAppConfigTimePicker
 *  @interface IAppConfigTable
 *  @interface ISnackbarMessages
 *  @interface IAppConfig
 *  @type TBarChartOptions
 */

export interface IAppConfigSecurity {
  tokenKey: {
    urlSearchParams: string;
    localStorage: string;
    header: string;
  };
  authenticatedRedirect: string;
  unAuthenticatedRedirect: string;
  authenticatedRoutes: RegExp[];
  justPublicRoutes: RegExp[];
}

export interface IAppConfigValidationMessages {
  default: string;
  mobile: string;
}

export interface IAppConfigSnackbar {
  autoHideDuration: number;
  DismissIcon: any;
}

export interface IAppConfigTable extends dxDataGridOptions, IDataGridOptions {
  pdfExportText: string;
  refreshText: string;
  noValueText: string;
}

export interface ISnackbarMessages {
  [key: string]: string;
}

export interface IAppConfig {
  TABLE: IAppConfigTable;
}


/**
 *  @constant httpConfig
 *  @interface IHttpConfig
 */

export interface IHttpConfig extends AxiosRequestConfig {
  httpErrorMsg?: string;
}

/**
 *  @general api/service
 *  @interface IResponse
 *  @interface IRawHttpClient
 *  @interface IHandledHttpClient
 *  @type TApiReturnType
 *  @type TApiMessage
 */

export interface IResponse<T = any> {
  isSuccess?: boolean;
  message?: TApiMessage;
  statusCode?: number;
  data: T;
  failureOption?: any;
  token?: any;
  responseBody?: any;
  totalRowCount?: any;
}

export interface IRawHttpClient {
  config?: AxiosRequestConfig;
  noToken?: boolean;
}

export interface IHandledHttpClient extends IRawHttpClient {
  handleSignout?: any;
}

export type TApiReturnType<T = any> = Promise<IResponse<T>>;

export type TApiMessage = { code: number; description: string; }[] | [];

/**
 *  @general pages
 *  @interface IPageProps
 */

export interface IPageProps<T = null> extends WithWidth, RouteComponentProps, Props<T> {

}

export interface IDashboardMenuPageProps<T = null> extends IPageProps<T> {
  setBackdropOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 *  @general flux
 *  @type TDispatch
 *  @type TReducerAction
 */

export type TDispatch<T> = Dispatch<{ [key: string]: any; type: T; }>;

export type TReducerAction<T> = { [key: string]: any; type: T; };
