import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import axios from "axios";
import { useCookies } from "react-cookie";

const url = "http://localhost:6969/api/v1";

const NavBar = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const navigate = useNavigate();
  const {
    activeUser,
    isLogin,
    logout,
  } = useAppContext();

  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between max-h-20 bg-teal-500 p-3 static top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Foty ToDo</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            to="/"
            className="mt-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            {
               isLogin ? (
                <>Hey there, {activeUser}!</>
              ) : (
                <>Welcome!</>
              )
            }
          </NavLink>
          {!isLogin ? (
            <>
              <NavLink
                to="/login"
                className="ml-4 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 lg:mt-0"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="ml-4 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 lg:mt-0"
              >
                Register
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="ml-4 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 lg:mt-0"
            >
              Logout
            </NavLink>
          )}
        </div>
        <div></div>
      </div>
    </nav>
  );
}
export default NavBar