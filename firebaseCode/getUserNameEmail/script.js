
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

        name.textContent=user.name;
        email.textContent=user.email;

        row.appendChild(name);
        row.appendChild(email);
        table.appendChild(row);
    })

}
fetchUsers();