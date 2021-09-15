import {
    IAppConfig, IAppConfigTable,
} from "../types/general-types";




const TABLE: IAppConfigTable = {
    defaultPaging: {
        defaultPageIndex: 0,
        defaultPageSize: 5
    },
    paging: {
        enabled: true
    },
    pager: {
        allowedPageSizes: "auto",
        infoText: "صفحه {0} از {1} ({2} ردیف)",
        showInfo: true,
        showNavigationButtons: true,
        showPageSizeSelector: true,
        visible: true,
        displayMode: "full"
    },
    export: {
        enabled: true,
        fileName: "Bisti-Excel-Doc",
        ignoreExcelErrors: true,
        texts: {
            exportAll: "دریافت خروجی اکسل",
            exportSelectedRows: "دریافت خروجی ار ردیفهای انتخاب شده",
            exportTo: "خروجی اکسل به صورت"
        }
    },
    headerFilter: {
        allowSearch: true,
        texts: {
            cancel: "انصراف",
            ok: "تایید",
            emptyValue: "مقداری یافت نشد"
        },
        visible: true
    },
    filterRow: {
        applyFilter: "auto",
        applyFilterText: "اعمال فیلتر",
        operationDescriptions: {
            contains: "شامل", endsWith: "پایان با", equal: "برابر",
            greaterThan: "بزرگتر از", greaterThanOrEqual: "بزرگتر یا برابر",
            lessThan: "کوچک تر", lessThanOrEqual: "کوچک تر یا برابر",
            notContains: "شامل نباشد", notEqual: "مخالف", startsWith: "شروع با",
            between: "بین"
        },
        resetOperationText: "حذف فیلتر",
        betweenEndText: "بین انتهای متن",
        betweenStartText: "بین ابتدای متن",
        showOperationChooser: false,
        showAllText: "نمایش متن کامل",
        visible: true
    },
    loadPanel: {
        enabled: true,
        showPane: true,
        shading: true,
        text: "در حال بارگزاری",
        showIndicator: true
    },
    editing: {
        mode: "batch",
        refreshMode: "full",
        useIcons: true,
        selectTextOnEditStart: true,
        startEditAction: "click",
        texts: {
            confirmDeleteTitle: "عملیات حذف",
            confirmDeleteMessage: "آیا از حذف مطمئنید؟"
        }
    },
    sorting: {
        clearText: "حالت اولیه",
        ascendingText: "صعودی",
        descendingText: "نزولی",
        mode: "single",
        showSortIndexes: true
    },
    // scrolling: {
    //     columnRenderingMode: "virtual",
    //     rowRenderingMode: "virtual",
    //     showScrollbar: "onHover",
    //     mode: "virtual"
    // },
    columnResizingMode: "nextColumn",
    columnAutoWidth: true,
    noDataText: "اطلاعاتی برای نمایش موجود نیست",
    rtlEnabled: true,
    allowColumnResizing: true,
    allowColumnReordering: true,
    showBorders: true,
    showRowLines: false,
    showColumnLines: true,
    showColumnHeaders: true,
    rowAlternationEnabled: true,
    autoNavigateToFocusedRow: true,
    pdfExportText: "دریافت خروجی پی دی اف",
    refreshText: "بارگزاری مجدد",
    noValueText: "نامشخص"
};


const appConfig: IAppConfig = {
    TABLE,
};

export default appConfig;
