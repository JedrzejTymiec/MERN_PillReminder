import { useState } from "react";
import Alert from "./Alert";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
import { setFormAlert } from "../actions/alert";
import { Redirect } from "react-router-dom";

const Register = ({ register, alerts, setFormAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setFormAlert("Passwords do not match", "password");
    } else {
      register(email, password);
    }
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
              type="email"
              placeholder="Email:"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            {alerts.length > 0 && alerts[0].type === "email" && <Alert />}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password:"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            {alerts.length > 0 && alerts[0].type === "password" && <Alert />}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm password:"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setFormAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setFormAlert })(Register);
