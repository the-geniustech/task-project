const header = document.querySelector(".header");
const navToggle = document.querySelector(".navigation__button");
const searchBoxToggle = document.querySelector(".user__nav--search");
const searchBox = document.querySelector(".search");
const sideNavigation = document.querySelector(".sidebar");

const toggleClass = (element, toggleCl) => {
  element.classList.toggle(toggleCl);
};

header.addEventListener("click", function (e) {
  e.preventDefault();
  const click = e.target.closest(".navigation__button, .user__nav--search");

  if (click === navToggle) {
    toggleClass(navToggle, "navigation__button--open");
    toggleClass(sideNavigation, "sidebar--open");
    // navToggle.classList.toggle('navigation__button--open')
    // sideNavigation.classList.toggle('sidebar--open');
  }
  if (click === searchBoxToggle) toggleClass(searchBox, "search__box--open");
  // searchBox.classList.toggle('search__box--open');
});

///////////////////////////////////////
// CURRENCE
const currenceFn = function () {
  const txtTransformUpper = (txt) => txt.toUpperCase();

  const convertToFloatNum = (strNumb) =>
    parseFloat(strNumb.replaceAll(",", ""));

  const formatStringNum = (floatingNumber) => {
    // Format number to two decimal places and commas
    const formatter = new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(floatingNumber);
  };

  const currenceSignBalAmountEl = document.querySelector(
    ".balance__amount--currence-sign"
  );
  const BalanceAmountEl = document.querySelector(".balance__amount--figure");
  const currenceSignBalEl = document.querySelector(".currence__sign-balance");
  const initialBalCurrence = txtTransformUpper(
    currenceSignBalAmountEl.textContent
  );
  const intialBalAmount = txtTransformUpper(BalanceAmountEl.textContent);

  let tagNum, tag, currenceSign, country, conversionRate;

  const balCurrenceConverter = async function () {
    const currenceSignFrom = txtTransformUpper(
      currenceSignBalAmountEl.textContent
    );
    const currenceSignTo = txtTransformUpper(currenceSignBalEl.textContent);

    const responce = await fetch(
      `https://v6.exchangerate-api.com/v6/5836dd85d3eb10d37357bef4/latest/${currenceSignFrom}`
    );
    const data = await responce.json();
    conversionRate = data.conversion_rates[`${currenceSignTo}`];

    const balanceAmount = formatStringNum(
      convertToFloatNum(BalanceAmountEl.textContent) * conversionRate
    );

    currenceSignBalAmountEl.textContent = `${currenceSignTo}`;
    BalanceAmountEl.textContent = `${balanceAmount}`;

    if (initialBalCurrence === currenceSignBalAmountEl.textContent) {
      currenceSignBalAmountEl.textContent = `${initialBalCurrence}`;
      BalanceAmountEl.textContent = `${intialBalAmount}`;
    }
  };

  balCurrenceConverter();

  const currence = document.querySelectorAll(".tag");

  currence.forEach((el, i) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const clicked = e.target.closest(
        ".currence__toggle, .currence__lists-list"
      );

      if (!clicked) return;

      // Showing up the currence list
      if (clicked.classList.contains("currence__toggle")) {
        tagNum = +clicked.dataset.tag;
        tag = document.querySelector(`#tag-${tagNum}`);
        toggleClass(tag, "tag__lists--hidden");
      }

      // Switching/Updating the currence tag info
      if (clicked.classList.contains("currence__lists-list")) {
        currenceSign = clicked.value;
        country = currenceSign === "ngn" ? "nigeria" : "usa";
        const countryIconEl = document.querySelector(
          `#${this.id} .currence__country-icon`
        );
        const currenceSignEl = document.querySelector(
          `#${this.id} .currence__sign`
        );

        const htmlIcon = `
      <use xlink:href="assets/flag-${country}.svg#flag-${country}">
      </use>
      `;

        countryIconEl.innerHTML = currenceSignEl.innerHTML = "";

        countryIconEl.insertAdjacentHTML("beforeend", htmlIcon);
        currenceSignEl.textContent = `${currenceSign}`;

        balCurrenceConverter();
      }
    });
  });

  const convertFund = async function () {
    const sendCurrenceSign = txtTransformUpper(
      document.querySelector(".convert__fund--send .currence__sign").textContent
    );
    const receivedCurrenceSign = txtTransformUpper(
      document.querySelector(".convert__fund--received .currence__sign")
        .textContent
    );
    const respond = await fetch(
      `https://v6.exchangerate-api.com/v6/5836dd85d3eb10d37357bef4/latest/${sendCurrenceSign}`
    );
    const data = await respond.json();
    const { conversion_rates: conversionRates } = data;

    const sendCurrenceRate = conversionRates[`${sendCurrenceSign}`];
    const receivedCurrenceRate = conversionRates[`${receivedCurrenceSign}`];

    console.log(sendCurrenceRate, receivedCurrenceRate);
  };
  convertFund();
};
currenceFn();
