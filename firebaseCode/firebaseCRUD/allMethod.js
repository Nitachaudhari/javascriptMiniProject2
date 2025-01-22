const addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',addUser);

function fetchUsers(){
    fetch(`https://practice-9b2ec-default-rtdb.firebaseio.com/users.json`,{
        method:"GET",
        redirect:"follow"
    })
        .then((resp)=>(resp.json()))
        .then((data)=>{
            if(data){
                displayUser(data);
            }
            else{
                document.getElementById('error-msg').textContent="No users found.";
            }
        })
        .catch((err)=>{
            console.error(err);
            document.getElementById('error-msg').textContent="Error fetching data",+err.message;
        })
}
function displayUser(data){
    const table=document.getElementById('table-data').getElementsByTagName('tbody')[0];
    table.innerHTML="";

    Object.keys(data).forEach(userId =>{
        const user =data[userId]
        const row=document.createElement('tr');
        const name=document.createElement('td');
        const email = document.createElement('td');
        const action =document.createElement('td');
        const lastUpdated=document.createElement('td');

        const editBtn=document.createElement('button');
        editBtn.textContent='Edit';
        editBtn.className="edit-btn";
        editBtn.onclick = ()=>editUser(userId);

        const delBtn =document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.className="del-btn";
        delBtn.onclick=()=>deleteUser(userId,row);

        action.appendChild(editBtn);
        action.appendChild(delBtn);

        name.textContent=user.name;
        email.textContent=user.email;
        lastUpdated.textContent= user.timestamp ? new Date(user.timestamp).toLocaleString():'N/A';

        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(action);
        row.appendChild(lastUpdated);
        table.appendChild(row);
    })

}
function addUser(event){
    console.log("user added")
    window.location.href= `addUser.html`;
}

function editUser(userId){
    window.location.href= `edit.html?userId=${userId}`;
    console.log("edit user")
}

const deleteUser = (key,row) => {
    fetch(`https://practice-9b2ec-default-rtdb.firebaseio.com/users/${key}.json`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      console.log("User deleted successfully");
      row.remove();
    })
    .catch(error => console.error("Error deleting user:", error));
  };
  
  function pollData() {
    let lastFetchedData = {};

    setInterval(() => {
        fetch("https://practice-9b2ec-default-rtdb.firebaseio.com/users.json")
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) !== JSON.stringify(lastFetchedData)) {
                    console.log("Data changed, updating table...");
                    displayUser(data); 
                    lastFetchedData = data;
                }
            })
            .catch(err => {
                console.error("Error polling data:", err);
            });
    }, 5000); 
}


  
fetchUsers();
pollData();