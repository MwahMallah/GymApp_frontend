import logoPath from "../../assets/logo"

function Logo() {
    return (
        <div className="card flex flex-row gap-2">
            <svg width="20" viewBox="0 0 36 35" className="fill-current">
                <path d={logoPath} stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Gym app
        </div>
    )
}

export default Logo