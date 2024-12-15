import PropTypes from "prop-types";
import dumbellPath from "../../assets/dumbell";
import kiloPath from "../../assets/kilo";
import repeatPath from "../../assets/repeat";

function ExerciseList({exercises, handleAddExercise, handleUpdateExercise}) {
    const handleNewExercise = () => {
        const newExercise = {
            name: "Bench press",
            sets: [{ weight: "30", reps: "12" }], 
        };
        handleAddExercise(newExercise);
    };

    const handleInputChange = (id, field, value, setIndex) => {
        const updatedExercises = exercises.map(e =>
            e.id === id
                ? {
                    ...e,
                    [field]: field === "sets"
                        ? e.sets.map((set, idx) =>
                            idx === setIndex ? { ...set, ...value } : set
                        )
                        : value,
                }
                : e
        );

        const updatedExercise = updatedExercises.find(e => e.id === id);
        handleUpdateExercise(updatedExercise); 
    };

    const handleSetCountChange = (id, action) => {
        const updatedExercises = exercises.map(e => {
            if (e.id === id) {
                const currentWeight = e.sets[0]?.weight || "0";
                const currentReps = e.sets[0]?.reps || "0";
                if (action === "add") {
                    return {
                        ...e,
                        sets: [
                            ...e.sets,
                            { weight: currentWeight, reps: currentReps },
                        ],
                    };
                } else if (action === "remove" && e.sets.length > 1) {
                    return {
                        ...e,
                        sets: e.sets.slice(0, -1), 
                    };
                }
            }
            return e;
        });

        const updatedExercise = updatedExercises.find(e => e.id === id);
        handleUpdateExercise(updatedExercise);
    };

    return (
        <div className="card rounded-3xl flex-grow h-[450px] w-[1000px] flex flex-col gap-2 items-center">
            {exercises.map(e => {               
                return (<div className="group w-[400px] p-2 border-2 flex flex-row gap-2 border-gray-600 rounded-xl" key={e.id}>
                    <div className="flex flex-row gap-2 border-r-2 items-center justify-center border-black pr-2">
                        <svg width="25" viewBox="0 0 101 101" className="fill-primary group-hover:fill-[#f7ad38]">
                            <path d={dumbellPath}/>
                        </svg>
                        <input
                            type="text"
                            value={e.name}
                            onChange={event => handleInputChange(e.id, "name", event.target.value)}
                            className="border rounded p-1 w-[100px]"
                        />
                    </div>
                    <div className="flex flex-row gap-2 border-r-2 items-center justify-center border-black pr-2">
                        <svg width="25" viewBox="0 0 77 77" className="fill-primary group-hover:fill-[#f7ad38]">
                            <path d={kiloPath}/>
                        </svg>
                        <input
                            type="number"
                            value={e.sets[0].weight}
                            onChange={event =>
                                handleInputChange(e.id, "sets", { weight: event.target.value }, 0)
                            }
                            className="border rounded p-1 w-[50px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center justify-center mt-2">
                            <button
                                onClick={() => handleSetCountChange(e.id, "remove")}
                                className="w-4 bg-danger text-white rounded hover:bg-red-600">
                                -
                            </button>
                            <div className="flex items-center justify-center">
                                {e.sets.length}
                            </div>
                            
                            <button
                                onClick={() => handleSetCountChange(e.id, "add")}
                                className="w-4 bg-primary text-white rounded hover:bg-primary-muted">
                                +
                            </button>
                        </div>
                        <div className="flex flex-row justify-center">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    value={e.sets[0].reps}
                                    onChange={event => handleInputChange(e.id, "sets", { reps: event.target.value }, 0)}
                                    className="border rounded p-1 w-[50px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>)
            })}

            <button
                onClick={handleNewExercise}
                className="mt-4 p-2 bg-primary-muted text-white rounded-full flex items-center justify-center hover:bg-primary">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="ml-2">Add Exercise</span>
            </button>
        </div>
    )
}

ExerciseList.propTypes = {
    handleAddExercise: PropTypes.func.isRequired,
    handleUpdateExercise: PropTypes.func.isRequired
}

export default ExerciseList