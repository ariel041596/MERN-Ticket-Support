import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";

function Header() {
  // State
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Functions
  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt></FaSignOutAlt>Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/login">
                <FaSignInAlt></FaSignInAlt>Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser></FaUser>Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
