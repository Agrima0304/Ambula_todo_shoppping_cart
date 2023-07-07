import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Contact from './Contact';
import About from './About';
import Home from './Home';
import './App.css';

// Create a new context for the application
const AppContext = React.createContext();

const App = () => {
  // To-Do List state
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Shopping Cart state
  const [cartItems, setCartItems] = useState([]);
  const [newCartItem, setNewCartItem] = useState('');

  // API Integration state
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data from the Chuck Norris API
  const fetchJoke = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setJoke(response.data.value);
      setLoading(false);
    } catch (error) {
      setError('Error fetching joke');
      setLoading(false);
    }
  };

  // Handle adding a new task to the to-do list
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Handle marking a task as completed
  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = `✓ ${updatedTasks[index]}`;
    setTasks(updatedTasks);
  };

  // Handle removing a task from the to-do list
  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Handle adding a new item to the shopping cart
  const handleAddCartItem = () => {
    if (newCartItem.trim() !== '') {
      setCartItems([...cartItems, newCartItem]);
      setNewCartItem('');
    }
  };

  // Handle removing an item from the shopping cart
  const handleRemoveCartItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  // Form validation state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};
    if (name.trim() === '') {
      errors.name = 'Name is required';
    }
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (message.trim() === '') {
      errors.message = 'Message is required';
    }

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Add logic to submit the form data
      console.log('Form submitted:', { name, email, message });
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
      setFormErrors({});
    } else {
      // Set the form errors if there are any
      setFormErrors(errors);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/contact"
            render={(props) => (
              <Contact
                {...props}
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                message={message}
                setMessage={setMessage}
                formErrors={formErrors}
              />
            )}
          />
        </Switch>

        <div className="todo">
          <h2>To-Do List</h2>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={handleAddTask}>Add Task</button>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleCompleteTask(index)}>Complete</button>
                <button onClick={() => handleRemoveTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>
            Total Tasks: {tasks.length} | Completed Tasks: {tasks.filter((task) => task.includes('✓')).length}
          </p>
        </div>
        <div className="cart">
          <h2>Shopping Cart</h2>
          <input
            type="text"
            value={newCartItem}
            onChange={(e) => setNewCartItem(e.target.value)}
            placeholder="Add an item"
          />
          <button onClick={handleAddCartItem}>Add Item</button>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleRemoveCartItem(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Items: {cartItems.length} | Subtotal: $0.00</p>
        </div>

        <div className="api">
          <h2>API Integration</h2>
          <button onClick={fetchJoke}>Fetch Joke</button>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>{joke}</p>
          )}
        </div>
      </div>
    </Router>
  );
};




  


export default App;
