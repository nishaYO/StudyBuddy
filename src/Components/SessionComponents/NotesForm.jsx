import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_NOTE_MUTATION } from "../../graphql/mutations";
import { GET_ALL_NOTES } from "../../graphql/queries";
import { MdClose } from "react-icons/md";


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

  const { refetch } = useQuery(GET_ALL_NOTES, {
    variables: { userID: user.id },
  });

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
        console.log(
          `note successfully added. Title: ${data.newNote.note.title}, Content: ${data.newNote.note.content}`
        );
        onClose(); // Close the form
        refetch();
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
    <div className="">
     <div className="flex items-center justify-between mb-2">
      <h2 className="font-bold">Write Your Note</h2>
      <button
      className="text-2xl rotate-45 hover:rotate-90 transition-all duration-300 ease-in-out hover:scale-150"
       onClick={() => {
        onClose();
      }}>
        <MdClose/>
      </button>
     </div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label htmlFor="title" className="block text-gray-500">
            Title
          </label> */}
          
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg outline-none"
            placeholder="Note Title"
          />
        </div>

        <div className="mb-4">
          {/* <label htmlFor="body" className="block text-gray-500">
            Body
          </label> */}
          <hr className="border-gray-400" />
          <textarea
            id="body"
            name="body"
            value={noteData.body}
            onChange={handleChange}
            className="w-full p-3 rounded-lg outline-none"
            placeholder="Note Body"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-purple-500 text-[#F4EAE0] font-cursive font-bold rounded-md text-sm focus:outline-none hover:bg-[#8F7DF5] transition-all duration-300 ease-in-out`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}

export default NotesForm;
