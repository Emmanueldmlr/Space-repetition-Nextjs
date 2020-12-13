import { UserStateContext }  from "../context/UserContext";
import{ useContext } from 'react';

const useUserState = () => {
    return useContext(UserStateContext)
};

export default useUserState;