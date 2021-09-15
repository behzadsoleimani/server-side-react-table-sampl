

class Helpers {

  addPathParams(url: string, params?: any[]) {
    let urlWithPathParams = url;
    if (params) {
      params.forEach(p => {
        if (p) urlWithPathParams += `/${p}`;
      });
    }
    return urlWithPathParams;
  }

  safeUrlReplace(history: any, path: string) {
    history.replace(path);
  }

  updateSearchParamsWithoutReload(obj: { [key: string]: any }, toBeRemoved?: string[]) {
    const searchParams = new URLSearchParams(window.top.location.search);
    if (toBeRemoved) toBeRemoved.forEach(t => searchParams.delete(t));
    Object.keys(obj).forEach(key => {
      const exists = searchParams.has(key);
      searchParams[exists ? "set" : "append"](key, obj[key]);
    });
    const search = searchParams.toString().length ? "?" + searchParams.toString() : ""
    const newUrl = window.top.location.pathname + search;
    window.top.history.pushState('', '', newUrl);
  }

  getSearchParamsAsObject() {
    const obj: { [key: string]: any } = {};
    const searchParams: any = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
      if (key && value) obj[key] = value;
    }
    return obj;
  }


}

const instance = new Helpers();
export { Helpers, instance };
