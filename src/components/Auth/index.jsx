export function isLoggedIn() {
  	return localStorage.getItem("token")!==null && localStorage.getItem("token")!=="undefined";
}

export function deleteTokens(){
    localStorage.clear();
}
export function requiredAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}