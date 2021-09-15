import React, { useRef } from "react";
import classNames from "classnames/bind";
import DataGrid, { ColumnChooser, Paging } from 'devextreme-react/data-grid';
import { GridBaseOptions } from "devextreme/ui/data_grid";
import appConfig from "../../configs/app-config";
import { ITableProps, TInitTableColumns } from "./types";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.css";
import styles from "./index.module.scss";
import { Template } from 'devextreme-react/core/template';
import { Typography } from "@material-ui/core";

const cx = classNames.bind(styles);

const initTableColumns: TInitTableColumns = (tableHeaders, tableButtons = [], handlers = []) => {
  tableButtons.forEach((item, index) => item.onClick = handlers[index]);
  const columns = [...tableHeaders];
  if (tableButtons.length) {
    columns.push({ type: "buttons", cssClass: "row-btn-container", buttons: tableButtons });
  }
  return columns;
};



const CustomDataGrid = (props: ITableProps) => {

  const {
    filterRow: filterRowProps, export: exportProps,
    children,
    headerFilter: headerFilterProps,
    editing: editingProps, sorting: sortingProps, columns: columnsProps, dataSource: dataSourceProps,
    exportedPdfName: exportedPdfNameProps, pdfExport: pdfExportProps,
    refresh: refreshProps, toolbarTitle: toolbarTitleProps,
    paginationChange: paginationChangeProps, page: pageProps,
    total: totalProps, api: apiProps, onRowClick: onRowClickProps,
    className: classNameProps, columnResizingMode: columnResizingModeProps, columnChooser: columnChooserProps,
    ...restProps
  } = props;

  const {
    defaultPaging: defaultPagingConfig, paging: pagingConfig, pager: pagerConfig, export: exportConfig,
    headerFilter: headerFilterConfig, filterRow: filterRowConfig, loadPanel: loadPanelConfig,
    editing: editingConfig, sorting: sortingConfig, pdfExportText: pdfExportTextConfig,
    refreshText: refreshTextConfig, noValueText: noValueTextConfig, ...otherConfigs
  } = appConfig.TABLE;

  const dataGridRef: any = useRef(null);




  const toolbarTitleRender = () => {
    return (
      <Typography>{toolbarTitleProps || ""}</Typography>
    );
  }



  const onToolbarPreparing: GridBaseOptions["onToolbarPreparing"] = (e) => {
    if (e.toolbarOptions && e.toolbarOptions.items) {
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          template: 'pagination',
          visible: pageProps ? true : false
        },
        // {
        //   location: 'before',
        //   template: 'sortableSelect',
        //   visible: sortableProps ? true : false
        // },
        {
          location: 'before',
          template: 'titleTable',
          visible: toolbarTitleProps ? true : false
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            icon: 'refresh',
            onClick: apiProps,
            visible: refreshProps ? true : false
          }
        },
      );
    }
  };

  if (Array.isArray(columnsProps) && columnsProps.length) {


    columnsProps.forEach((column, index) => {
      if (typeof column === "string") return;

      if (column.dataType && ["date", "datetime"].indexOf(column.dataType) > -1) {
        column.allowFiltering = false;
        column.allowHeaderFiltering = false;
      }
    });

  }

  if (Array.isArray(dataSourceProps) && dataSourceProps.length) {
    dataSourceProps.forEach((element, index) => {
      element.Index = index + 1;
    });
  }

  return (
    <>
      <DataGrid
        className={classNames(cx("table"), { [classNameProps || ""]: classNameProps })}
        ref={dataGridRef}
        export={{ ...exportConfig, ...exportProps }}
        columnResizingMode={columnResizingModeProps}
        headerFilter={headerFilterProps ? { ...headerFilterConfig, ...headerFilterProps } : undefined}
        filterRow={filterRowProps ? { ...filterRowConfig, ...filterRowProps } : undefined}
        pager={{
          allowedPageSizes: "auto",
          infoText: "صفحه {0} از {1} ({2} ردیف)",
          showInfo: true,
          showNavigationButtons: true,
          showPageSizeSelector: true,
          visible: true,
          displayMode: "full"
      }}
        // loadPanel={{ ...loadPanelConfig, ...loadPanelProps }}
        // editing={{ ...editingConfig, ...editingProps }}
        sorting={{ ...sortingConfig, ...sortingProps }}
        remoteOperations={{
          sorting: true,
          filtering: true,
          paging: true
        }}

        columns={columnsProps}
        dataSource={dataSourceProps}
        onToolbarPreparing={onToolbarPreparing}
        onRowClick={onRowClickProps}
        {...otherConfigs}
        {...restProps}
      >
        <Paging defaultPageSize={10} />
        {columnChooserProps && <ColumnChooser enabled={true} title="انتخاب ستون‌ها" />}
        <Template name="titleTable" render={toolbarTitleRender} />

        {children}
      </DataGrid>

    </>
  );

};

export default CustomDataGrid;
export { initTableColumns };
export * from "devextreme-react/data-grid";
export * from "./types";
export type { dxDataGridOptions, dxDataGridColumn, dxDataGridColumnButton } from "devextreme/ui/data_grid";
