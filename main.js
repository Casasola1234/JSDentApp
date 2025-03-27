const dentDB = JSON.parse(localStorage.getItem("dentDB")) || [];
let form = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let lastname = document.getElementById("lastnaInput");
let date = document.getElementById("dateInput");
let doctor = document.getElementById("doctors");
let textarea= document.getElementById("textarea");
let msg = document.getElementById("msg");
let appointments = document.getElementById("appointments")
let add = document.getElementById("add");


loadApp();

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation();
});

function formValidation(){
    if(nameInput.value === ""){
        console.log("failure");
        msg.innerHTML="Value required, please complete.";
        
    }else {
        console.log("success");
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
          })();
    }
}

function acceptData(){
    dentDB.push({
        firstname : nameInput.value,
        lastname : lastname.value,
        date : date.value,
        doctor : doctor.value,
        description : textarea.value,

    });
    localStorage.setItem("dentDB",JSON.stringify(dentDB));
    console.log(dentDB);
    createAppointments();
}

 function createAppointments(){
    appointments.innerHTML="";
    
    dentDB.map((x,y)=>{
        return (appointments.innerHTML += `
            
            <div id=${y} class="card-body">
            <div class="card-header">Date: ${x.date}</div>
            <h6 class="card-title">${x.firstname} ${x.lastname}</h4>
                  <span class="fw-bold">Doctor: ${x.doctor}</span>
                  <p class="card-text">${x.description}</p>
        
                  <span class="options">
                    <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick ="deleteTask(this);createAppointments()" class="fas fa-trash-alt"></i>
                  </span>
                </div>
                </br>
             `);
    });
    resetForm();
}

function resetForm(){
    nameInput.value = "";
    lastname.value = "";
    date.value ="";
    doctor.value ="";
    textarea.value="";
}

async function loadApp(){
    let myProm = new Promise(function(resolve){
        setTimeout(()=>{
            createAppointments();
            resolve();
        },1000);
    });
    await myProm;
    console.log("appointments added successfully.")

}
async function deleteTask(e){
    let myProm = new Promise(function(resolve){
        console.log("removing.....");
        setTimeout(()=>{
            e.parentElement.parentElement.remove();
            dentDB.splice(e.parentElement.parentElement.id,1);
            localStorage.setItem("dentDB", JSON.stringify(dentDB));
            console.log(dentDB);
            loadApp();
            resolve();

        },2000);
        
    });
    await myProm;
    console.log("removed successfully.");


  }

  async function editTask(e) {
    let myProm = new Promise(function(resolve){
        let selectedTask = e.parentElement.parentElement; // Obtiene la tarjeta de la cita
    
    // Extraer los valores correctamente usando querySelector
    let dateValue = selectedTask.querySelector(".card-header").textContent.replace("Date: ", "");
    let nameValue = selectedTask.querySelector(".card-title").textContent.split(" ")[0]; 
    let lastnameValue = selectedTask.querySelector(".card-title").textContent.split(" ")[1]; 
    let doctorValue = selectedTask.querySelector(".fw-bold").textContent.replace("Doctor: ", "");
    let descriptionValue = selectedTask.querySelector(".card-text").textContent;

    // Asignar valores a los inputs
    nameInput.value = nameValue;
    lastname.value = lastnameValue;
    date.value = dateValue;
    doctor.value = doctorValue;
    textarea.value = descriptionValue;
    resolve();
    

    });
    await myProm;

    form.addEventListener("submit",function(event){
        event.preventDefault();
        deleteTask(e);

    },{once:true});
    
  
    
}
 