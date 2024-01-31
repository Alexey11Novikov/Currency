import { fetchCodes } from './listCurrency.js';

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

export const setSessionStorage = (key, item) => {
    sessionStorage.setItem(key, item);
}

export const getSessionStorage = (key) => {
    return sessionStorage.getItem(key);
}

export const fetchConvers = () => {
    const convers = document.querySelectorAll(".convers");

    convers.forEach((btn) => {
        btn.addEventListener("click", async function () {
            const id = btn.getAttribute("data-target");
            try {
                const response = await fetch("/latest?currensy=" + id);
                const res = await response.json();
                setSessionStorage("conversRates", JSON.stringify(res.conversion_rates));
                fetchCodes();
            } catch (error) {
                console.log(error);
            }
        });
    });
}


export const fetchconversCurrency = async (oneCurr, twoCurr, amount = 1) => {
    const response = await fetch("/conversCurrency?oneCurr=" + oneCurr + "&twoCurr=" + twoCurr + "&amount=" + amount);

    const conversValue = await response.json();

    const inputTwo = document.getElementById("resultConvers");
    inputTwo.setAttribute("value", Math.round(conversValue.conversion_result * 1000) / 1000);
};
