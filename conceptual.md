### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
A. You can manage sync code in javascript by using callbacks, promises, async/await, generators and event emitters and observables.

- What is a Promise?
A. A javascript object that represents the completion or failure of a asynchronous operation and its reulting value.

- What are the differences between an async function and a regular function?
A. Async functions are a way to work with asynchronous code more cleanly and make JavaScript applications more responsive, while regular functions are inherently synchronous and block the event loop during execution. Async functions return Promises and use the await keyword to pause execution, while regular functions do not

- What is the difference between Node.js and Express.js?
A. Node.js is the runtime application allowing Javascript to run on server while Express is a web application framework simplifying the process of building applications and APIs using node.

- What is the error-first callback pattern?
A. The error-first callback pattern is a callback function that takes two agruments : The first arguement typically reserved for an error object or null if ther is no error.The second agruement passes the result or data.

- What is middleware?
A.A software that sits between a client  and servef processing and manipulating data as it goes on.

- What does the `next` function do?
A. It passes control form one middleware function to another in the chain.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
First the requests are running sequentially instead of concurrently which would happen using Promise.all(). Also it is missing any error handling to help show errors.
 