import { Outlet, Link } from 'react-router-dom'

function Navbar() {
    const ulStyle = {
        display: "flex", 
        flexDirection: "row",
        listStyleType: "none",  
        padding: 0, 
    };

    const linkStyle = {
        marginRight: "20px", 
        textDecoration: "none", 
        color: "black", 
    };

    return (
        <div>
            <ul style={ulStyle}>
                <li><Link to="/" style={linkStyle}>Home</Link></li>
                <li><Link to="/exercises" style={linkStyle}>Exercises</Link></li>
                <li><Link to="/food" style={linkStyle}>Food</Link></li>
                <li><Link to="/friends" style={linkStyle}>Friends</Link></li>
            </ul>
            <Outlet />
        </div>
    );
}

Navbar.propTypes = {}

export default Navbar
