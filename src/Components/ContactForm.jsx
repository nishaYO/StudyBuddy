// Contact.jsx
import React, { useState } from 'react';
import { submitContactForm } from '../apis/contactData';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setError('');
    setSuccess('');

    // Validate inputs
    if (formData.name.length < 2) {
      setError('Please enter a name with at least 2 characters');
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.message.length < 2) {
      setError('Please enter a message with at least 2 characters');
      return;
    }

    // Set loading to true
    setLoading(true);

    try {
      const response = await submitContactForm(formData);

      setSuccess(response.message);
    } catch (error) {
      setError('Error submitting contact form:', error.message);
    } finally {
      // Set loading back to false after submission
      setLoading(false);
    }
  };

  return (
    <div className='p-3 h-screen w-1/2 flex items-center justify-center flex-col'>
      <h1 className="text-4xl mb-3">Contact Us</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
            placeholder="Your Name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
            placeholder="Your Email Address"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border rounded p-2 text-sm"
            placeholder="Your Message"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={`p-2 bg-orange-300 text-white rounded text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-700 font-semibold">{success}</p>}
      </form>
    </div>
  );
}

export default Contact;
