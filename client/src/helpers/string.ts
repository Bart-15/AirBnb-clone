
export function getUrlLastIndex(data:string){
    return data.substring(data.lastIndexOf('/') + 1);
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}