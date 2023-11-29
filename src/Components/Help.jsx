import Contact from './ContactForm';

function Help() {
  return (
    <div className='min-h-screen flex items-center'>
      <div className='bg-[#FFF3DA] h-screen w-1/2'>
      {/* <Contact/> */}
      <h1 className='text-center'>Contact form</h1>
      </div>
      <div className='bg-[#BEADFA] h-screen w-1/2 grid lg:flex items-center justify-center p-2 backdrop-blur-md'>
        <div className='p-3 max-w-xl'>
          <h1 className="text-2xl font-bold ">Efficient Learning: Unleash Your Productivity with Study Buddy</h1>
          <p className='mt-4'>Study Buddy is your study companion designed for efficiency. It
            simplifies your study routine, offering timer and music settings,
            ensuring a seamless learning experience. Whether setting up your first
            session or tracking your progress, Study Buddy makes studying
            straightforward and productive. suggest a title for this</p>
        </div>
      </div>
    </div>
  )
}

export default Help