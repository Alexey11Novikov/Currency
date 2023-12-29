
const header = document.getElementById("header");


export const fetchReq = async () => {
  const response = await fetch("/quota");

  const lastReq = await response.json();
  HTMLfunc(lastReq.requests_remaining)
};

const HTMLfunc = (stilReq) => {
  const headerHTML = `
  <header class="header">
    <div class="header__container container">
      <div class="header__search">
        <input class="header__search-input" type="text" placeholder="Поиск" />
      </div>
      <label>Осталось запросов:${stilReq}</label>
    </div>
  </header>
`;

header.innerHTML = headerHTML;
}

fetchReq();