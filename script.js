let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded", () => renderExpenses());

// Add Expense
document.getElementById("expense-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const amountVal = document.getElementById("amount").value;
  const amount = parseFloat(amountVal);
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value.trim() || "General";
  const note = document.getElementById("note").value.trim();

  if (isNaN(amount) || amount <= 0 || !date) {
    alert("Please enter a valid amount and date!");
    return;
  }

  const expense = {
    id: Date.now(),
    amount,
    date,
    category,
    note
  };

  expenses.push(expense);
  saveAndRender();
  e.target.reset();
});

// Render expenses (safe: use textContent instead of innerHTML)
function renderExpenses(filtered = expenses) {
  const tbody = document.querySelector("#expense-table tbody");
  tbody.innerHTML = "";

  filtered.forEach((exp) => {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.setAttribute("data-label", "Date");
    tdDate.textContent = exp.date;

    const tdAmount = document.createElement("td");
    tdAmount.setAttribute("data-label", "Amount");
    tdAmount.textContent = `₹${exp.amount.toFixed(2)}`;

    const tdCategory = document.createElement("td");
    tdCategory.setAttribute("data-label", "Category");
    tdCategory.textContent = exp.category;

    const tdNote = document.createElement("td");
    tdNote.setAttribute("data-label", "Note");
    tdNote.textContent = exp.note;

    const tdAction = document.createElement("td");
    tdAction.setAttribute("data-label", "Action");

    const editBtn = document.createElement("button");
    editBtn.className = "btn-small";
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => editExpense(exp.id));

    const delBtn = document.createElement("button");
    delBtn.className = "btn-small secondary";
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => deleteExpense(exp.id));

    tdAction.appendChild(editBtn);
    tdAction.appendChild(delBtn);

    tr.appendChild(tdDate);
    tr.appendChild(tdAmount);
    tr.appendChild(tdCategory);
    tr.appendChild(tdNote);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });

  updateSummaries(filtered);
}

// Save and refresh
function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Delete expense
function deleteExpense(id) {
  if (confirm("Delete this expense?")) {
    expenses = expenses.filter((e) => e.id !== id);
    saveAndRender();
  }
}

// Edit expense
function editExpense(id) {
  const e = expenses.find((exp) => exp.id === id);
  if (!e) return;
  const amountRaw = prompt("New amount:", e.amount);
  // If user cancels, prompt returns null. If user enters empty string, treat as no-change.
  if (amountRaw !== null && amountRaw !== "") {
    const parsed = parseFloat(amountRaw);
    if (!isNaN(parsed) && parsed > 0) {
      e.amount = parsed;
    } else {
      alert("Invalid amount entered. Keeping previous amount.");
    }
  }

  const category = prompt("New category:", e.category);
  if (category !== null && category.trim() !== "") e.category = category.trim();

  const note = prompt("New note:", e.note);
  if (note !== null) e.note = note.trim();

  saveAndRender();
}

// Filters
document.getElementById("apply-filter").addEventListener("click", () => {
  const month = document.getElementById("filter-month").value;
  const category = document.getElementById("filter-category").value.toLowerCase();
  const filtered = expenses.filter((exp) => {
    const matchMonth = !month || exp.date.startsWith(month);
    const matchCat = !category || exp.category.toLowerCase().includes(category);
    return matchMonth && matchCat;
  });
  renderExpenses(filtered);
});

document.getElementById("clear-filter").addEventListener("click", () => {
  document.getElementById("filter-month").value = "";
  document.getElementById("filter-category").value = "";
  renderExpenses();
});

// Summary cards
function updateSummaries(list) {
  const total = list.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("total-amount").textContent = total.toFixed(2);

  const nowMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = list
    .filter((e) => e.date.startsWith(nowMonth))
    .reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("month-total").textContent = monthTotal.toFixed(2);

  const categoryTotals = {};
  list.forEach((e) => (categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount));
  let topCategory = "-";
  let maxSpent = 0;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > maxSpent) {
      topCategory = `${cat} (₹${amt.toFixed(2)})`;
      maxSpent = amt;
    }
  }
  document.getElementById("top-category").textContent = topCategory;
}
