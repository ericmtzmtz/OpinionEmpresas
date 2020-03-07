export function isLoggedIn() {
  	return localStorage.getItem("token")!==null && localStorage.getItem("token")!=="undefined";
}

export function deleteTokens(){
    localStorage.removeItem("token");
    // localStorage.removeItem("username");
}
export function requiredAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}