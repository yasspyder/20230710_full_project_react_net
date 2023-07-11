function removeCookie(name) {
  document.cookie = `${name}=; path=/; expires=-1';`;
}

export default removeCookie;
