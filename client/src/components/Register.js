import { useState } from "react";
import Alert from "./Alert";

const Register = (props) => {
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
  };
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
          </div>
          <Alert />
          <div className="form-group">
            <input
              type="password"
              placeholder="Password:"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <Alert />
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

export default Register;
