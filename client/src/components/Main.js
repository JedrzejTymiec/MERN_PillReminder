import { Link } from "react-router-dom";

const Main = () => {
  return (
    <h1>
      <Link to="/">
        <i className="fas fa-capsules"></i> PillReminder
      </Link>
    </h1>
  );
};

export default Main;
