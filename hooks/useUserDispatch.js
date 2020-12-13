import { UserDispatchContext } from "../context/UserContext";
import{ useContext } from 'react';

const useUserDispatch = () => {
    return useContext(UserDispatchContext)
};

export default useUserDispatch;