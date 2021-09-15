import React, {
    // useEffect, 
    useState
} from "react";
import classNames from "classnames/bind";
import HandledGrid from "../components/data-grid/handled";
import styles from "./index.module.scss";
import { listDocuments } from "../api/documents";
import { IPageProps } from "../types/general-types";



const cx = classNames.bind(styles);

export default (props: IPageProps) => {
    const [reloadState, setReloadState] = useState(1);

    const title = "title";




    const tableHeaders: any[] = [
        {
            caption: "کد ", dataField: "id", dataType: "number",
            alignment: "center", allowHeaderFiltering: false, width: 100,
        },
        {
            caption: "عنوان",
            dataField: "title", dataType: "string", alignment: "center", width: 220
        },
    ];



    const filterApiDevEx = async (filteredValues: any) => {
        try {
            const response = await listDocuments({ ...filteredValues });
            if (response && response.data) {
                const { totalCount, data } = response;
                return {
                    data,
                    totalCount
                };
            }
            return {
                data: [],
                totalCount: 0
            }
        } catch {
            return {
                data: [],
                totalCount: 0
            };
        }
    };


    const store: any = {
        customLoad: {
            requestConfig: (e: any) => filterApiDevEx({
                ...e
            }),
            successCallback: async (response: any) => {
                console.log(response)
            },
            errorCallback: (e: any) => {
                console.log(e)
            }
        }
    };

    // const handleDetailClick = (row: any) => {
    //   console.log(row)
    // }

    const getApi = () => {
        setReloadState(reloadState * -1)
    }


    return (
        <div className={cx("dataGrid-container")}>
            <>
                <HandledGrid
                    columns={tableHeaders}
                    columnResizingMode={true}
                    store={store}
                    export={{ fileName: title }}
                    columnChooser={true}
                    api={getApi}
                    refresh={true}
                    reloadState={reloadState}
                    filterRow={true}
                    toolbarTitle={"toolbarTitle"}

                />
            </>
        </div>
    );

};