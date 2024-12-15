import FriendsSection from "../../components/FriendsSection/FriendsSection"
import DataSection from "../../components/DataSection/DataSection"

function Home() {
    return (
        <div className="grow grid grid-cols-4 gap-8 mx-8 mb-10">
            <DataSection />
            <FriendsSection />
        </div>
    )
}

export default Home