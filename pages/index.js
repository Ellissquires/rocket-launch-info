import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown';

export default function Home({ launches }) {
  let selectedLaunch = launches.result[0];
  return (
    <div className='w-full h-full bg-slate-900'>
      <Head>
        <title>Rocket Launch Info</title>
        <meta name="description" content="Rocket Launch Information. Created by Ellis Squires" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"></link>
      </Head>

      <main className={styles.main}>
        <LaunchDetails launch={selectedLaunch}/>
        <LaunchCountdowns launches={launches}/>
      </main>
    </div>
  )
}

function LaunchDetails ({ launch }) {
  return (
    <div className='relative flex flex-wrap w-100 ml-4 mr-4 sm:w-3/4 p-6 rounded-md mb-10 ring-1 ring-gray-700'>
      <MainSectionHeadingLabel heading="Next Launch"/>
      <LaunchMainDetailCard launch={launch}/>
      <LaunchConditionsCard launch={launch}/>
    </div>
  )
}

function LaunchCountdowns ({ launches }) {
  const launchCards = launches.result.map((launch, i) => <LaunchCountdownCard key={i} launch={launch}/>);
  return (
    <div className="relative flex w-100 ml-4 mr-4 sm:w-3/4 p-6 rounded-md flex-wrap justify-center ring-1 ring-gray-700">
      <MainSectionHeadingLabel heading="Launch Countdowns"/>
      { launchCards }
    </div>
  )
}

function LaunchMainDetailCard ({ launch }) {
  return (
    <div className="w-full lg:w-1/3 p-2 text-sky-400">
      <div className="relative h-full bg-slate-700 ring-1 ring-gray-400 rounded-md p-4">
        <SubSectionHeadingLabel heading="Details"/>
        <div><span className="underline underline-offset-2 text-pink-500">Provider</span> <br/> { launch.provider.name}</div>
        <div><span className="underline underline-offset-2 text-pink-500">Vehicle</span> <br/> { launch.vehicle.name}</div>
        <div><span className="underline underline-offset-2 text-pink-500">Location</span> <br/> { launch.pad.location.name}</div>
        <div><span className="underline underline-offset-2 text-pink-500">Description</span> <br/> { launch.launch_description}</div>
      </div>
    </div>

  )
}

function LaunchConditionsCard ({ launch }) {
  return (
    <div className="w-full lg:w-1/3 p-2 text-sky-400">
      <div className="relative h-full bg-slate-700 ring-1 ring-gray-400 rounded-md p-4">
        <SubSectionHeadingLabel heading="Conditions"/>
        <div className="flex">

        </div>
      </div>
    </div>
  )
}

function LaunchCountdownCard( { launch } ) {
  const launchDate = new Date(launch.sort_date * 1000);
  let inLaunchWindow = false;

  if (launch.win_open) {
    const now = new Date();
    const windowOpenDate = new Date(launch.win_open);
    inLaunchWindow = now > windowOpenDate;
  }

  return (
    <div className='w-full h-32 p-2 md:w-1/2 lg:w-1/3'>
      <div className='relative w-full h-full bg-slate-700 rounded-md p-4 flex justify-center items-center ring-1 ring-gray-400'>
        <SubSectionHeadingLabel heading={launch.vehicle.name}/>
        { inLaunchWindow && 
          <div>
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-5 h-5 rounded-full bg-green-500 animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-5 h-5 rounded-full bg-green-500"></div>
          </div>
        }
        <Countdown className="text-2xl text-sky-400 font-bold tracking-wide select-none" date={launchDate}></Countdown>
      </div>
    </div>
  )
}

function SubSectionHeadingLabel ({ heading }) {
  return (
    <span className='absolute top-0 left-0 p-2 w-full -mt-4 flex justify-center items-center select-none'>
      <span className="w-32 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-sky-400 bg-slate-900 rounded-full ring-2 ring-gray-700">{ heading } </span>
    </span>
  )
}

function MainSectionHeadingLabel ({ heading }) {
  return (
    <span className='absolute top-0 left-0 p-2 w-full -mt-6 flex justify-center items-center select-none'>
      <span className="w-64 inline-flex items-center justify-center px-2 py-2 bg-slate-900 text-md text-bold leading-none text-sky-400 rounded-full ring-1 ring-gray-700">{ heading }</span>
    </span>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://fdo.rocketlaunch.live/json/launches/next/5");
  const launches = await res.json();

  return {
    props: {
      launches,
    }
  }
}
