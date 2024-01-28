import React from 'react'

const SessionPaused = ({onclose}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md text-center  w-[400px]  h-[160px]">
            <p className="mb-4 text-2xl font-bold">Session Paused</p>
            <button
              onClick={() => {
                onclose();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Resume
            </button>
          </div>
        </div>
  )
}

export default SessionPaused