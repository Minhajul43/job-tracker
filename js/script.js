const jobs = [

{ id:1, company:"TechNova", position:"Frontend Developer", location:"Dhaka", type:"Full-time", salary:"80,000 BDT", status:"NOT APPLIED", description:"Build responsive web interfaces using modern JavaScript." },

{ id:2, company:"CodeSphere", position:"Backend Developer", location:"Chittagong", type:"Remote", salary:"90,000 BDT", status:"NOT APPLIED", description:"Develop scalable backend APIs for web applications." },

{ id:3, company:"SoftEdge", position:"UI/UX Designer", location:"Sylhet", type:"Contract", salary:"60,000 BDT", status:"NOT APPLIED", description:"Design intuitive and beautiful user experiences." },

{ id:4, company:"CloudNet", position:"DevOps Engineer", location:"Dhaka", type:"Full-time", salary:"110,000 BDT", status:"NOT APPLIED", description:"Maintain cloud infrastructure and CI/CD pipelines." },

{ id:5, company:"DataWave", position:"Data Analyst", location:"Rajshahi", type:"Remote", salary:"75,000 BDT", status:"NOT APPLIED", description:"Analyze datasets to generate business insights."},

{ id:6, company:"AppCore", position:"Mobile Developer", location:"Khulna", type:"Full-time", salary:"85,000 BDT", status:"NOT APPLIED", description:"Develop cross-platform mobile applications."},

{ id:7, company:"CyberLink", position:"Security Engineer", location:"Dhaka", type:"Full-time", salary:"120,000 BDT", status:"NOT APPLIED", description:"Protect systems and networks from cyber threats."},

{ id:8, company:"WebNest", position:"Full Stack Developer", location:"Remote", type:"Full-time", salary:"100,000 BDT", status:"NOT APPLIED", description:"Work with frontend and backend technologies." }

];

let currentTab = "all";

const container = document.getElementById("jobsContainer");
const emptyState = document.getElementById("emptyState");

/* Render Jobs */

function renderJobs(){

container.innerHTML="";

let filtered = jobs.filter(job => 
currentTab === "all" ? true : job.status === currentTab
);

document.getElementById("tabCount").innerText = filtered.length + " Jobs";

if(filtered.length === 0){

emptyState.classList.remove("hidden");

return;

}else{

emptyState.classList.add("hidden");

}

filtered.forEach(job=>{

const card = document.createElement("div");

card.className="job-card";

card.innerHTML = `

<img src="image/delete.png" class="delete-icon">

<h3>${job.company}</h3>

<p><strong>${job.position}</strong></p>

<p>${job.location} • ${job.type}</p>

<p>Salary: ${job.salary}</p>

<p>${job.description}</p>

<span class="status">${job.status}</span>

<div class="buttons">

<button class="btn interview">Interview</button>

<button class="btn rejected">Rejected</button>

</div>

`;

card.querySelector(".interview").onclick = () => {

job.status = "interview";

updateDashboard();

renderJobs();

};

 card.querySelector(".rejected").onclick = () => {

 job.status = "rejected";

 updateDashboard();

 renderJobs();

  };
  
  card.querySelector(".delete-icon").onclick = () => {

const index = jobs.findIndex(j => j.id === job.id);

jobs.splice(index,1);

updateDashboard();

renderJobs();

};

container.appendChild(card);

});

}

/* Dashboard Count */

function updateDashboard(){

document.getElementById("totalCount").innerText = jobs.length;

document.getElementById("interviewCount").innerText =
jobs.filter(job => job.status === "interview").length;

document.getElementById("rejectedCount").innerText =
jobs.filter(job => job.status === "rejected").length;

}

/* Tabs */

document.querySelectorAll(".tab").forEach(tab => {

tab.addEventListener("click", ()=>{

document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

tab.classList.add("active");

currentTab = tab.dataset.tab;

renderJobs();

});

});

updateDashboard();

renderJobs();