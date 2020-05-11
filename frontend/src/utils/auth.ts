const TokenKey = 'userToken'

export function readToken(){
    return localStorage.getItem(TokenKey)   //获取口令
}


//设置cookie口令
export function saveToken(token){
    return localStorage.setItem(TokenKey,token);
}

//移除口令
export function reMoveToken(){
    return localStorage.removeItem(TokenKey)
}
