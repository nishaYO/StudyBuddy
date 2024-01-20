import React, { useState } from "react";

function NotesForm({onClose}) {
  const [noteData, setNoteData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the note data to the backend (GraphQL mutation, API call, etc.)
    // For now, you can log the data to the console
    console.log("Note Data Submitted:", noteData);
  };

  const inputStyle =
    "w-full p-3 rounded-lg border border-black outline-none border-b-4 border-r-4 transition-transform duration-300 delay-200 transform focus:scale-105";

  return (
    <div className="bg-purple-300 rounded-lg p-8 m-3 text-center w-[400px] h-[400px] flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-center mb-8">Take Notes</h1>
      <button
        onClick={() => {
          onClose();
        }}
        className="text-black-600 font-bold hover:text-gray-700"
      >
        Close
      </button>{" "}
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className={`${inputStyle}`}
            placeholder="Note Title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-500">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={noteData.body}
            onChange={handleChange}
            className={`${inputStyle}`}
            placeholder="Note Body"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-[#BEADFA] text-white rounded-md text-sm`}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default NotesForm;
