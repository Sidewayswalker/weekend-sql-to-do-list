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

function renderToDoList(todos){
    let toDoLocation = document.getElementById("to-do-table-body");
    toDoLocation.innerHTML = "";
    // Loop over each task and append data to the DOM.
    for (let todo of todos) {
        toDoLocation.innerHTML += `
            <tr>
                <td>${todo.text}</td>
                <td>${todo.isComplete}</td>
            </tr>
        `
    }
}
//! GET - END

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
//! POST - END

//! CLEAR Input Fields
function clearForm() {
  document.getElementById("taskIn").value = "";
}
//! CLEAR Input Fields


getToDoList();