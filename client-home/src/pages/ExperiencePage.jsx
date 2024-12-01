import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { FaHandsHelping, FaBookReader, FaMedal, FaChalkboardTeacher,  } from 'react-icons/fa';
import Title from '../components/Title';

import 'react-vertical-timeline-component/style.min.css';

/**
 * ExperiencePage.jsx
 * 
 * This component renders the Experience section of the application, showcasing various experiences and achievements 
 * in a vertical timeline format. Each experience is represented by a VerticalTimelineElement, which includes details 
 * such as the title, duration, and description of the experience. The timeline elements are styled with radial gradients 
 * and include icons to visually differentiate between different types of experiences.
 * 
 * @component
 * @example
 * return (
 *   <Experience />
 * )
 */

const Experience = () => {
    return (
    <section className='px-28 md:py-28 w-screen h-200rem'>
      {/* Title */}
      <Title title='Experience'/>

      {/* Vertical Timeline */}
        <VerticalTimeline className='mt-10 md:mt-24 w-full ssm:w-85 s450:w-100 s550:w-125 sm:w-125 s650:w-150 right-26 iphone:right-22 s400:right-18 s500:right-16 lg:right-0 md:right-0'>
          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              contentArrowStyle={{ borderRight: `10px solid #fff` }}  
              shadowSize={ 'large' }
              iconStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              icon={<FaMedal />}
            >
              <div className='bg-black p-4 rounded-xl bg-opacity-50 backdrop-blur-lg shadow-lg hover:scale-102 duration-300 transition ease-in-out'>
                <h3 className="font-bold text-4xl mt-3 ml-3 paragraph mb-2">Awards</h3>
                <hr className=''></hr>
                <h4 className="paragraph text-lg mt-2 ml-3">Sept. 2021 - Jun. 2024</h4>
                <ul className='space-y-4 text-md md:text-lg px-4 py-10 list-disc -mt-10'>
                  <br></br>
                  <li>University of Waterloo Faculty of Mathematics Entrance Scholarships - Worth <span className='paragraph underline font-bold'>$2,000</span> in total.</li>
                  <li>Hugh McRoberts Secondary International Scholarship Award - Worth <span className='paragraph underline font-bold'>$500</span> in total.</li>
                  <li>Grade 12 Hugh McRoberts Secondary Top Academic Award - Among <span className='paragraph underline font-bold'>1,000+</span> students.</li>
                  <li>Canadian Senior Mathematics Contest - <span className='paragraph underline font-bold'>Top 3.4%</span> among <span className='paragraph underline font-bold'>13372</span> applicants.</li>
                  <li>Canadian Computer Competition Senior - <span className='paragraph underline font-bold'>Top 19.5%</span> among <span className='paragraph underline font-bold'>3947</span> applicants.</li>
                </ul>
              </div>
            </VerticalTimelineElement>

          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              contentArrowStyle={{ borderRight: `10px solid #fff` }}  
              shadowSize={ 'large' }
              iconStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              icon={<FaChalkboardTeacher />}>
              <div className='bg-black p-4 rounded-xl bg-opacity-50 backdrop-blur-lg shadow-lg hover:scale-102 duration-300 transition ease-in-out'>
                <h3 className="font-bold text-3xl mt-3 ml-3 paragraph mb-2">UBC Geering Up Junior Instructor</h3>
                <hr className=''></hr>
                <h4 className="paragraph text-lg mt-2 ml-3">Jul. 2023 - Aug. 2023</h4>
                <ul className='space-y-4 text-md md:text-lg px-6 py-10 list-disc -mt-10'>
                  <br></br>
                    <li>Led children through hands-on <span className='underline font-bold'>STEM</span> projects like rocket building and water filtration, improving <span className='underline font-bold'>teamwork</span>, <span className='underline font-bold'>communication</span>, and <span className='underline font-bold'>adaptability</span>.</li>
                </ul>
              </div>
            </VerticalTimelineElement>


            <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              contentArrowStyle={{ borderRight: `10px solid #fff` }}  
              shadowSize={ 'large' }
              iconStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              icon={<FaHandsHelping  />}>
              <div className='bg-black p-4 rounded-xl bg-opacity-50 backdrop-blur-lg shadow-lg hover:scale-102 duration-300 transition ease-in-out'>
                <h3 className="font-bold text-3xl mt-3 ml-3 paragraph mb-2">Richmond Public Library Team Ambassador</h3>
                <hr className=''></hr>
                <h4 className="paragraph text-lg mt-2 ml-3">Sept. 2021 - Jan. 2024</h4>
                <ul className='space-y-4 text-md md:text-lg px-6 py-10 list-disc -mt-10'>
                  <br></br>
                    <li>Actively contributed to community programs since <span className='underline font-bold paragraph'>Grade 10</span>, enhancing <span className='underline font-bold'>empathy</span> and a sense of <span className='underline font-bold'>civic engagement</span>.</li>
                </ul>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              contentArrowStyle={{ borderRight: `10px solid #fff` }}  
              shadowSize={ 'large' }
              iconStyle={{ background:`radial-gradient(circle at 48.7% 44.3%, rgb(30, 144, 231) 0%, rgb(56, 113, 209) 22.9%, rgb(38, 76, 140) 76.7%, rgb(31, 63, 116) 100.2%)`, color: '#fff' }}
              icon={<FaBookReader />}>
              <div className='bg-black p-4 rounded-xl bg-opacity-50 backdrop-blur-lg shadow-lg hover:scale-102 duration-300 transition ease-in-out'>
                <h3 className="font-bold text-3xl mt-3 ml-3 paragraph mb-2">Simon Fraser University Teaching Assistant</h3>
                <hr className=''></hr>
                <h4 className="paragraph text-lg mt-2 ml-3">Jul. 2022 - Aug. 2022</h4>
                <ul className='space-y-4 text-md md:text-lg px-6 py-10 list-disc -mt-10'>
                  <br></br>
                    <li>Supported instructors by engaging students and <span className='underline font-bold'>managing projects</span>, ensuring smooth communication and <span className='underline font-bold'>timely updates</span>.</li>
                </ul>
              </div>
            </VerticalTimelineElement>

    </VerticalTimeline>
    </section>
    );
}



export default Experience;