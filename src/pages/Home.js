import React from 'react'
import { useEffect } from "react";
import Workoutcomp from '../components/Workoutcomp';
import Workoutdetail from '../components/Workoutdetail';
import { useWorkoutContext } from '../hook/useWorkoutsContext';



function Home() {
  const { workouts, dispatch } = useWorkoutContext()

  useEffect(() => {

    const fetchWorkoutes = async () => {
      const response = await fetch('https://workouts-api.onrender.com/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    }

    fetchWorkoutes();

  })

  return (
    <div className='flex sm:flex-col lg:flex-row  justify-between bg-slate-800'>
      <div className='workoutes'>
        {workouts && workouts.map((workout) => (
          <Workoutdetail key={workout._id} workout={workout} />
        ))}
      </div>
      <Workoutcomp />

    </div>
  )
}


export default Home