const AUTH_USER = "authUser";
const IS_LOADING = "isLoaging";

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
  },
  // TODO 로딩바 구현을 위한 임시 구현... 다른 방법 적용전까지 sessionStorage활용.
  getLoadingState() {
    return sessionStorage.getItem(IS_LOADING);
  },
  setLoagingStart() {
    sessionStorage.setItem(IS_LOADING, true);
  },
  setLoagingEnd() {
    sessionStorage.setItem(IS_LOADING, false);
  },
};
