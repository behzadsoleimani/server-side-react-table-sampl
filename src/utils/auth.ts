

class Auth {

    get HeaderTokenKey() {
        return "this.headerTokenKey";
    }

    setToken(token: string) {
        localStorage.setItem("this.storageTokenKey", token);
    }

    getToken() {
        return localStorage.getItem("this.storageTokenKey");
    }

    hasToken() {
        return Boolean(localStorage.getItem("this.storageTokenKey"));
    }

    removeToken() {
        localStorage.removeItem("this.storageTokenKey");
    }

}

const instance = new Auth();
export { Auth, instance };
