import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className="fas fa-capsules"></i> PillReminder
      </h1>
      <ul>
        <li>
          <Link to="/app/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/app/addnew">Add new</Link>
        </li>
        <li>
          <Link to="/#" onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
