import React, { useState } from "react";

const backend_endpoint = 'http://localhost:5000/contact/submit';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (formData.name.length < 2) {
      setError("Please enter a name with at least 2 characters");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.message.length < 2) {
      setError("Please enter a message with at least 2 characters");
      return;
    }

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

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default Contact;
