export const useAuth = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    };

    return { token, username, isLoggedIn, logout };
};
