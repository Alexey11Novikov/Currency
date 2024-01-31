import { fetchconversCurrency } from "./script.js";

let firstValue = '';
let secondValue = '';

export const modalListener = () => {
    const openModalBtns = document.querySelectorAll("._openModalBtn");
    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {

            btn.setAttribute("disabled", "disabled");
            if (firstValue === '') {
                firstValue = btn.id;
            }
            else {
                secondValue = btn.id;;
                const modal = document.querySelector(".modal");
                // Показываем модальное окно
                modal.style.display = "block";
                labelConvert();
                fetchconversCurrency(firstValue, secondValue);

                const input = document.getElementById("valueConvers");

                input.setAttribute("value", 1);
                keydownInput(input);

                // Добавляем слушатель события клика на кнопку "закрыть"
                const closeModal = modal.querySelector(".close");
                closeModal.addEventListener("click", function () {
                    modal.style.display = "none";
                    removeDisabled(openModalBtns);
                    firstValue = '';
                    secondValue = '';
                });
            }
        });
    });
};

const keydownInput = (input) => {
    input.addEventListener('keydown', function (event) {
        // Разрешаем: backspace, delete, tab и escape
        if (event.key == 'Backspace' || event.key == 'Delete' || event.key == 'Tab' || event.key == 'Escape' ||
            // Разрешаем: Ctrl+A
            (event.key == 'Ctrl+A' && event.ctrlKey === true) ||
            // Разрешаем: home, end, влево, вправо
            (event.key >= 'End' && event.key <= 'ArrowRight')) {
            // Ничего не делаем
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((event.key < '0' || event.key > '9') && (event.key < 'Numpad0' || event.key > 'Numpad9')) {
                event.preventDefault();
            }
        }
    });
}


//надписи валюты
const labelConvert = () => {
    const elem1 = document.getElementById("elem1");
    elem1.innerText = firstValue;
    const elem2 = document.getElementById("elem2");
    elem2.innerHTML = secondValue;
}

export const eventListenerInput = () => {
    const input = document.getElementById("valueConvers");
    input.addEventListener("change", function (event) {
        fetchconversCurrency(firstValue, secondValue, event.target.value);
    })
}


//Удаляем свойство disabled с кнопок
const removeDisabled = (openModalBtns) => {
    openModalBtns.forEach((btn) => {
        btn.removeAttribute("disabled", "disabled");
    });
}


//Кнопка Поменять местами валюту
export const backCurrency = () => {
    const spanBtn = document.querySelector(".btnBack");
    spanBtn.addEventListener("click", function () {
        if (firstValue !== '' && secondValue !== '') {
            let temp = '';
            temp = firstValue;
            firstValue = secondValue;
            secondValue = temp;
            labelConvert();
            const input = document.getElementById("valueConvers").value;
            fetchconversCurrency(firstValue, secondValue,input);
        }
    })
}