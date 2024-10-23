import React from 'react'
import Header from '../home/_components/Header'
import Footer from '../_components/Footer_Doctor'
import ScheduleHero from '../home/_components/ScheduleHero'
import ScheduleDay from '../home/_components/ScheduleDay'
import ScheduleDetail from '../home/_components/ScheduleDetail'

const Schedule = () => {
  return (
    <div className='flex flex-col min-h-screen pb-[68px]'>
            <Header />
            <ScheduleHero />
            <ScheduleDay/>
            <ScheduleDetail/>
            <Footer />
        </div>
  )
}

export default Schedule