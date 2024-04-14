console.log('JS is sourced!');


//! POST FUNCTION
function submitTask(event){
    event.preventDefault();

    let newTask = {
        text: document.getElementById('taskIn').value
    }

    console.log('before axios');
    //Send new tasks to the server
    axios({
        method: 'POST',
        url: '/todos',
        data: newTask
    })
    .then((response) => {
        clearForm();
        console.log('This is our POST response',response);
        //TODO  getKoalas(); - Get Tasks from Database
      }).catch((error) => {
        console.log('Error', error);
      });
}


function clearForm(){
    document.getElementById('taskIn').value = "";
}