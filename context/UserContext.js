// import { ContactSupportOutlined } from "@material-ui/icons";
import { createContext, useReducer, useEffect } from "react";

import {UpdateDeckService} from '../store/services/cardServices'

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();


const reducer = (state, action) => {
  switch (action.type) {
    case "isLoading": {
        return {
            ...state,
            isLoading: true,
        };
    }

    case "CREATE_DECK": {
        const decks = action.decks
        return ({
            ...state,
            decks
        })
    }

    case "TREE_ACTIONS": {

        return {
            ...state,   
            decks: action.decks
        }
    }

    case "CREATE_SUB_DECK":{       
        return ({
            ...state,
            decks:action.decks
        })
    }


    case "DRAG_END": {
        return {
            ...state,
            decks: action.decks
        }
    }

    case "DELETE_DECK": {
        return {
            ...state,
            decks: action.decks
        }
    }

    case "ADD_DECKS": {
        return {
          ...state,
          decks: action.payload.data
      };
    }
    case "LOGGED_IN": {
      return {
        ...state,
        isAuth: true
      };
    }
    case "LOGGED_OUT": {
      return {
        ...state,
        isAuth: false,
        decks: [],
        drawerWidth: 0
      };
    }
    case "TOGGLE_LOADING": {
        return {
            ...state,
          isLoading: !state.isLoading,
        };
    }
    case "SET_ALERT": {
        return {
            ...state,
          alertType: action.data.alertType, 
          alertMessage: action.data.alertMessage,
        };
    }
    case "CLEAR_ALERT": {
        return {
            ...state,
            alertType: "",
            alertMessage: ""
        };
    }
    case "SET_CURRENT_DECK": {
      return {
          ...state,
          currentDeck: action.value
      };
    }
    default: {
      throw new Error("Unhandled action type.");
    }
  }
};

const UserProvider = ({ children, initialState }) => {
  const { isAuthenticated, initialDecks}  = initialState;
  const fullInitialState = { isAuth: isAuthenticated, decks: initialDecks, alertType: "" , alertMessage:"" , isLoading: false };
  if(initialDecks && initialDecks.length > 0){
    fullInitialState['drawerWidth'] = 300;
  } else {
    fullInitialState['drawerWidth'] = 0;
  }

  const [state, dispatch] = useReducer(reducer,fullInitialState);
  
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
