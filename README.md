# react-essential-training
this repo is for me to learn react from linkedin learning

# create a react project
```bash
npm create vite@latest react-project -- --template react
```

after creating a project, go to package.json to delete react and react dom, then install it again for the latest version

> npm install --save-exact react@rc react-dom@rc

# create a next project
```bash
npx create-next-app@latest
```

# How useEffect Works
The useEffect hook takes two arguments:

A function containing the effect code.
A dependencies array to control when the effect runs.
The dependencies array helps control when the effect runs:

- []: Runs only once when the component mounts.
- [someVariable]: Runs every time someVariable changes.
- No array: Runs after every render.

## Cleanup Function
To clean up after the effect (like removing event listeners or clearing timers), useEffect can return a function:

```javascript
useEffect(() => {
  const subscription = subscribeToSomeService();
  return () => {
    subscription.unsubscribe(); // Cleanup on unmount or dependency change
  };
}, []);
```

## Example usage

To implement cleanup logic for an API call in useEffect, we’ll need to use an approach that allows canceling the request if it’s still pending when the component unmounts. One way to handle this is by using an AbortController, which provides an abort signal to cancel fetch requests. Here’s how you can implement it:

```javascript
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        if (!signal.aborted) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();

    return () => {
      // Cancel the API call if the component unmounts
      controller.abort();
    };
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default MyComponent;
```

### Explanation
1. Creating an Abort Controller: We initialize an AbortController instance within useEffect. This controller provides a signal that can be passed to the fetch request to enable cancellation.

2. Using the Abort Signal: By passing signal in the fetch options, the request can be canceled whenever controller.abort() is called.

3. Error Handling: If the fetch request is aborted, it will throw an error with the name AbortError, which we handle separately to avoid unnecessary error logs.

4. Cleanup on Unmount: The return statement inside useEffect is the cleanup function. When the component unmounts, calling controller.abort() cancels the request, preventing further updates to the state or potential memory leaks.

This approach ensures that if the component unmounts before the data is fetched, the fetch request will be canceled, avoiding any unnecessary resource use or state updates.

## Another example
If you want to ensure that only the latest button click initiates an API call and cancels any ongoing requests from either button, you can achieve this by:

1. Keeping track of all ongoing requests using shared AbortController references for each API call.
2. Canceling all ongoing requests when a button is clicked.
3. Proceeding with only the new API call triggered by the button.

Here’s how to implement it in React:

```javascript
import { useState, useRef } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  // Refs to track AbortControllers for each API call
  const controllerOneRef = useRef(null);
  const controllerTwoRef = useRef(null);

  // Function to cancel all ongoing requests
  const cancelAllRequests = () => {
    if (controllerOneRef.current) {
      controllerOneRef.current.abort();
      controllerOneRef.current = null; // Reset after aborting
    }
    if (controllerTwoRef.current) {
      controllerTwoRef.current.abort();
      controllerTwoRef.current = null; // Reset after aborting
    }
  };

  // API call function for button one
  const fetchDataOne = async () => {
    cancelAllRequests(); // Cancel any ongoing requests

    // Create a new AbortController for this request
    controllerOneRef.current = new AbortController();
    const { signal } = controllerOneRef.current;

    try {
      const response = await fetch('https://api.example.com/data1', { signal });
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch for data1 aborted');
      } else {
        console.error('Fetch error:', error);
      }
    }
  };

  // API call function for button two
  const fetchDataTwo = async () => {
    cancelAllRequests(); // Cancel any ongoing requests

    // Create a new AbortController for this request
    controllerTwoRef.current = new AbortController();
    const { signal } = controllerTwoRef.current;

    try {
      const response = await fetch('https://api.example.com/data2', { signal });
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch for data2 aborted');
      } else {
        console.error('Fetch error:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={fetchDataOne}>Fetch Data 1</button>
      <button onClick={fetchDataTwo}>Fetch Data 2</button>
      <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'No data'}</div>
    </div>
  );
}

export default MyComponent;
```

# Difference between useEffect hook and useRef
In React, useEffect and useRef serve distinct purposes and are typically used in different scenarios. Here’s an overview of when and why to use each:

## When to Use useEffect
useEffect is a hook for handling side effects in React components, such as:

1. Fetching Data: When a component loads or updates, and you need to fetch data from an API, use useEffect to initiate the request.
```javascript
useEffect(() => {
  fetchData();
}, []);
```
2. Subscribing to or Unsubscribing from Services: Use useEffect to set up subscriptions (like WebSocket connections) when the component mounts and clean them up when it unmounts.
```javascript
useEffect(() => {
  const socket = new WebSocket('ws://example.com');
  return () => socket.close(); // Cleanup
}, []);
```
3. Updating State Based on Props or Dependencies: If a component’s behavior depends on props or state values, use useEffect with a dependency array. This makes useEffect run only when those dependencies change.
```javascript
useEffect(() => {
  // Code to handle prop change
}, [someProp]);
```
4. Setting Up and Cleaning Up Timers: Use useEffect for timers or intervals, ensuring they are cleaned up when the component unmounts or dependencies change.
```javascript
useEffect(() => {
  const timer = setInterval(() => doSomething(), 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```
5. Manipulating the DOM (Only If Necessary): For example, updating the document title based on a component’s state.
```javascript
useEffect(() => {
  document.title = `New Title - ${stateValue}`;
}, [stateValue]);
```

## When to Use useRef
useRef is used to persist values across renders without triggering a re-render, as well as for direct DOM manipulation. Typical use cases include:
1. Storing a Value Between Renders Without Re-Renders: For example, tracking the previous value of a prop or a state variable.

```javascript
const previousValue = useRef(someProp);
useEffect(() => {
  previousValue.current = someProp;
}, [someProp]);
```

2. Accessing DOM Elements Directly: useRef can be used to directly interact with DOM elements (e.g., focusing an input field).
```javascript
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();
```
```html
<input ref={inputRef} />
```

3. Maintaining Mutable Values That Don’t Cause Re-Renders: For example, storing an AbortController or a timer ID, which doesn’t need to cause re-renders if it changes.
```javascript
const controller = useRef(new AbortController());
```

4. Avoiding Re-Initialization of Non-Primitive Values: useRef helps avoid re-creating the same object or function on every render.
```javascript
const myFunction = useRef(() => { /* some function */ });
```

## Summary
1. useEffect: Use when you need to handle side effects or react to changes in state or props. It’s typically used for anything that should happen as a result of a component render or update, like data fetching, subscriptions, and DOM updates.

2. useRef: Use when you need a persistent, mutable value that doesn’t trigger re-renders or when you need direct DOM access. It’s best for cases where you need to “remember” something between renders but don’t want it to re-render your component.