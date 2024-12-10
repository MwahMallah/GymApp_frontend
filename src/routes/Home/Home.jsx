import FriendsSection from "../../components/FriendsSection/FriendsSection"
import ExerciseSection from "../../components/ExerciseSection/ExerciseSection"

function Home() {
    return (
        <div className="grow grid grid-cols-4 gap-8 mx-8 mb-10">
            <ExerciseSection />
            <FriendsSection />
        </div>
    )
}

export default Home