const AUTH_USER = 'authUser';

export default {
    getAuthUserFromSession() {
        const authUser = JSON.parse(sessionStorage.getItem(AUTH_USER));
        return authUser;
    },
    setAuthUserOnSession(authInfo) {
        sessionStorage.setItem(AUTH_USER, JSON.stringify(authInfo));
    },
    clearSession() {
        sessionStorage.clear();
    }
}