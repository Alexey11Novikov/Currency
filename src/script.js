export const leftBorder = (portionNumber, portionSize) => {
    return (portionNumber - 1) * portionSize + 1;
}

export const rightBorder = (portionNumber, portionSize) => {
    return portionNumber * portionSize;
}

export const setLocalStorage = (key, item) => {
    localStorage.setItem(key, item);
}

export const getLocalStorage = (key) => {
   return localStorage.getItem(key);
}
