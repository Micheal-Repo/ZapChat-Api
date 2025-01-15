Using the fetch API in JavaScript, you can make HTTP requests such as GET, POST, PUT, PATCH, and DELETE. Here's a detailed guide with examples for each type of request.


---

1. GET Request

Purpose: Retrieve data from a server.


Example:

fetch('https://api.example.com/items')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

Explanation:

fetch sends a GET request by default.

The response is converted to JSON using response.json().

Handle errors with .catch.




---

2. POST Request

Purpose: Send data to the server to create a new resource.


Example:

fetch('https://api.example.com/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'New Item', price: 100 })
})
  .then(response => response.json())
  .then(data => console.log('Created:', data))
  .catch(error => console.error('Error:', error));

Explanation:

method: 'POST' specifies the HTTP method.

headers include Content-Type to indicate JSON payload.

body contains the JSON stringified data.




---

3. PUT Request

Purpose: Update an entire resource.


Example:

fetch('https://api.example.com/items/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Updated Item', price: 150 })
})
  .then(response => response.json())
  .then(data => console.log('Updated:', data))
  .catch(error => console.error('Error:', error));

Explanation:

method: 'PUT' is used to replace the entire resource with new data.




---

4. PATCH Request

Purpose: Partially update a resource.


Example:

fetch('https://api.example.com/items/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ price: 200 })
})
  .then(response => response.json())
  .then(data => console.log('Partially Updated:', data))
  .catch(error => console.error('Error:', error));

Explanation:

method: 'PATCH' is used for partial updates.

Only the specified fields are updated.




---

5. DELETE Request

Purpose: Remove a resource.


Example:

fetch('https://api.example.com/items/1', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('Deleted successfully');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .catch(error => console.error('Error:', error));

Explanation:

method: 'DELETE' specifies the HTTP method.

No body is required for most DELETE requests.




---

Summary

1. GET: Retrieve data (default fetch behavior).

fetch(url).then(response => response.json());


2. POST: Create a new resource.

fetch(url, { method: 'POST', headers, body });


3. PUT: Update an entire resource.

fetch(url, { method: 'PUT', headers, body });


4. PATCH: Partially update a resource.

fetch(url, { method: 'PATCH', headers, body });


5. DELETE: Remove a resource.

fetch(url, { method: 'DELETE' });



By following these examples, you can handle most HTTP requests using the fetch API effectively.

