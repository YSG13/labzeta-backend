import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function RequestForm() {
  const [formData, setFormData] = useState({ name: '', email: '', category: '', description: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'requests'), {
        ...formData,
        status: 'Pending',
        requestId: Math.random().toString(36).substr(2, 9)
      });
      setStatus('Request submitted!');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('Error submitting request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <textarea name="description" placeholder="Describe your project..." onChange={handleChange} required />
      <button type="submit">Submit</button>
      <p>{status}</p>
    </form>
  );
}

export default RequestForm;