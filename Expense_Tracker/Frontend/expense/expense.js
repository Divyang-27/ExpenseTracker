let listGroup = document.querySelector('.List-group');

function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById('amount').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;
  let myExpense = {
    amount: amount,
    description: description,
    category: category,
    userId: localStorage.getItem('token'),
  };
  axios
    .post('http://localhost:3000/user/expense', myExpense)
    .then((response) => {
      getExpense(response.data.newExpenseDetails);
    })
    .catch((error) => {
      console.error('Error adding expense:', error);
    });
}
function getExpense(myExpense) {
  let newListElement = document.createElement('li');
  newListElement.textContent = `${myExpense.amount}    ${myExpense.description}    ${myExpense.category}             `;
  let editbtn = document.createElement('button');
  // editbtn
  editbtn.textContent = 'Edit';
  //deletebtn
  let deletebtn = document.createElement('button');
  deletebtn.textContent = 'Delete';
  newListElement.appendChild(editbtn);
  newListElement.appendChild(deletebtn);
  listGroup.appendChild(newListElement);

  editbtn.onclick = () => {
    document.getElementById('amount').value = myExpense.amount;
    document.getElementById('description').value = myExpense.category;
    document.getElementById('category').value = myExpense.description;
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:3000/user/expense/${myExpense.id}`);
  };

  deletebtn.onclick = () => {
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:3000/user/expense/${myExpense.id}`);
  };
}
window.onload = async () => {
  const token = localStorage.getItem('token');
  const expense = await axios.get('http://localhost:3000/user/expense', {
    headers: { Authorization: token },
  });
  expense.data.allExpenseDetails.forEach((response) => {
    getExpense(response);
  });
};
