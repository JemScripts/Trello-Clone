import http from "./http";

const register = (username, email, password) => {
    return http.post("/users/register", {
        username,
        email,
        password,
    });
};

const login = async (email, password) => {
    try {

        const response = await http.post("/users/login", {
            email,
            password,
        });
        
        if(response.data.token && response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);

            return response.data;
        } else {
            throw new Error("Invalid login response.");
        }

    } catch (err) {
        const message = err.response?.data?.message || "Login failed.";
        throw new Error(message);
    }

};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const getUser = () => {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch (err) {
        console.error("Error parsing data from the localStorage", err);
        localStorage.removeItem("user");
        return null;
    }
};

const getProfile = () => {
    return http.get("/users/me");
};

export default { register, login, getProfile, logout, getUser };