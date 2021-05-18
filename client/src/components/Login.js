import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { login } from "../actions/auth";
import { connect } from "react-redux";

const Login = ({ login, isAuthenticated }) => {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    console.log(isAuthenticated);
    return <Redirect to="/app" />;
  }

  return (
    <div className="landing-container">
      <div className="login-form bg-white">
        <h1>
          <i className="fas fa-capsules"></i> PillReminder
        </h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email:"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <p className="warning">Invalid email or password</p>
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password:"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <Link to="/register" className="btn">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
