import { ReactNode } from "react";
import { StoreOptions } from "devextreme/data/abstract_store";
import { CustomStoreOptions } from "devextreme/data/custom_store";
import { LoadOptions } from "devextreme/data/load_options";
import { IDataGridOptions } from "devextreme-react/data-grid";
import { dxDataGridColumnButton, dxDataGridColumn } from "devextreme/ui/data_grid";
import { IResponse, TApiMessage } from "../../types/general-types";

/**
 * Table interfaces/types
 */

export type TInitTableColumns = (
  tableHeader: dxDataGridColumn[], tableButtons?: dxDataGridColumnButton[],
  handlers?: ((rowData: { [key: string]: any }) => void)[]
) => ITableColumn[];

export interface ITableProps extends IDataGridOptions {
  filterDate?: boolean;
  exportedPdfName?: string;
  toolbarTitle?: string;
  children?: ReactNode;
  noIndexing?: boolean;
  paginationChange?: any;
  page?: number;
  total?: number;
  api?: any;
  pdfExport?: boolean;
  refresh?: boolean;
}

export interface ITableColumn {
  caption?: string;
  dataField?: string;
  dataType?: dxDataGridColumn["dataType"];
  type?: dxDataGridColumn["type"];
  [key: string]: any;
}

export interface ITableStore extends StoreOptions, CustomStoreOptions {
  customLoad?: ITableStoreCustom;
  customInsert?: ITableStoreCustom;
  customRemove?: ITableStoreCustom;
  customUpdate?: ITableStoreCustom;
}

export interface ITableStoreCustom {
  requestConfig: any;
  beforeRequestCallback?: (args: ITableStoreCustomBeforeArgs) => void;
  successCallback?: (response: IResponse) => void;
  errorCallback?: (errors: TApiMessage) => void;
  defaultCallback?: () => void;
}

export interface ITableStoreCustomBeforeArgs {
  requestConfig: any;
  loadOptions?: LoadOptions;
  values?: any;
  keys?: any;
}

export interface ITableDateFilterPanelProps {
  columns?: (string | dxDataGridColumn)[];
  dateValue: { [key: string]: any };
  setDateValue: any;
}

/**
 * HandledTable interfaces/types
 */

export type IHandledTableWithSnackbarCallApi<T = any> = (
  args?: IHandledTableWithSnackbarCallApiArgs
) => Promise<IResponse<T>["data"]>;

export interface IHandledTableProps extends ITableProps {
  store?: ITableStore;
  reloadState?: number;
}

export interface IHandledTableWithSnackbarProps extends IHandledTableProps {
  reloadState?: number;
}

export interface IHandledTableWithSnackbarCallApiArgs extends ITableStoreCustom, ITableStoreCustomBeforeArgs {

}
