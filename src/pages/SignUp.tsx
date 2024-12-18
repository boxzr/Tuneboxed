import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { name, email });
  };

  return (
    <div className="page">
      <div className="signup-form">
        <h2>Join Tuneboxed</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
      <div className="preview-grid">
        <div className="preview-box"></div>
        <div className="preview-box"></div>
        <div className="preview-box"></div>
      </div>
    </div>
  );
}

export default SignUp;
