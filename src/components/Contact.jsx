import { FaHandshake } from "react-icons/fa";

function Contact() {

    return (
    <section className='p-28 w-screen h-max'>
      <h1 className="flex justify-center text-5xl font-bold">Contact</h1>
      <h2 className="text-center mt-14 text-3xl">
        I'm always seeking for the <span className='text-blue-500 inline'>unity of knowledge and action</span>. <br></br>
        Feel free to contact me and I will respond as soon as possible.
      </h2>   
      <div className='flex bottom-96 justify-center opacity-25'><FaHandshake className="w-96 h-96"/></div>     
      <div className="flex justify-center -mt-70 mb-96">
          <div className='card-wrapper-button font-bold h-[5rem] w-[15rem] hover:scale-105 transition ease-in-out mt-28'>
            <a href={'/src/assets/ChengResume.pdf'} target="_blank" rel="noopener noreferrer">
              <div className='card-content-button rounded-3xl cursor-pointer'>
                <p className="text-center text-2xl font-bold mt-5">Contact Me</p>
              </div>
            </a>
          </div>
        </div>      

    </section>
    );
}



export default Contact;
