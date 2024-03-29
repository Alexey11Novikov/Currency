import { modalListener, eventListenerInput, backCurrency } from "./modal.js";
import { getPages } from "./pagination.js";
import { KEY_STORAGE } from "./keyValueStorageEnum.js"

const list = document.getElementById("list-currency");
import { getLocalStorage, setLocalStorage, fetchConvers, getSessionStorage } from "./script.js";

export const fetchCodes = async () => {
    const response = await fetch("/getCodes");

    const valute = await response.json();
    const listCodes = valute.supported_codes;

    setLocalStorage(KEY_STORAGE.COUNT_ARRAY_MAIN, listCodes.length);
    refreshArray(listCodes);
    if (!getLocalStorage(KEY_STORAGE.PAGE_NUMBER)) {
        setLocalStorage(KEY_STORAGE.PAGE_NUMBER, 1);
    }
};

export const refreshArray = (resArray) => {
    let subArray = [];
    let selectPage = getLocalStorage(KEY_STORAGE.PAGE_NUMBER);
    const entryCount = 15;
    subArray = resArray.slice(((selectPage - 1) * entryCount), ((selectPage - 1) * entryCount) + entryCount);
    HTMLfunc(subArray);
}

const HTMLfunc = (arrayCurrency) => {
    let html = ``;
    arrayCurrency.forEach(elements => {
        html += `<div class="list-block">
        <div class="grid">
            <span>${elements[1]} ( ${elements[0]} )</span>
            <button class="btnRound convers" data-target=${elements[0]}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </button>
            <button class="btnRound chg-curr _openModalBtn" id=${elements[0]} data-modal=${elements[0]}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
                    <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
                </svg>
            </button>
            <label>${getSessionStorage(KEY_STORAGE.CONVERS_RATE_ARRAY) ?
                JSON.parse(getSessionStorage(KEY_STORAGE.CONVERS_RATE_ARRAY))[elements[0]] : ""}</label>
        </div>
    </div>
    <div class="modal">
        <div class="modal-content">
        <span class="close">&times;</span>
            <h2 class="modal-title">Конвертация</h2>
            <div>
                <input class="textInput" id="valueConvers">
                <label id="elem1"></label>
                <button class="btnBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                </button>
                <input class="textInput" id="resultConvers" readonly>
                <label id="elem2"></label>
                <input type="button" value="Convert">
            </div>
        </div>
    </div>`
    });
    list.innerHTML = html;

    modalListener();
    eventListenerInput();
    backCurrency()
    fetchConvers();
    getPages();
}