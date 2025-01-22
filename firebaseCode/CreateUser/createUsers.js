let form = document.querySelector('form');
form.addEventListener('submit', createUser);

function createUser(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userId = Math.floor(Math.random() * 10000) + 1;

    const requestOption = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email }),
        redirect: 'follow'
    };

    fetch(`https://practice-9b2ec-default-rtdb.firebaseio.com/users/${userId}.json`, requestOption)
        .then(resp => {
            if (!resp.ok) throw new Error('Network response was not ok');
            return resp.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById('message').textContent = 'User created successfully!';
        })
        .catch(err => {
            console.error(err);
            document.getElementById('message').textContent = 'Error creating user!';
        });
}
