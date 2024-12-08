import PropTypes from "prop-types"
import { Link } from "react-router-dom"


function NavbarLink({ to, name, iconPath, chosen, onClick, viewBox, ...rest }) {
    const color = chosen ? "text-primary" : "text-gray-600 hover:text-primary-muted"

    return (
        <li onClick={onClick} name={name}>
            <Link to={to} className={`flex gap-2 ${color} transition-300`}>
                <svg width="20" viewBox={viewBox} className="fill-current">
                    <path d={iconPath} {...rest}/>
                </svg>
                {name}
            </Link>
        </li>
    );
}

NavbarLink.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconPath: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    chosen: PropTypes.bool,
    viewBox: PropTypes.string.isRequired
};

export default NavbarLink