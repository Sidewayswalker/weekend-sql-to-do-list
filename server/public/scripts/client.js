console.log("JS is sourced!");

//! GET - START
function getToDoList() {
  axios({
    method: "GET",
    url: "/todos",
  })
    .then((response) => {
      console.log("GET /todos response.data", response.data);
      renderToDoList(response.data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function renderToDoList(todos) {
  let toDoLocation = document.getElementById("to-do-table-body");
  toDoLocation.innerHTML = "";
  // Loop over each task and append data to the DOM.
  for (let todo of todos) {
    if (todo.isComplete === false) {
      toDoLocation.innerHTML += `
            <tr data-testid="toDoItem">
                <td>${todo.text}</td>
                <td>
                    <button data-testid="completeButton" onclick="markTaskComplete(${todo.id})">Complete</button>
                </td>
                <td>
                    <button data-testid="deleteButton" onclick="deleteButton(${todo.id})">❌</button>
                </td>
            </tr>
        `;
    } else {
      toDoLocation.innerHTML += `
        <tr data-testid="toDoItem" id="GreenBackground">
                <td>${todo.text}</td>
                <td></td>
                <td>
                    <button data-testid="deleteButton" onclick="deleteButton(${todo.id})">❌</button>
                </td>
            </tr>
        `;
    }
  }
}
//* GET - END

//! POST - START
function submitTask(event) {
  event.preventDefault();

  let newTask = {
    text: document.getElementById("taskIn").value,
  };

  console.log("before axios");
  //Send new tasks to the server
  axios({
    method: "POST",
    url: "/todos",
    data: newTask,
  })
    .then((response) => {
      clearForm();
      console.log("This is our POST response", response);
      getToDoList();
    })
    .catch((error) => {
      console.log("Error", error);
    });
}
//* POST - END

//! CLEAR Input Fields
function clearForm() {
  document.getElementById("taskIn").value = "";
}
//* CLEAR Input Fields

//! DELETE - START
function deleteButton(todoId) {
  console.log("todoId is:", todoId);
  axios({
    method: "DELETE",
    url: `/todos/${todoId}`,
  })
    .then((response) => {
      getToDoList();
    })
    .catch((error) => {
      console.log("deleteTodo sure broke...", error);
    });
}
//* DELETE - END
//! PUT is UPDATE - START
function markTaskComplete(todoId) {
  axios({
    method: "PUT",
    url: `/todos/${todoId}`,
  })
    .then(function (response) {
      // Retrieve the latest to do list
      getToDoList();
    })
    .catch(function (error) {
      // If there is an error, show alert.
      alert("Error changing task to completed.");
    });
}
//* PUT is UPDATE - END

getToDoList();
