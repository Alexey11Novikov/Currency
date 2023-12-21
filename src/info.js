

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

export const HTMLfunc = () => {
    let html = '';
    html = `
<section class="modal hidden">
    <div id=${task.id} class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 class="modal-title">${task.name}</h2>
            <input class="task__checkbox" type="checkbox" ${isChecked} />
            <div class="task__date">${taskDate}</div>
            <p class="modal-description">${task.fullDesc}</p>
        </div>
    </div>

<input type="email" id="email" placeholder="brendaneich@js.com" />
<button class="btn">Submit</button>
</section>`;

    taskList.innerHTML = html;
}

