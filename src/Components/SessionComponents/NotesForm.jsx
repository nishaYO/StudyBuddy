import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_NOTE_MUTATION } from "../../graphql/mutations";

function NotesForm({ onClose }) {
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

  const user = JSON.parse(localStorage.getItem("user"));

  const [newNote, { loading, error }] = useMutation(NEW_NOTE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Note Data Submitted:", noteData);

    try {
      console.log(user.id, noteData.title, noteData.body);
      const { data } = await newNote({
        variables: {
          input: {
            userID: String(user.id),
            title: String(noteData.title), 
            content: String(noteData.body),  
          },
        },
      });

      console.log("data: ", data);

      if (data && data.newNote.success && data.newNote.note) {
        console.log(`note successfully added. Title: ${data.newNote.note.title}, Content: ${data.newNote.note.content}`);
      } else {
        console.log(`Error: ${data.newNote.message}`);
      }
    } catch (error) {
      console.error("note creation failed:", error.message);
    }
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
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}

export default NotesForm;
