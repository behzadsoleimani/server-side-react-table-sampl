import React, { useEffect } from "react";
import CustomStore from "devextreme/data/data_source";
import Table from "../index";
import { instance as Helpers } from "../../../utils/helpers";
import { IHandledTableWithSnackbarProps, IHandledTableWithSnackbarCallApi } from "../types";

const HandledTableWithSnackbar = (props: IHandledTableWithSnackbarProps) => {

  const { dataSource, store, reloadState,
    ...otherProps } = props;
  // const { user, setSignedIn } = useUserStateValue();


  const callApi: IHandledTableWithSnackbarCallApi = async (args) => {

    if (!args) return new Promise(resolve => resolve([]));

    const {
      requestConfig, beforeRequestCallback, successCallback, errorCallback,
      defaultCallback, loadOptions, values, keys
    } = args;

    if (beforeRequestCallback) beforeRequestCallback({ requestConfig, values, keys });


    let response: any;
    let objFilter: any = { filterArgs: [], filterValues: [] };
    try {
      if (loadOptions && loadOptions.filter) {
        if (!Array.isArray(loadOptions.filter[0])) {
          objFilter.filterArgs = [loadOptions.filter[0]];
          objFilter.filterValues = [loadOptions.filter[2]];
        } else {
          loadOptions.filter.forEach(async (i: any) => {
            if (Array.isArray(i)) {
              console.log("objFilter.filterArgs")
              console.log(objFilter.filterArgs)
              objFilter.filterArgs.push(i[0])
              objFilter.filterValues.push(i[2])
            }
          })
        }
      }
      console.log("loadOptions")
      console.log(loadOptions)
      if (loadOptions && loadOptions.sort && loadOptions.sort.length) {
        const paramObject = Helpers.getSearchParamsAsObject();
        const asc = loadOptions.sort[0].desc ? 0 : 1;
        if (paramObject["sort"] !== loadOptions.sort[0].selector || paramObject["order"] != asc) {
          Helpers.updateSearchParamsWithoutReload({ sort: loadOptions.sort[0].selector, order: loadOptions.sort[0].desc ? "desc" : "asc" }, ["sort", "order"]);
        }
      } else {
        Helpers.updateSearchParamsWithoutReload({}, ["sort", "order"]);
      }
      response = await requestConfig({
        page: loadOptions && loadOptions.skip ? loadOptions.skip / (loadOptions.take || 10) : null,
        pager: loadOptions && loadOptions.take ? loadOptions.take : null,
        sort: loadOptions && loadOptions.sort && loadOptions.sort.length ? loadOptions.sort[0].selector : null,
        order: loadOptions && loadOptions.sort && loadOptions.sort.length ? loadOptions.sort[0].desc ? "desc" : "asc" : null,
        // filterArgs: loadOptions && loadOptions.filter && loadOptions.filter.length ? loadOptions.filter[0] : null,
        // filterValues: loadOptions && loadOptions.filter && loadOptions.filter.length ? loadOptions.filter[2] : null,
        ...objFilter,
        ...Helpers.getSearchParamsAsObject()
      });
    } catch (err) {
      console.log("errrrr")
      console.log(err)
      if (errorCallback) errorCallback((response && response.message) || []);
    }

    const isSuccess = response && response.isSuccess;

    // temporary until fix opertaion fail from Api

    if (isSuccess && successCallback) successCallback(response);
    if (!isSuccess && errorCallback) errorCallback((response && response.message) || []);
    if (defaultCallback) defaultCallback();

    return new Promise(resolve => resolve(response));

  };

  const createStore = () => {
    if (!store) {
      return new CustomStore({});
    }

    const { customLoad, customInsert, customRemove, customUpdate, ...otherStoreProps } = store;

    return new CustomStore({
      load: (loadOptions: any) => callApi(Object.assign({}, customLoad, { loadOptions })),
      insert: (values: any) => callApi(Object.assign({}, customInsert, { values })),
      remove: (key: any) => callApi(Object.assign({}, customRemove, { key })),
      update: (key: any, values: any) => callApi(Object.assign({}, customUpdate, { key, values })),
      ...otherStoreProps
    });
  };

  const createdStore = createStore();

  useEffect(() => {
    createdStore.reload();
  }, [reloadState]);

  return (
    <Table dataSource={dataSource || createdStore} {...otherProps} />
  );

};

const HandledTableWithSnackbarProvider = (props: any) => (
  <HandledTableWithSnackbar {...props} />
);

export default HandledTableWithSnackbarProvider;
export * from "../index";
