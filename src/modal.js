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
                fetchCodes(firstValue, secondValue);
                const input = document.getElementById("one");

                input.setAttribute("value", 1);

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

//Удаляем свойство disabled с кнопок
const removeDisabled = (openModalBtns) => {
    openModalBtns.forEach((btn) => {
        btn.removeAttribute("disabled", "disabled");
    });
}


const fetchCodes = async (oneCurr, twoCurr, amount = 1) => {
    const response = await fetch("/conversCurrency?oneCurr=" + oneCurr + "&twoCurr=" + twoCurr + "&amount=" + amount);

    const conversValue = await response.json();

    const inputTwo = document.getElementById("two");
    inputTwo.setAttribute("value", conversValue.conversion_result);
};
