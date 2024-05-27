import { useMutation, useQuery } from "@apollo/client";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaPenClip } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import useLocation from "wouter/use-location";
import { DELETE_NOTE_MUTATION } from "../../graphql/mutations";
import { GET_ALL_NOTES } from "../../graphql/queries";
import NotesForm from "../SessionComponents/NotesForm";

const Notes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isDeleting, setIsDelete] = useState(false);
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
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
    return (
      <div className="min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !data.getAllNotes.success) {
    return (
      <p>
        Error fetching notes: {error ? error.message : data.getAllNotes.message}
      </p>
    );
  }

  const notes = data.getAllNotes.notes;

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to highlight search term in content
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
  };

  return (
    <main className="p-5 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="p-3 text-xl py-3 bg-purple-500 hover:bg-purple-300 mt-4 mb-8 text-white rounded-full"
      >
        <IoMdArrowBack />
      </button>
      <div className="max-w-4xl mx-auto">
        <div className="">
          {showModal && (
            <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center">
              <div className="p-5 bg-white min-w-[350px]">
                <NotesForm onClose={() => setShowModal(false)} />
              </div>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div className="relative lg:flex lg:items-center lg:justify-center gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            className="p-3 px-4 mb-4 border rounded-lg w-full pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src="/searchicon.png"
            alt="Search Icon"
            className="absolute right-4 top-1/3 transform -translate-y-1/2 h-6 w-6 text-gray-400 pointer-events-none"
          />

          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="p-3 fixed right-5 bottom-2 py-3 border bg-purple-500 hover:bg-[#ca8bf7] rounded-lg mt-4 mb-8 text-white flex items-center gap-2"
          >
            Add Note <FaPenClip />
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-3 fixed left-5 bottom-2 text-xl py-3 bg-purple-500 hover:bg-purple-300 mt-6 mb-8 text-white rounded-full"
          >
            <IoMdArrowBack/>
          </button>
        </div>

        {/* error alert when deleting the message */}
        <div className="mb-4 fixed right-4 top-3">
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
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl">
              <h1 className="p-2 card-title bg-purple-500 text-white rounded-t-xl">
                {note.title}
              </h1>
              <p
                className="p-2 text-justify italic"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(note.content, searchQuery),
                }}
              ></p>
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
export default Notes;
