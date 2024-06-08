const buttonArrow = document.querySelector(".image-arrow");
const inputDay = document.querySelector("#days");
const inputMonth = document.querySelector("#months");
const inputYear = document.querySelector("#years");
const labelYears = document.querySelector("#display-years");
const labelMonths = document.querySelector("#display-months");
const labelDays = document.querySelector("#display-days");

const resetErrorUi = (input, name) => {
  document.querySelector(`.input-name-${name}`).style.color =
    "var(--clr-neutral-400)";
  input.style.border = "1px solid var(--clr-neutral-300)";
  document.querySelector(`.input-${name}-message`).classList.add("hidden");
};
const updateErrorUI = (input, name) => {
  document.querySelector(`.input-name-${name}`).style.color =
    "var(--clr-primary2)";
  input.style.border = "1px solid var(--clr-primary2)";
  document.querySelector(`.input-${name}-message`).classList.remove("hidden");
};

const validateEmptyInput = (input, name) => {
  resetErrorUi(input, name);

  if (!input.value) {
    updateErrorUI(input, name);
  }
};
const updateDate = () => {
  const currentDate = new Date();

  const month = parseInt(inputMonth.value, 10);
  const year = parseInt(inputYear.value, 10);
  const day = parseInt(inputDay.value, 10);
  const inputedDate = new Date(year, month - 1, day);

  let years = currentDate.getFullYear() - inputedDate.getFullYear();
  let months = currentDate.getMonth() - inputedDate.getMonth();
  let days = currentDate.getDate() - inputedDate.getDate();

  if (days < 0) {
    months--;
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    days += lastDayOfMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};
const validateDate = () => {
  const currentDate = new Date();
  const month = parseInt(inputMonth.value, 10);
  const year = parseInt(inputYear.value, 10);
  const day = parseInt(inputDay.value, 10);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (year > currentYear) {
    updateErrorUI(inputYear, "year");
    document.querySelector(".input-year-message").textContent =
      "Must be in the past";
    return;
  }

  if ((year === currentYear && month > currentMonth) || month > 12) {
    updateErrorUI(inputMonth, "month");
    document.querySelector(".input-month-message").textContent =
      "Must be a valid month";
    return;
  }

  if (
    ((month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12) &&
      day > 0 &&
      day <= 31) ||
    ((month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 0 &&
      day <= 30) ||
    (month === 2 &&
      ((year % 4 === 0 &&
        (year % 100 !== 0 || year % 400 === 0) &&
        day > 0 &&
        day <= 29) ||
        (day > 0 && day <= 28)))
  ) {
  } else {
    updateErrorUI(inputDay, "day");
    document.querySelector(".input-day-message").textContent =
      "Must be a valid day";
    return;
  }
  return true;
};

buttonArrow.addEventListener("click", () => {
  validateEmptyInput(inputDay, "day");
  validateEmptyInput(inputMonth, "month");
  validateEmptyInput(inputYear, "year");

  if (validateDate()) {
    const date = updateDate();
    labelYears.textContent = date.years;
    labelMonths.textContent = date.months;
    labelDays.textContent = date.days;
  }
});
