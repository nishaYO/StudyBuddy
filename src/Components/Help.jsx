import React, { useState } from "react";
// require('dotenv').config();// Load environment variables from .env file
// const backend_endpoint = process.env.SERVER_ENDPOINT || 'http://localhost:5000/contact/submit';
const backend_endpoint = 'http://localhost:5000/contact/submit';

function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(backend_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Contact form submitted successfully!');
        // You can handle success here (e.g., show a success message)
      } else {
        console.error('Failed to submit contact form');
        // You can handle errors here (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // You can handle errors here (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center font-mono">Help Page</h1>

      <div className="container mx-auto mt-8 p-8 w-3/4 bg-[#BEADFA] border border-[#BEADFA] rounded">
        <h1 className="text-4xl mb-6">Contact Us</h1>
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
            className="p-2 bg-orange-300 text-white rounded text-sm"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="p-4 bg-gray-100 border border-[#BEADFA] rounded m-4 w-3/4 container mx-auto ">
        <p className="text-sm text-gray-700">
          Study Buddy is your study companion designed for efficiency. It
          simplifies your study routine, offering timer and music settings,
          ensuring a seamless learning experience. Whether setting up your first
          session or tracking your progress, Study Buddy makes studying
          straightforward and productive.
        </p>
      </div>
    </div>
  );
}

export default Help;
