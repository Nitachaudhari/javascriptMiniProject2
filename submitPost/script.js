// URL for the JSONPlaceholder API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Reference to the form and response container in the DOM
const postForm = document.getElementById('post-form');
const responseContainer = document.getElementById('response-container');

// Function to handle form submission
postForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the form fields
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();

    // Validate the form fields
    if (!title || !body) {
        alert('Both fields are required.');
        return;
    }

    // Create the post data
    const postData = { title, body };

    try {
        // Send a POST request to the API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        // Parse the JSON response
        const responseData = await response.json();

        // Display the response data
        displayResponse(responseData);
    } catch (error) {
        console.error('Error submitting post:', error);
        responseContainer.innerHTML = `<p style="color: red;">An error occurred while submitting the post.</p>`;
    }
});

// Function to display the server's response
function displayResponse(data) {
    responseContainer.innerHTML = `
    <div class="response">
      <h3>Post Created Successfully!</h3>
      <p><strong>Post ID:</strong> ${data.id}</p>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Body:</strong> ${data.body}</p>
    </div>
  `;
}
