import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="bg-indigo-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo text-white text-2xl font-bold">
          <Link to="/">Admin Dashboard</Link>
        </div>
        <ul className="flex space-x-4">
          {user ? (
            <li>
              <button
                className="text-white hover:underline"
                onClick={onLogout}
              >
                <FaSignOutAlt />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:underline"
                >
                  <FaSignInAlt />
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:underline"
                >
                  <FaUser />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
