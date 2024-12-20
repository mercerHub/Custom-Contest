import { useContext,createContext } from "react";

const authContext = createContext({
    user: {
        _id: "",
        name: "",
        email: "",
        username: "",
        problems: [],
        contests: [],
    },
    login: (user) => {},
    register: (user) => {},
    logout: () => {},
    addContest:(contestData) => {},
    removeContest : (contestData) => {}
});

export default function useAuth() {
    return useContext(authContext);
}

export const AuthContextProvider = authContext.Provider;