function authHeader() {
    // return authorization header with jwt token
    const data = JSON.parse(localStorage.getItem('data'));

    if (data && data.token) {
        return { 'Authorization': `Bearer  ${data.token}` };
    } 
    return null;
}
export default authHeader;