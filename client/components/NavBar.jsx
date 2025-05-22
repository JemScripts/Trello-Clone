import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
    const { user, logout } = useAuth();

    return(
        <nav className="w-full bg-gradient-to-r from-blue-500 to-indigo-700 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div className="text-white text-2xl font-bold tracking-wide">
                    <h2>The KanBan Project</h2>
                </div>

                <ul className="flex items-center gap-8 text-xl">
                    <li>
                    <Link to="/home" className="text-white font-medium hover:text-blue-200 transition duration-150">Home</Link>
                    </li>
                    <li>
                    <Link to="/add" className="text-white font-medium hover:text-blue-200 transition duration-150">Add</Link>
                    </li>
                </ul>

            <div className="text-sm gap-4 flex">
                {user ? (
                    <>
                    <div className="py-1 px-2 text-shadow-white rounded bg-blue-300">Logged in as {user.username}</div>
                    <Link to="/" className="bg-red-500 text-white font-medium py-1 px-2 rounded hover:bg-red-300 transition duration-150" onClick={logout}>Logout</Link>
                    </>
                    ) : (
                    <>
                    <Link to="/login" className="bg-blue-500 text-white font-medium py-1 px-2 rounded hover:bg-blue-300 transition duration-150">Login</Link>
                    <Link to="/register" className="bg-green-500 text-white py-1 px-2 rounded font-medium hover:bg-green-300 transition duration-150">Register</Link>
                    </>
                )}
            </div>
            </div>
        </nav>
    );
}