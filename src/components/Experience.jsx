import React, { useState, useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { FaHandsHelping, FaBookReader, FaMedal, FaChalkboardTeacher,  } from 'react-icons/fa';
import Title from './Title';

import 'react-vertical-timeline-component/style.min.css';

const timelineColor = 'rgb(3, 52, 110)';

const Experience = () => {
    return (
    <section className='p-28 w-screen h-200rem '>
      <Title title='Experience'/>
        <VerticalTimeline className='mt-24 w-96 right-20 md:right-0 sm:w-full'>
          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background: timelineColor, color: '#fff' }}
              contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
              iconStyle={{ background: timelineColor, color: '#fff' }}
              icon={<FaMedal />}
            >
              <h3 className="font-bold text-4xl mt-2 paragraph">Awards</h3>
              <h4 className="italic paragraph text-lg mt-2">Sept. 2021 - Jun. 2024</h4>
              <ul className='space-y-4 text-md md:text-lg mb-2'>
                <br></br>
                <li>— University of Waterloo Faculty of Mathematics Entrance Scholarships - Worth <span className='paragraph underline font-bold'>$2,000</span> in total.</li>
                <li>— Hugh McRoberts Secondary International Scholarship Award - Worth <span className='paragraph underline font-bold'>$500</span> in total.</li>
                <li>— Grade 12 Hugh McRoberts Secondary Top Academic Award - Among <span className='paragraph underline font-bold'>1,000+</span> students.</li>
                <li>— Canadian Senior Mathematics Contest - <span className='paragraph underline font-bold'>Top 3.4%</span> among <span className='paragraph underline font-bold'>13372</span> applicants.</li>
                <li>— Canadian Computer Competition Senior - <span className='paragraph underline font-bold'>Top 19.5%</span> among <span className='paragraph underline font-bold'>3947</span> applicants.</li>
              </ul>
            </VerticalTimelineElement>

          <VerticalTimelineElement
              className="mt-20"
              contentStyle={{ background: timelineColor, color: '#fff' }}
              contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
              iconStyle={{ background: timelineColor, color: '#fff' }}
              icon={<FaChalkboardTeacher />}>
              <h3 className="font-bold text-3xl mt-2 paragraph">UBC Geering Up Junior Instructor</h3>
              <h4 className="italic paragraph text-xl mt-2">Jul. 2023 - Aug. 2023</h4>
              <ul className='space-y-4 text-md md:text-lg mb-2'>
                <br></br>
                <li>— Guiding children in hands-on projects such as rocket-building and water filters construction, I enhanced my communication abilities 
                with different levels of staff, as well as my adaptability and teamwork abilities in achieving project success.</li>
              </ul>
            </VerticalTimelineElement>

          <VerticalTimelineElement
            className="mt-20"
            contentStyle={{ background: timelineColor, color: '#fff' }}
            contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
            iconStyle={{ background: timelineColor, color: '#fff' }}
            icon={<FaHandsHelping />}>
            <h3 className="font-bold text-2xl"><span className='italic'>Richmond Public Library</span> - Team Ambassador</h3>
            <h4 className="italic paragraph text-xl">Sept. 2021 - Jan. 2024</h4>
            <ul className='space-y-2 text-lg mt-7'>
              <li>Since Grade 10, I have been actively involved in the Richmond Public Library's community involvement program,
            which boosted my empathy with others and fostered a sense of community.</li>
            </ul>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="mt-20"
            contentStyle={{ background: timelineColor, color: '#fff' }}
            contentArrowStyle={{ borderRight: `7px solid ${timelineColor}` }}
            iconStyle={{ background: timelineColor, color: '#fff' }}
            icon={<FaBookReader />}>
            <h3 className="font-bold text-2xl"><span className='italic'>Simon Fraser University</span> - Teaching Assistant</h3>
            <h4 className="italic paragraph text-xl">Jul. 2022 - Aug. 2022</h4>
            <ul className='space-y-2 text-lg mt-7'>
              <li>As an assistant teacher at SFU, I gained deep insights into engaging people effectively and responsibility
            to ensure the maintainability the projects while regularly updating my progress to instructors.</li>
            </ul>
          </VerticalTimelineElement>

    </VerticalTimeline>
    </section>
    );
}



export default Experience;