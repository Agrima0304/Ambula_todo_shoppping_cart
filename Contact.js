import React, { useState } from 'react';

const Contact = ({ handleSubmit, name, setName, email, setEmail, message, setMessage, formErrors }) => {
  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          {formErrors.message && <p className="error">{formErrors.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
