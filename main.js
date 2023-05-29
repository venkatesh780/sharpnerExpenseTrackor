// retrive expenses from local storage
function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// add expense to the list and local storage
function addExpense(amount, description, category) {
  const expense = {
    amount,
    description,
    category,
  };
  const expenses = getExpenses();

  expenses.push(expense);

  saveExpenses(expenses);
}

// render expenses on to the page
function renderExpenses() {
  const expenses = getExpenses();

  const expenseList = document.getElementById("expense-list");

  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit-expense";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "delete-expense";

    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    expenseList.appendChild(listItem);
  });
}
// handle form submission

function handleForm(event) {
  event.preventDefault();

  const amountInput = document.getElementById("expense-amount");
  const descriptionInput = document.getElementById("expense-description");
  const categoryInput = document.getElementById("expense-category");

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  addExpense(amount, description, category);
  renderExpenses();

  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";

  amountInput.focus();
}

// add Event listner to the form

const addExpenseBtn = document.getElementById("add-expense-btn");

addExpenseBtn.addEventListener("click", handleForm);

renderExpenses();
