const totalExpense = document.querySelector('.total-expense .span2');
const expenseTitle = document.querySelector('#expense-form #title');
const expenseAmount = document.querySelector('#expense-form #amount');
const expenseDate = document.querySelector('#expense-form #date');
const expenseAddButton = document.querySelector('.expense-add');
const expenseItems = document.querySelector('.expense-items');

// Load from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const expenses = JSON.parse(localStorage.getItem('expense-information')) || [];
    expenses.forEach(createExpenseInDOM);
    calculateTotal();
    toggleDefaultMessage();
});

expenseAddButton.addEventListener('click', () => {
    const title = expenseTitle.value;
    const amount = expenseAmount.value;
    const date = expenseDate.value;

    if (!title || !amount || !date) return;

    const expenseData = {
        id: Date.now(), // unique id
        title,
        amount,
        date
    };

    // Save to localStorage
    const expenses = JSON.parse(localStorage.getItem('expense-information')) || [];
    expenses.push(expenseData);
    localStorage.setItem('expense-information', JSON.stringify(expenses));

    // Show on screen
    createExpenseInDOM(expenseData);
    calculateTotal();

    // Clear fields
    expenseTitle.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
});

function createExpenseInDOM(expenseData) {
    const { id, title, amount, date } = expenseData;

    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');
    expenseInfo.setAttribute('data-id', id);

    const expenseInfoDiv1 = document.createElement('div');
    expenseInfoDiv1.classList.add('div1');
    const expenseInfoDiv2 = document.createElement('div');
    expenseInfoDiv2.classList.add('div2');

    const itemPara = document.createElement('p');
    itemPara.id = 'p1';
    itemPara.innerText = title;

    const datePara = document.createElement('p');
    datePara.id = 'p2';
    datePara.innerText = date;

    const moneyPara = document.createElement('p');
    moneyPara.innerText = `₹${amount}`;
    
    const deleteExpenseBtn = document.createElement('button');
    deleteExpenseBtn.classList.add('delete-btn');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteExpenseBtn.appendChild(deleteIcon);

    deleteExpenseBtn.addEventListener('click', () => {
        expenseInfo.remove();

        // Remove from localStorage
        let expenses = JSON.parse(localStorage.getItem('expense-information')) || [];
        expenses = expenses.filter(exp => exp.id !== id);
        localStorage.setItem('expense-information', JSON.stringify(expenses));
        calculateTotal();
        toggleDefaultMessage();
    });

    expenseInfoDiv1.appendChild(itemPara);
    expenseInfoDiv1.appendChild(datePara);

    expenseInfoDiv2.appendChild(moneyPara);
    expenseInfoDiv2.appendChild(deleteExpenseBtn);

    expenseInfo.appendChild(expenseInfoDiv1);
    expenseInfo.appendChild(expenseInfoDiv2);

    expenseItems.appendChild(expenseInfo);
    toggleDefaultMessage();
}

function toggleDefaultMessage() {
  const defaultPara = document.getElementById('default-para');
  const defaultIcon = document.querySelector('.expense-icon');
  const hasExpenses = document.querySelectorAll('.expense-info').length > 0;

  if (hasExpenses) {
    if (defaultPara) defaultPara.remove();
    if (defaultIcon) defaultIcon.remove();
  } else {
    // Re-add if not present
    if (!defaultPara) {
      const newPara = document.createElement('p');
      newPara.id = 'default-para';
      newPara.innerText = 'Add Expenses';
      expenseItems.appendChild(newPara);
    }

    if (!defaultIcon) {
      const newIcon = document.createElement('span');
      newIcon.classList.add('material-symbols-outlined', 'expense-icon');
      newIcon.innerText = 'account_balance_wallet';
      expenseItems.appendChild(newIcon);
    }
  }
}
function calculateTotal() {
  const expenses = JSON.parse(localStorage.getItem('expense-information')) || [];
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  totalExpense.innerText = `₹${total}`;
}
