import PropTypes from "prop-types"
import { Link } from "react-router-dom"


function NavbarLink({ to, name, iconPath, ...rest }) {
    return (
        <li>
            <Link to={to} className="flex gap-2 text-gray-600 hover:text-elements hover:fill-elements transition-300">
                <svg width="20" viewBox="0 0 36 35" className="fill-current">
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
    iconPath: PropTypes.string.isRequired
};

export default NavbarLink