import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTES } from "../graphql/queries";
import useLocation from "wouter/use-location";

const Notes = () => {
  const [location, navigate] = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  const { loading, error, data } = useQuery(GET_ALL_NOTES, {
    variables: { userID },
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching notes:", error.message);
    }
  }, [error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data.getAllNotes.success) {
    return <p>Error fetching notes: {error ? error.message : data.getAllNotes.message}</p>;
  }

  const notes = data.getAllNotes.notes;
  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="p-3 px-12 py-3 border bg-[#D0BFFF] hover:bg-[#ca8bf7] rounded-lg mt-4 mb-8 text-white"
      >
        Back
      </button>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Your Notes</h2>
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-purple-400">{note.title}</h3>
              <p className="text-black-700">{note.content}</p>
            </div>
            <div className="bg-[#D0BFFF] text-white p-3 flex justify-between items-center">
              <small>{new Date(parseInt(note.date)).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
