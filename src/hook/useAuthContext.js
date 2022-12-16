import { useContext } from "react";
import { authContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext)
    if (!context) {
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }


    return context
}