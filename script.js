const BtnaddTask = document.querySelector(".add-todo");
const inputText = document.querySelector(".input-todo");
const hold = inputText.placeholder;
const recordsDisplay = document.querySelector(".records");

const completedrecordsDisplay = document.querySelector(".completedrecords");
let changedata
let completed = [];
let arrInput = [];
let editId = null;
let result;
let objStr = localStorage.getItem("users");
if (objStr !== null) {
  arrInput = JSON.parse(objStr);
}

BtnaddTask.addEventListener("click", function () {
  const name = inputText.value;
  if (editId != null) {
    arrInput.splice(editId, 1, { name: name });
    editId = null;
  } else {
    arrInput.push({ name: name });
  }

  saveInfo(arrInput);
  inputText.value = "";
  BtnaddTask.innerText = "Create";
  inputText.placeholder = "Add Task";
});

inputText.addEventListener("click", function () {
  inputText.placeholder = "";
});

function saveInfo(arrInput) {
  let str = JSON.stringify(arrInput);
  localStorage.setItem("users", str);
  displayInfo();
}

function displayInfo() {
  let statement = "";
  arrInput?.map((user, i) => {
    statement += `<tr>
      <td style="width: 50rem;">${user.name}</td>
      <td><button class="btn btn-outline-secondary" type="button" onclick='checkBox(${i})'>
        <i class="fa-solid fa-square-check fa-sm"></i>
      
      </button> 
      
      </td>
      <td><button class="btn btn-outline-info" type="button" onclick='editInfo(${i})'>
        <i class="fa-solid fa-pen-to-square fa-sm"></i>
      </button>
      </td>
      <td><button class="btn btn-outline-danger" type="button" onclick='deleteInfo(${i})'>
        <i class="fa-solid fa-trash-can fa-sm"></i>
      </button>
    </td>
    </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function editInfo(id) {
  editId = id;
  inputText.value = arrInput[id].name;
  BtnaddTask.innerText = "Save";
}
function deleteInfo(id) {
  arrInput.splice(id, 1);
  saveInfo(arrInput);
}

function checkBox(id) {
  let strike = arrInput[id].name;
  result = strike.strike();
  arrInput.splice(id, 1);
  alert(`Your ${strike} task has been succesfully completed`);
  displayInfo();
  completed.push({ name: strike });
  console.log(completed);
}

function completedData(event){
  changedata = event.target.value;
  console.log(changedata)
  if(changedata == "Completed"){
    document.getElementById('card').style.display = 'block'
    for(let i=0;i<completed.length;i++){

        completed.map(x=>{
          return x.name
        })
    }
  }
}
