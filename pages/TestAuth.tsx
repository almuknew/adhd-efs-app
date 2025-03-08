// src/pages/TestAuth.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function TestAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('Signing up...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Successfully signed up user: ${user.email}`);
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.code} - ${error.message}`);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('Signing in...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Successfully signed in user: ${user.email}`);
    } catch (error: any) {
      console.error(error);
      setMessage(`Error: ${error.code} - ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Authentication Test</h1>
      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: message.includes('Error') ? '#ffeded' : '#edffed',
          border: `1px solid ${message.includes('Error') ? '#ff6b6b' : '#6bff6b'}`,
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSignUp} 
            style={{ padding: '10px 15px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Sign Up
          </button>
          <button 
            onClick={handleSignIn} 
            style={{ padding: '10px 15px', backgroundColor: '#50c878', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}