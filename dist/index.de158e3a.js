const userForm = document.getElementById("user-form");
const nameInput = document.getElementById("nameInput");
const usernInput = document.getElementById("usernInput");
const mailInput = document.getElementById("mailInput");
const userItems = document.getElementById("user-items");
window.onsubmit = function(event) {
    event.preventDefault();
};
async function getFromServer() {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    console.log(data);
    createList(data);
}
function createList(users) {
    let template = "";
    users.forEach((user, value)=>{
        template += `<div class="task flex justify-between border bg-slate-300 rounded-md p-2">
        <div>${user.name}</div>
        <button data-id="${user.id}" class="delete-btn border p-2 rounded-md bg-red-700 text-white ">Delete</button>
        </div>`;
    });
    userItems.innerHTML = template;
    const btns = document.querySelectorAll(".delete-btn");
    btns.forEach((btn, index)=>{
        btn.onclick = ()=>{
            const dataNewid = btn.dataset.id;
            deleteTask(dataNewid);
        };
    });
}
async function deleteTask(id) {
    await fetch("http://localhost:3000/users/" + id, {
        method: "DELETE"
    });
    getFromServer();
    console.log(id);
}
const addbtns = document.querySelectorAll(".add-btn");
addbtns.forEach((addbtn, index)=>{
    addbtn.onclick = ()=>{
        addtask();
    };
});
async function addtask() {
    var addInfo = {
        id: Math.floor(Math.random()),
        name: nameInput.value,
        username: usernInput.value,
        email: mailInput.value
    };
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addInfo)
    });
    getFromServer();
}
getFromServer();

//# sourceMappingURL=index.de158e3a.js.map
