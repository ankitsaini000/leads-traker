import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"
import { getDatabase,
       ref,
       push,
       onValue,
       remove} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"


const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-e2d9e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshort){
    const snapshotDoesExist = snapshort.exists()

    if(snapshotDoesExist){
    const snapshortValues = snapshort.val();
    const leads = Object.values(snapshortValues)
render(leads);
    }
})


deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";

    
})



inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})