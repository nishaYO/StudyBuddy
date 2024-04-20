import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { addNotification } from "../../redux/notifications";
import { SUBMIT_CONTACT_FORM } from "../../graphql/mutations";
function Contact() {
  const [submitContactForm] = useMutation(SUBMIT_CONTACT_FORM);
  const dispatch = useDispatch();
  const handleNotification = () => {
    const newNotification = {
      id: Date.now(),
      message: "Your query is submitted. We will reach out to you soon!",
    };

    dispatch(addNotification(newNotification));
    console.log(newNotification);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    userID: localStorage.getItem("user").id || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setError("");
    setSuccess("");

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

    // Set loading to true
    setLoading(true);

    try {
      const response = await submitContactForm({
        variables: {
          input: formData,
        },
      });

      console.log(response.data);
      if (response.data.submitContactForm.success) {
        handleNotification();
      }
    } catch (error) {
      setError("Error submitting contact form:", error.message);
      console.log(error);
    } finally {
      // Set loading back to false after submission
      setLoading(false);
    }
  };
  // input style
  const inputStyle =
    "w-full p-3 rounded-lg border border-black outline-none border-b-4 border-r-4 transition-transform duration-300 delay-200 transform focus:scale-105";
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${inputStyle}`}
            placeholder="Your Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputStyle}`}
            placeholder="Your Email Address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-500">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${inputStyle}`}
            placeholder="Your Message"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-[#BEADFA] text-white rounded-md text-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
        {success && (
          <p className="text-green-700 font-semibold mt-3">{success}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
