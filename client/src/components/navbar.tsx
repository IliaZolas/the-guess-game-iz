import { Link } from 'react-router-dom';
import './navbar.css';
import Cookies from "universal-cookie";
import { useContext } from 'react';
import { UserContext, UserContextProps} from '../UserContext';

const Navbar: React.FC = () => {
  const { user, setUser } = useContext<UserContextProps>(UserContext);

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("TOKEN", { path: "/" });
    localStorage.clear();
    setUser(null);
  };

  const id = localStorage.getItem('id');

  return (
    <div className="navbar logged-out">
      <div className="logo">
        <Link to="/" className="item">
          Nutrifit
        </Link>
      </div>
      {user ? (
        <div className="navbar logged-in">
          <div className="navitems">
            <div className="nav-item">
              <Link to="/meal-plans" className="item">
                Meal Plans
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/new-mealplan" className="item">
                New Meal Plan
              </Link>
            </div>
            <div className="user-navitem">
              Account
              <div className='nav-dropdown'>
                <div className="dropdown-item">
                  <Link to={`/user/show/${id}`} className="item-in-dropdown">
                    Profile
                  </Link>
                </div>
                <div className="dropdown-item">
                  <a href='/' onClick={() => logout()} className="item-in-dropdown">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navitems">
          <div className="nav-item">
            <Link to="/" className="item">
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/login" className="item">
              Login
            </Link>
          </div>
          <div className="nav-item nav-cta">
            <Link to="/signup" className="item">
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;