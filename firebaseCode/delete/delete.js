
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
    const table=document.getElementById('table-data');

    Object.keys(data).forEach(userId =>{
        const user =data[userId]
        const row=document.createElement('tr');
        const name=document.createElement('td');
        const email = document.createElement('td');
        const action =document.createElement('td');

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

        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(action);
        table.appendChild(row);
    })

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
  
  
fetchUsers();