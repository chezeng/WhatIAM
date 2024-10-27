function AboutPage({ theme }) {
  return (
    <div className="h-svh grid grid-rows-2 space-y-28 lg:space-y-0 sm:grid-cols-2 px-20 items-center pt-52 pb-0 iphone:pb-20 sm:pb-0 lg:pt-52" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}}>
        <div className='space-y-10'>
          <ul className="list-disc space-y-5 text-left text-xl md:text-3xl text-black font-bold italic">
            <li>I study at <span className="bg-yellow-300 px-1">University of Waterloo</span>.</li>
            <li>I am continuously learning new <span className="bg-yellow-300 px-1">software technologies</span>.</li>
            <li>I dream to fully utilize <span className="bg-yellow-300 px-1">AI + software applications</span> to create impact.</li>
            <li>I created a personal portfolio website at <span className="bg-yellow-300 px-1"><a href="https://www.chengzeng.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500">chengzeng.dev</a></span>.</li>
            <li className-"text-md text-slate-400">P.S. You can try to refresh the webpage to change the theme!</li>
          </ul>
        </div>

        <div className='hover:scale-105 transition ease-in-out duration-300 flex justify-center'>
          <img className="floating rounded-3xl w-2/3" src='https://chezeng.github.io/Media/WhatIAM/Profile.jpg'></img>
        </div>
    </div>
  );
}

export default AboutPage;
