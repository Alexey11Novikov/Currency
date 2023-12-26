
const taskList = document.querySelector("task-list");

export const modalListener = () => {
    const openModalBtns = document.querySelectorAll("._openModalBtn");

    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Получаем значение атрибута data-modal для соответствующего модального окна
            const modalId = btn.getAttribute("data-modal");
            
            const modal = document.getElementById(modalId);

            // Показываем модальное окно
            modal.style.display = "block";

            // Добавляем слушатель события клика на кнопку "закрыть"
            const closeModal = modal.querySelector(".close");
            closeModal.addEventListener("click", function () {
                modal.style.display = "none";
            });

            // Добавляем слушатель события клика вне модального окна для его закрытия
            window.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        });
    });
};

export const getInfo = async (targetCurrency) => {
    const response = await fetch("/getInfo?currency=" + targetCurrency);

    const valute = await response.json();

    HTMLfunc(valute.target_data, targetCurrency);
};

export const HTMLfunc = (infoCurred, targetCurrency) => {
    let html = '';
    html = `
    <div id=${targetCurrency} class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2 class="modal-title">${infoCurred.currency_name}</h2>
      <input class="task__checkbox" type="checkbox" ${infoCurred} />
      <div class="task__date">Symbol: &#${infoCurred.display_symbol};</div>
     <img src=${infoCurred.flag_url}>
    </div>
  </div> `;

    taskList.innerHTML = html;
}

