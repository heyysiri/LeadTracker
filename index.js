const inputbtn = document.getElementById("input-btn")
const deletebtn = document.getElementById("delete-btn")
const inputel = document.getElementById("input-el")
let myLeads = []
const ulEl = document.getElementById("ulel")
const savetab = document.getElementById("save-tb")

const leads = JSON.parse(localStorage.getItem("myLeads"))
if(leads){
    myLeads = leads
    render(myLeads)
}
deletebtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    
})

savetab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

inputel.addEventListener("click", function() {
    inputbtn.textContent = "SAVE INPUT"
})
inputbtn.addEventListener("click", function(){
    inputbtn.textContent = "SAVED!"
    myLeads.push(inputel.value)
    inputel.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
})
function render(leads){
    let listitems = ""
    for(let i=0; i<leads.length; i++){
        listitems += 
        `<li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`
        
    }
    ulEl.innerHTML = listitems
}