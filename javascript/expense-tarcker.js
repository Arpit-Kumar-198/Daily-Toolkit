// ==========================================
// ELEMENTS
// ==========================================

const totalExpense = document.querySelector(".expense-total");
const expenseTitle = document.querySelector("#title");
const expenseAmount = document.querySelector("#amount");
const expenseDate = document.querySelector("#date");
const expenseAddButton = document.querySelector(".expense-add");
const expenseItems = document.querySelector(".expense-items");

// ==========================================
// HELPERS
// ==========================================

function getExpenses() {
  return JSON.parse(localStorage.getItem("expense-information")) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expense-information", JSON.stringify(expenses));
}

function formatMoney(amount) {
  return BigInt(amount).toLocaleString("en-IN");
}

// ==========================================
// INITIAL LOAD
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
  const expenses = getExpenses();

  expenses.forEach((expense) => {
    createExpenseInDOM(expense);
  });

  calculateTotal();
  toggleDefaultMessage();
});

// ==========================================
// ADD EXPENSE
// ==========================================

expenseAddButton.addEventListener("click", () => {
  const title = expenseTitle.value.trim();
  const amount = expenseAmount.value.trim();
  const date = expenseDate.value;

  if (!title || !amount || !date) {
    return;
  }

  const expenseData = {
    id: Date.now(),
    title,
    amount,
    date,
  };

  const expenses = getExpenses();

  expenses.push(expenseData);

  saveExpenses(expenses);

  createExpenseInDOM(expenseData);

  calculateTotal();

  expenseTitle.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

// ==========================================
// CREATE EXPENSE CARD
// ==========================================

function createExpenseInDOM(expenseData) {
  const { id, title, amount, date } = expenseData;

  const expenseInfo = document.createElement("div");
  expenseInfo.classList.add("expense-info");
  expenseInfo.dataset.id = id;

  // Left section

  const div1 = document.createElement("div");
  div1.classList.add("div1");

  const titlePara = document.createElement("p");
  titlePara.id = "p1";
  titlePara.textContent = title;

  const datePara = document.createElement("p");
  datePara.id = "p2";
  datePara.textContent = date;

  div1.appendChild(titlePara);
  div1.appendChild(datePara);

  // Right section

  const div2 = document.createElement("div");
  div2.classList.add("div2");

  const moneyPara = document.createElement("p");
  moneyPara.textContent = "₹" + formatMoney(amount);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteBtn.addEventListener("click", () => {
    deleteExpense(id, expenseInfo);
  });

  div2.appendChild(moneyPara);
  div2.appendChild(deleteBtn);

  expenseInfo.appendChild(div1);
  expenseInfo.appendChild(div2);

  expenseItems.appendChild(expenseInfo);

  toggleDefaultMessage();
}

// ==========================================
// DELETE EXPENSE
// ==========================================

function deleteExpense(id, expenseElement) {
  expenseElement.remove();

  let expenses = getExpenses();

  expenses = expenses.filter((expense) => expense.id !== id);

  saveExpenses(expenses);

  calculateTotal();

  toggleDefaultMessage();
}

// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {
  const expenses = getExpenses();

  let total = 0n;

  expenses.forEach((expense) => {
    total += BigInt(expense.amount);
  });

  totalExpense.textContent = "₹" + total.toLocaleString("en-IN");
}

// ==========================================
// DEFAULT MESSAGE
// ==========================================

function toggleDefaultMessage() {
  const defaultPara = document.getElementById("default-para");

  const defaultIcon = document.querySelector(".expense-icon");

  const expenseCards = document.querySelectorAll(".expense-info");

  if (expenseCards.length > 0) {
    if (defaultPara) defaultPara.remove();

    if (defaultIcon) defaultIcon.remove();
  } else {
    if (!defaultPara) {
      const para = document.createElement("p");

      para.id = "default-para";
      para.textContent = "Add Expenses";

      expenseItems.appendChild(para);
    }

    if (!defaultIcon) {
      const icon = document.createElement("span");

      icon.classList.add("material-symbols-outlined", "expense-icon");

      icon.textContent = "account_balance_wallet";

      expenseItems.appendChild(icon);
    }
  }
}
