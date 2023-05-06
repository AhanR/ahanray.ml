export const replaceSlash = (str : string) => {
    let newStr = ""
    for(let i  = 0; i < str.length; i++) {
        if(str[i] != "/"){
            newStr += str[i]
        }
    }
    return newStr;
}