// import { ContactSupportOutlined } from "@material-ui/icons";
import { createContext, useReducer, useEffect } from "react";

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
        const data = { 
            key3: { 
                id: 'key3', 
                children:[], 
                hasChildren:false,
                isExpanded:false,
                data:{title: 'Title 1-3'}
            }   
        }
        const newItem = {...state.decks.items, ...data}
        const decks = {...state.decks, items: {...newItem}}
        return ({
            ...state,
            decks
        })
        // return {
        //     ...state,
        //     decks: {...state.decks,
        //     items: {...state.decks.items, key3: {id: 'key3', children:[], hasChildren:false, isExpanded:false, data:{title: 'Title 1-3'}}}}
        // }
    }

    
    case "ADD_DECKS": {
        return {
          ...state,
          decks: action.value,
          drawerWidth: 300
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
