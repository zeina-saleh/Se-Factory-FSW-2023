// getting elements
const list = $("#expense-list");
const expense_input = $("#expense-input");
const value_input = $("#expense-value");
const add_btn = $("#add-btn");
const total_p = $("#total");
let total = 0;

// function to return li element structure
function createExpense(text, value) {
    return `<li class="list">
    <span class="text">${text}</span>
    <span class="value">${value}</span>
    <button class="remove">&#128465 Delete</button>
    <input type="text" style="display: none;"/>
  </li>`
}

// function that creates an li, remove it and add total beneath it
function addExpense() {
    const expense_text = expense_input.val()
    const expense_value = value_input.val()

    if (expense_text.trim() === "") return;
    total += parseFloat(expense_value);

    // add expense item
    const expense_item = $(createExpense(expense_text, expense_value))
    list.append(expense_item)
    expense_input.val("")
    value_input.val("")

    // change total value
    total_p.text(`Total $${total}`)

    // remove
    expense_item.find(".remove").click(function () {
        const text = expense_item.find(".value").text()
        total -= parseFloat(text);
        expense_item.remove()
        total_p.text(`Total $${total}`)
    })
}

add_btn.click(addExpense);