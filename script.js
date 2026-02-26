let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let grades = JSON.parse(localStorage.getItem("grades")) || [];
let userName = localStorage.getItem("userName");

if(userName){
  showDashboard();
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function saveName(){
  let name = document.getElementById("nameInput").value;
  if(name){
    localStorage.setItem("userName",name);
    userName=name;
    showDashboard();
  }
}

function showDashboard(){
  showPage("dashboard");
  document.getElementById("welcomeText").textContent="Halo, "+userName+" 👋";
  renderTasks();
  renderGrades();
}

function addTask(){
  let name=document.getElementById("taskInput").value;
  let deadline=document.getElementById("deadlineInput").value;
  if(name && deadline){
    tasks.push({name,deadline});
    localStorage.setItem("tasks",JSON.stringify(tasks));
    showToast("Tugas ditambahkan!");
    renderTasks();
  }
}

function renderTasks(){
  let list=document.getElementById("taskList");
  list.innerHTML="";
  tasks.forEach(t=>{
    let li=document.createElement("li");
    li.textContent=t.name+" (Deadline: "+t.deadline+")";

    let today=new Date();
    let dl=new Date(t.deadline);
    let diff=(dl-today)/(1000*60*60*24);

    if(diff<=2){
      li.classList.add("deadline-soon");
    }

    list.appendChild(li);
  });
  document.getElementById("taskCount").textContent=tasks.length;
}

function addGrade(){
  let val=parseInt(document.getElementById("gradeInput").value);
  if(!isNaN(val)){
    grades.push(val);
    localStorage.setItem("grades",JSON.stringify(grades));
    showToast("Nilai ditambahkan!");
    renderGrades();
  }
}

function renderGrades(){
  let list=document.getElementById("gradeList");
  list.innerHTML="";
  grades.forEach(g=>{
    let li=document.createElement("li");
    li.textContent=g;
    list.appendChild(li);
  });

  let avg=grades.length?grades.reduce((a,b)=>a+b)/grades.length:0;
  document.getElementById("avgGrade").textContent=avg.toFixed(1);
  document.getElementById("progressBar").style.width=Math.min(avg,100)+"%";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

function showToast(msg){
  let toast=document.getElementById("toast");
  toast.textContent=msg;
  toast.style.opacity=1;
  setTimeout(()=>toast.style.opacity=0,2000);
}
