const jobs = [
  {id:1, company:"TechNova", position:"Frontend Developer", location:"Dhaka", type:"Full-time", salary:"80,000 BDT", description:"Build modern web interfaces.", status:"all"},
  {id:2, company:"CodeSphere", position:"Backend Developer", location:"Chittagong", type:"Remote", salary:"90,000 BDT", description:"Develop APIs and services.", status:"all"},
  {id:3, company:"SoftEdge", position:"UI/UX Designer", location:"Sylhet", type:"Contract", salary:"60,000 BDT", description:"Design user experiences.", status:"all"},
  {id:4, company:"CloudNet", position:"DevOps Engineer", location:"Dhaka", type:"Full-time", salary:"110,000 BDT", description:"Manage cloud infrastructure.", status:"all"},
  {id:5, company:"DataWave", position:"Data Analyst", location:"Rajshahi", type:"Remote", salary:"75,000 BDT", description:"Analyze business data.", status:"all"},
  {id:6, company:"AppCore", position:"Mobile Developer", location:"Khulna", type:"Full-time", salary:"85,000 BDT", description:"Build mobile applications.", status:"all"},
  {id:7, company:"CyberLink", position:"Security Engineer", location:"Dhaka", type:"Full-time", salary:"120,000 BDT", description:"Maintain system security.", status:"all"},
  {id:8, company:"WebNest", position:"Full Stack Developer", location:"Remote", type:"Full-time", salary:"100,000 BDT", description:"Work on frontend & backend.", status:"all"},
];

let currentTab = "all";

const container = document.getElementById("jobsContainer");
const emptyState = document.getElementById("emptyState");

function renderJobs(){
  container.innerHTML = "";

  let filtered = jobs.filter(job => 
    currentTab === "all" ? true : job.status === currentTab
  );

  document.getElementById("tabCount").innerText = `${filtered.length} Jobs`;

  if(filtered.length === 0){
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  filtered.forEach(job=>{
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h3>${job.company}</h3>
      <p><strong>${job.position}</strong></p>
      <p>${job.location} • ${job.type}</p>
      <p>Salary: ${job.salary}</p>
      <p>${job.description}</p>
      <div class="buttons">
        <button class="btn interview">Interview</button>
        <button class="btn rejected">Rejected</button>
        <button class="btn delete">Delete</button>
      </div>
    `;

    div.querySelector(".interview").onclick = ()=>{
      job.status = job.status === "interview" ? "all" : "interview";
      updateDashboard();
      renderJobs();
    };

    div.querySelector(".rejected").onclick = ()=>{
      job.status = job.status === "rejected" ? "all" : "rejected";
      updateDashboard();
      renderJobs();
    };

    div.querySelector(".delete").onclick = ()=>{
      const index = jobs.findIndex(j => j.id === job.id);
      jobs.splice(index,1);
      updateDashboard();
      renderJobs();
    };

    container.appendChild(div);
  });
}

function updateDashboard(){
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText =
    jobs.filter(j=>j.status==="interview").length;
  document.getElementById("rejectedCount").innerText =
    jobs.filter(j=>j.status==="rejected").length;
}

document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    renderJobs();
  });
});

updateDashboard();
renderJobs();