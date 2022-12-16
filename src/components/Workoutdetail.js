import React from 'react'
import { useWorkoutContext } from '../hook/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Workoutdetail({ workout }) {
  const { dispatch } = useWorkoutContext()
  const handleclick = async () => {
    const response = await fetch('http://localhost:5000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      })

    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }
  return (
    <div className=' space-x-10 max-w-xl px-8 py-2 border-solid  '>
      <div className=' h-30  ml-7 border 
      border-b-red rounded-lg w-40 p-6 bg-gray-500 flex flex-col flex-wrap '>
        <h1>
          {workout.title}
        </h1>
        <p><strong>Load (kg) : </strong>{workout.load}</p>
        <p><strong>Reps : </strong>{workout.reps}</p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
        <button onClick={handleclick} className='bg-gray-800 text-white mt-2 px-3 w-20  py-1 rounded-2xl ' type='submit'>Delete</button>
      </div>
    </div>
  )
}

export default Workoutdetail