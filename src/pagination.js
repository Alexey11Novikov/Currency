import { leftBorder, rightBorder, getLocalStorage, setLocalStorage } from "./script.js";
import { fetchCodes } from './listCurrency.js';

const pagination = document.getElementById("pagination");

let portionNumber = 1;
let selectPage = 1;

export const getPages = (portionSize = 5) => {
    let pagesSum = parseInt(getLocalStorage("reqCount"));

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
            setLocalStorage("pageNumber", selectPage);
            fetchCodes();
        })
    })

    const prevBtn = document.querySelector(".prevBtn");
    prevBtn &&
        prevBtn.addEventListener("click", function () {
            portionNumber -= 1;
            getPages();
            setLocalStorage("pageNumber", selectPage);
        })

    const nextBtn = document.querySelector(".nextBtn");
    nextBtn &&
        nextBtn.addEventListener("click", function () {
            portionNumber += 1;
            getPages();
        })
}