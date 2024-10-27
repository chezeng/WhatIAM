function AboutPage({ theme }) {
  return (
    <div id="top" className="h-svh grid grid-rows-2 space-y-28 lg:space-y-0 sm:grid-cols-2 px-20 items-center pt-52 pb-0 iphone:pb-20 sm:pb-0 lg:pt-52" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}}>
        <div className='space-y-10'>
          <ul className="list-disc space-y-5 text-left text-xl md:text-3xl text-black font-bold italic">
            <li>I am always learning <span className="bg-yellow-300 p-2">Computer Science</span>.</li>
            <li>I aspire to fully utilize <span className="bg-yellow-300 p-2">AI + software applications</span> to create impact.</li>
            <li>I have a personal website at <span className="bg-yellow-300 p-2"><a href="https://www.chengzeng.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500">chengzeng.dev</a></span>.</li>
            <li>You can refresh the webpage to <span className="bg-yellow-300 p-2">change the theme</span>!</li>
          </ul>
        </div>

        <div className='hover:scale-105 transition ease-in-out duration-300 flex justify-center'>
          <img className="floating rounded-3xl w-2/3" src='https://chezeng.github.io/Media/WhatIAM/Profile.jpg'></img>
        </div>
    </div>
  );
}

export default AboutPage;
