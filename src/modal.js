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
