import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

const register = (username, email, password) => {
    return http.post("/register", {
        username,
        email,
        password,
    });
};

const login = async (email, password) => {
    const response = await http.post("/login", {
        email,
        password,
    });

    if(response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const getProfile = () => {
    const user = getUser();

    return http.get("/me",
        {
            headers: { Authorization: `Bearer ${user?.token}`, }
        }
    );
};

export default { register, login, getProfile, logout, getUser };