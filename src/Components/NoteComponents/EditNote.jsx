import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import useLocation from "wouter/use-location";
import { UPDATE_NOTE } from "../../graphql/mutations";
import { GET_NOTE } from "../../graphql/queries";
import Loading from "../Loading";

const EditNote = () => {
  // const [location, setLocation, navigate] = useLocation();
  const [location, navigate] = useLocation();
  const noteId = String(location.split("/").slice(2));

  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { noteId },
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    if (!loading && !error && data && data.getNote.success) {
      const fetchedNote = data.getNote.note;
      setNoteDetails({
        title: fetchedNote.title,
        content: fetchedNote.content,
        date: fetchedNote.date,
      });
    }
  }, [loading, error, data]);

  const handleInputChange = (e) => {
    setNoteDetails({
      ...noteDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateNote = async (e) => {
    try {
      e.preventDefault();
      const { data } = await updateNote({
        variables: {
          noteId,
          input: {
            title: noteDetails.title,
            content: noteDetails.content,
          },
        },
      });

      if (data && data.updateNote.success) {
        console.log("Note updated successfully!");
        // redirect the user to the notes page
        navigate("/notes");
      } else {
        console.error(`Error updating note: ${data.updateNote.message}`);
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  if (loading) {
    return <Loading/>
  }

  if (error || !data.getNote.success) {
    return (
      <p>Error fetching notes: {error ? error.message : data.getNote.message}</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white md:w-[500px] lg:w-[800px] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Edit Note</h2>
        <form onSubmit={handleUpdateNote}>
          <div className="mb-4">
            <label className="block text-gray-600">Title:</label>
            <input
              type="text"
              name="title"
              value={noteDetails.title}
              onChange={handleInputChange}
              className="border-b outline-none rounded flex w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Content:</label>
           <textarea  name="content"
              value={noteDetails.content}
              onChange={handleInputChange}
              className="border rounded w-full p-2" rows="10"></textarea>
          </div>
          <div className="md:flex md:justify-between">
            <button
              type="submit"
              className="bg-purple-500 text-white mb-2 w-full max-w-[300px] py-2 px-4 rounded hover:bg-purple-700 block md:flex md:m-2"
            >
              Update Note
            </button>
            <Link to="/notes">
              <button className="bg-purple-500 text-white mb-2 w-full max-w-[300px] py-2 px-4 rounded block md:flex hover:bg-purple-700 md:m-2">
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
