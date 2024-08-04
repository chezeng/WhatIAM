function About() {
    return (
      <section className='p-28 w-screen h-full'>
        <h1 className="flex justify-center text-5xl md:text-6xl font-bold">About Me</h1>
        <div className="lg:flex mt-14 flex md:flex-row flex-col items-center justify-between">
          <p className="text-xl md:text-3xl lg:w-1/2 md:ml-10 mr-10 text-center md:text-left lg:-mt-20">
            I am a <span className="text-blue-500 font-bold">Computer Science</span> student at the University of Waterloo, 
            continuously learning <span className="text-blue-500 font-bold">new software technologies</span>.
            My dream is to fully utilize <span className="text-blue-500 font-bold">AI + software applications</span> to create impact.
          </p>
          <img className="rounded-3xl w-80 h-80 md:w-1/3 md:h-1/3 mt-10 md:mt-0" src="/src/assets/Profile.jpg"></img>
        </div> 
     
        <div className="flex justify-center sm:w-full lg:w-1/3 xl:w-1/4 lg:-mt-32 xl:-mt-52">
          <div className='card-wrapper-button font-bold h-[5rem] w-[15rem] hover:scale-105 transition ease-in-out mt-28'>
            <a href={'/src/assets/ChengResume.pdf'} target="_blank" rel="noopener noreferrer">
              <div className='card-content-button rounded-3xl cursor-pointer'>
                <p className="text-center text-xl font-bold mt-6">Check my resume</p>
              </div>
            </a>
          </div>
        </div>
        
      </section>
    );
}



export default About;