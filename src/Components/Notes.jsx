import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_NOTES } from "../graphql/queries";
import { DELETE_NOTE_MUTATION } from "../graphql/mutations";
import useLocation from "wouter/use-location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import NotesForm from "./SessionComponents/NotesForm";

const Notes = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [isDeleting, setIsDelete] = useState(false);
  const [location, navigate] = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;

  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);

  const { loading, error, data, refetch } = useQuery(GET_ALL_NOTES, {
    variables: { userID },
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching notes:", error.message);
    }
  }, [error]);

  const handleDeleteNote = async (noteId) => {
    setIsDelete(true);
    try {
      const { data } = await deleteNote({
        variables: {
          noteId,
        },
      });

      if (data && data.deleteNote.success) {
        console.log("Note deleted successfully!");
        // Refetch the notes after deletion
        refetch();
      } else {
        console.error(`Error deleting note: ${data.deleteNote.message}`);
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
    setIsDelete(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data.getAllNotes.success) {
    return (
      <p>
        Error fetching notes: {error ? error.message : data.getAllNotes.message}
      </p>
    );
  }

  const notes = data.getAllNotes.notes;

  return (
    <main className="p-5 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="p-3 px-12 py-3 border bg-[#D0BFFF] hover:bg-[#ca8bf7] rounded-lg mt-4 mb-8 text-white"
      >
        Back
      </button>
      <div className="max-w-4xl mx-auto">
        <div>
          {showNotes ? (
            <NotesForm
              onClose={() => {
                setShowNotes(false);
              }}
            />
          ) : (
            <button
              onClick={() => {
                setShowNotes(true);
              }}
              className="p-3 px-12 py-3 border bg-[#D0BFFF] hover:bg-[#ca8bf7] rounded-lg mt-4 mb-8 text-white"
            >
              Add Note
            </button>
          )}
        </div>

        {/* error alert when when deleting the message */}
        <div className="mb-4 absolute right-4 bottom-3">
          {isDeleting && (
            <div role="alert" className="alert alert-error animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your Note Is Deleting</span>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-4">Your Notes</h2>
        {/* display all notes of the user */}
        {/* accordion design */}
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
          {notes.map((note) => (
            <div key={note.id} className="card bg-white ">
              <h1 className="p-2 card-title bg-purple-500 text-white">
                {note.title}
              </h1>
              <p className="p-2 text-justify">{note.content}</p>
              <div className="flex items-center justify-between px-3 text-gray-500">
                <small>{new Date(parseInt(note.date)).toLocaleString()}</small>
                <div>
                  <FontAwesomeIcon
                    icon={faPen}
                    className="m-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => navigate(`/edit/${note.id}`)} // Navigate to edit page on click
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="m-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
{
  /* <div className="flex flex-wrap">
          {notes.map((note) => (
            <div
              key={note.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 xl:w-2/5 p-4" 
            >
              <div className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-purple-400">
                    {note.title}
                  </h3>
                  <p className="text-black-700">{note.content}</p>
                  <FontAwesomeIcon
                    icon={faPen}
                    className="m-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => navigate(`/edit/${note.id}`)} // Navigate to edit page on click
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="m-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>
                <div className="bg-[#D0BFFF] text-white p-3 flex justify-between items-center">
                  <small>{new Date(parseInt(note.date)).toLocaleString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div> */
}
export default Notes;
