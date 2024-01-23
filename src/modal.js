let firstValue = '';
let secondValue = '';

export const modalListener = () => {
    const openModalBtns = document.querySelectorAll("._openModalBtn");
    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Получаем значение атрибута data-modal для соответствующего модального окна
            //const btnId = btn.("modal-title");

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
                fetchCodes(firstValue, secondValue);

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

const labelConvert = () => {
    const elem1 = document.getElementById("elem1");
    elem1.innerText = firstValue;
    const elem2 = document.getElementById("elem2");
    elem2.innerHTML = secondValue;
}

export const eventListenerInput = () => {
    const input = document.getElementById("valueConvers");
    input.addEventListener("change", function (event) {
        fetchCodes(firstValue, secondValue, event.target.value);
    })
}


//Удаляем свойство disabled с кнопок
const removeDisabled = (openModalBtns) => {
    openModalBtns.forEach((btn) => {
        btn.removeAttribute("disabled", "disabled");
    });
}


const fetchCodes = async (oneCurr, twoCurr, amount = 1) => {
    const response = await fetch("/conversCurrency?oneCurr=" + oneCurr + "&twoCurr=" + twoCurr + "&amount=" + amount);

    const conversValue = await response.json();

    const inputTwo = document.getElementById("resultConvers");
    inputTwo.setAttribute("value", Math.round(conversValue.conversion_result * 1000) / 1000);
};
