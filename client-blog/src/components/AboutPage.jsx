function AboutPage() {

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row items-center p-28">
          <div className='space-y-10 mt-10'>
            <p className="text-center md:text-left text-xl md:text-3xl lg:w-3/4">
              I am a <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">Computer Science</span> student at the University of Waterloo, 
              continuously learning <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">new software technologies</span>.
              My dream is to fully utilize <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">AI + software applications</span> to create impact.
            </p>
            <p> 
              You can know more about me at <a>Link</a>
            </p>
          </div>
        
          <img className="rounded-3xl w-70 h-70 lg:w-2/5 lg:h-2/5 mt-20" src="/src/assets/Profile.jpg"></img>
        </div>
    </div>
  );
}

export default AboutPage;
