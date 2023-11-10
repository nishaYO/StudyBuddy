function Welcome({setUsername,handleSubmit}) {
 
  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-3">
        <div className="bg-white h-80 w-full lg:w-1/2 rounded-lg border-b-4 border border-[#BEADFA] p-2 flex flex-col items-center">
        <h1 className="text-center text-2xl lg:text-3xl font-mono mt-6">
          Welcome to studybuddy
        </h1>
        <input 
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please Enter Name..." 
              className="border-2 border-[#BEADFA] p-3 rounded-lg w-full lg:w-1/2 mt-8 text-center" />
        <button
            onClick={handleSubmit}
        className="px-6 py-2 mt-8 bg-[#D0BFFF] hover:bg-[#BEADFA] rounded-lg">Submit</button>
      </div>
      </div>
  );
}



export default Welcome;
