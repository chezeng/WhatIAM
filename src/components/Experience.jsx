import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { FaHandsHelping, FaBookReader, FaMedal, FaChalkboardTeacher,  } from 'react-icons/fa';

import 'react-vertical-timeline-component/style.min.css';

const timelineColor = 'rgb(3, 52, 110)';

function Experience() {
    return (
    <section className='p-28 w-screen h-200rem'>
      <h1 className="flex justify-center text-5xl font-bold mb-6">Experience</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background: timelineColor, color: '#fff' }}
              contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
              iconStyle={{ background: timelineColor, color: '#fff' }}
              icon={<FaMedal />}
            >
              <h3 className="font-bold text-2xl"><span className='italic'>Awards</span> that I have acquired</h3>
              <h4 className="italic">Sept. 2021 - Jun. 2024</h4>
              <ul className='space-y-2'>
                <br></br>
                <li>· University of Waterloo Faculty of Mathematics Entrance Scholarships - Worth $2,000 in total.</li>
                <li>· Hugh McRoberts Secondary International Scholarship Award - Worth $500 in total.</li>
                <li>· Grade 12 Hugh McRoberts Secondary Top Academic Award - Among 1,000+ students.</li>
                <li>· Canadian Senior Mathematics Contest - Top 3.4% among 13372 applicants.</li>
                <li>· Canadian Computer Competition Senior - Top 19.5% among 3947 applicants.</li>
              </ul>
            </VerticalTimelineElement>

          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background: timelineColor, color: '#fff' }}
              contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
              iconStyle={{ background: timelineColor, color: '#fff' }}
              icon={<FaChalkboardTeacher />}
            >
              <h3 className="font-bold text-2xl"><span className='italic'>UBC Geering Up</span> - Junior Instructor</h3>
              <h4 className="italic">Jul. 2023 - Aug. 2023</h4>
              <p>
              Guiding children in hands-on projects such as rocket-building and water filters construction, I enhanced my communication abilities 
              with different levels of staff, as well as my adaptability and teamwork abilities in achieving project success.
              </p>
            </VerticalTimelineElement>

          <VerticalTimelineElement
            className="mt-20"
            contentStyle={{ background: timelineColor, color: '#fff' }}
            contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
            iconStyle={{ background: timelineColor, color: '#fff' }}
            icon={<FaHandsHelping />}
          >
            <h3 className="font-bold text-2xl"><span className='italic'>Richmond Public Library</span> - Team Ambassador</h3>
            <h4 className="italic">Sept. 2021 - Jan. 2024</h4>
            <p>
            Since Grade 10, I have been actively involved in the Richmond Public Library's community involvement program,
            which boosted my empathy with others and fostered a sense of community.
            </p>
          </VerticalTimelineElement>


          <VerticalTimelineElement
            className="mt-20"
            contentStyle={{ background: timelineColor, color: '#fff' }}
            contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
            iconStyle={{ background: timelineColor, color: '#fff' }}
            icon={<FaBookReader />}
          >
            <h3 className="font-bold text-2xl"><span className='italic'>Simon Fraser University</span> - Teaching Assistant</h3>
            <h4 className="italic">Jul. 2022 - Aug. 2022</h4>
            <p>
            As an assistant teacher at SFU, I gained deep insights into engaging people effectively and responsibility
            to ensure the maintainability the projects while regularly updating my progress to instructors.
            </p>
          </VerticalTimelineElement>

    </VerticalTimeline>
    </section>
    );
}



export default Experience;