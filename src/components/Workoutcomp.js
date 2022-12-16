import { useState } from "react";
import { useWorkoutContext } from '../hook/useWorkoutsContext';

function Workoutcomp() {

  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [err, setErr] = useState(null)

  const hanndlesubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps }
    const response = await fetch('http://localhost:5000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setErr(json.error)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setErr(null)
      console.log('new workout created', json);
      dispatch({ type: 'CREATE_WORKOUTS', payload: json })
    }
  }
  return (
    <div>

      <form onSubmit={hanndlesubmit} className="flex flex-col p-6 gap-6 rounded-lg  bg-gray-900  
       mr-6 mt-8" >
        <input type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter the Ttitle"
          className="py-2 px-2 rounded-2xl"
        />
        <input type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          placeholder="Enter the load"
          className="py-2 px-2 rounded-2xl"
        />
        <input type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          placeholder="Enter the Reps"
          className="py-2 px-2 rounded-2xl"
        />
        <button
          className="bg-gray-800 text-white mt-2 px-3 py-1 rounded-2xl"
          type='submit'>submit</button>
        {err && <span>error</span>}
      </form>
    </div>
  )
}

export default Workoutcomp