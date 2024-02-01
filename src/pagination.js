import { leftBorder, rightBorder, getLocalStorage, setLocalStorage } from "./script.js";
import { fetchCodes } from './listCurrency.js';
import { KEY_STORAGE } from "./keyValueStorageEnum.js"

const pagination = document.getElementById("pagination");

let portionNumber = 1;
let selectPage = 1;

if (getLocalStorage(KEY_STORAGE.PAGE_NUMBER)) {
    selectPage = +getLocalStorage(KEY_STORAGE.PAGE_NUMBER);
}

export const getPages = (portionSize = 5) => {
    let pagesSum = parseInt(getLocalStorage(KEY_STORAGE.COUNT_ARRAY_MAIN));

    let htmlPages = `<div class="pagination">`;

    let countPages = Math.ceil(pagesSum / 15);

    let pagesArr = [];
    for (let i = 1; i <= countPages; i++) {
        pagesArr.push(i);
    }

    let pagesCount = Math.ceil(countPages / portionSize);
    if (portionNumber > 1) {
        htmlPages += `<button class="prevBtn">Назад</button>`
    }

    pagesArr.filter(p => p >= leftBorder(portionNumber, portionSize) &&
        p <= rightBorder(portionNumber, portionSize)).map((p) => {
            if (p === selectPage) {
                htmlPages += `<button id="numberPage${p}" class="active numberPage">${p}</button>`
            } else {
                htmlPages += `<button id="numberPage${p}" class="numberPage">${p}</button>`
            }
        })
    if (pagesCount > portionNumber) {
        htmlPages += `<button class="nextBtn">Вперед</button>`
    }

    htmlPages += `</div>`;
    pagination.innerHTML = htmlPages;
    controlBtn();
}


const controlBtn = () => {
    const numberPage = document.querySelectorAll(".numberPage");
    numberPage.forEach((btn) => {
        btn.addEventListener("click", function () {
            let numberSelect = btn.innerHTML;
            selectPage = parseInt(numberSelect);
            getPages();
            setLocalStorage(KEY_STORAGE.PAGE_NUMBER, selectPage);
            fetchCodes();
        })
    })

    const prevBtn = document.querySelector(".prevBtn");
    prevBtn &&
        prevBtn.addEventListener("click", function () {
            portionNumber -= 1;
            getPages();
        })

    const nextBtn = document.querySelector(".nextBtn");
    nextBtn &&
        nextBtn.addEventListener("click", function () {
            portionNumber += 1;
            getPages();
        })
}