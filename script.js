
let interviewList = [];
let rejectedList = [];

const total = document.getElementById('total-count');
const interviewCount = document.getElementById('total-interview-count');
const rejectedCount = document.getElementById('total-rejected-count');
const jobCountText = document.getElementById('job-count');

const allCardSection = document.getElementById('all-card-parent');
const filterSec = document.getElementById('filter-sec');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

let activeTab = "all";


function updateCounts(){
  const totalJobs = allCardSection.children.length;
  total.innerText = totalJobs;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  jobCountText.innerText = totalJobs + " jobs";
}
updateCounts();

function toggleStyle(id){
  activeTab = id.replace("-btn","");

  allBtn.classList.remove('bg-blue-400');
  interviewBtn.classList.remove('bg-blue-400');
  rejectedBtn.classList.remove('bg-blue-400');

  document.getElementById(id).classList.add('bg-blue-400');

  if(activeTab === "all"){
    allCardSection.classList.remove('hidden');
    filterSec.classList.add('hidden');
  }else{
    allCardSection.classList.add('hidden');
    filterSec.classList.remove('hidden');
    renderFiltered();
  }
}
function renderFiltered(){
  filterSec.innerHTML = "";

  const list = activeTab === "interview" ? interviewList : rejectedList;

  if(list.length === 0){
    filterSec.innerHTML = `
      <div class="empty-state">
        <i class="fa fa-box-open text-3xl"></i>
        <h2>No jobs available</h2>
        <p>Select another tab</p>
      </div>`;
    return;
  }

  list.forEach(card=>{
    filterSec.appendChild(card.cloneNode(true));
  });
}

document.body.addEventListener("click", e=>{
  const card = e.target.closest('[data-id]');
  if(!card) return;

  const id = card.dataset.id;

  
  if(e.target.classList.contains("interview-btn")){
    removeFrom(rejectedList,id);

    if(!exists(interviewList,id)){
      interviewList.push(card);
      card.querySelector(".not").innerText = "Interview";
    }else{
      removeFrom(interviewList,id);
      card.querySelector(".not").innerText = "Not Applied";
    }
  }

  
  if(e.target.classList.contains("rejected-btn")){
    removeFrom(interviewList,id);

    if(!exists(rejectedList,id)){
      rejectedList.push(card);
      card.querySelector(".not").innerText = "Rejected";
    }else{
      removeFrom(rejectedList,id);
      card.querySelector(".not").innerText = "Not Applied";
    }
  }

  // del
  if(e.target.classList.contains("delete-btn")){
    removeFrom(interviewList,id);
    removeFrom(rejectedList,id);
    card.remove();
  }

  updateCounts();
  if(activeTab !== "all") renderFiltered();
});

function exists(list,id){
  return list.some(c=>c.dataset.id===id);
}

function removeFrom(list,id){
  const index = list.findIndex(c=>c.dataset.id===id);
  if(index>-1) list.splice(index,1);
}

allBtn.onclick=()=>toggleStyle('all-btn');
interviewBtn.onclick=()=>toggleStyle('interview-btn');
rejectedBtn.onclick=()=>toggleStyle('rejected-btn');
// it was too hard