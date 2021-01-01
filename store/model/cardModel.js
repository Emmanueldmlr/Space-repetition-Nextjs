import { FetchDeckService,UpdateDeckService} from '../services/cardServices'
import Tree, {
    mutateTree,moveItemOnTree,
} from "@atlaskit/tree";
import uuid from 'uuid-random';


export const fetchDeck = async() => {
    try{
        const {data} = await FetchDeckService();
        console.log(`DECK DATA`);
        console.log(data);
        const decks = data.user.deck
        Object.keys(decks.items).map(function(key, index) {
            decks.items[key].isExpanded = false
        });
        
        const action = {
            type: 'ADD_DECKS',
            payload: {
                data: decks,
            }
        }
        
        return action
    }
    catch(error){
        console.log(error)
    }
}



export const dragEnd = async(actions) => {
    const {data,source,destination} = actions.payload
    const item = moveItemOnTree(data, source, destination);
    const requestPayload = {
        deck : item
    }
    const result = await UpdateDeckService(requestPayload)
    const action = {
        type: 'DRAG_END',
        decks: item
    }
    if(result.data.status){
        return action 
    }
    else{
        console.log(result)
    }
}

export const createSubDeck = async(actions) => {
    const item = mutateTree(actions.payload.data, actions.payload.itemId,{ children: actions.payload.children })
    const key = actions.payload.id
    const data = {}
    data[key] = { 
        id: key, 
        children:[], 
        hasChildren:false,
        isExpanded:false,
        status:false,
        data:{title: 'Untitled'}
    }
    const newItem = {...item.items, ...data}
    const decks = {...actions.payload.data, items: {...newItem}}

    const requestPayload = {
        deck : decks
    }

    const result = await UpdateDeckService(requestPayload)

    const action = {
        type: 'CREATE_SUB_DECK',
        decks: decks
   }

    if(result.data.status){
        return action 
    }
    else{
        console.log(result)
    }

}

export const deleteDeck = async(actions) => {
    const {decks,itemId,type} = actions.payload
    const cardChildren = decks.items[itemId].children
    delete decks.items[itemId]
    cardChildren.map(child => {
        delete decks.items[child]
        Object.keys(decks.items).map(function(key, index) {
             decks.items[key].children = removeChildId(decks.items[key].children, child)
        });
    })
    Object.keys(decks.items).map(function(key, index) {
        decks.items[key].children = removeChildId(decks.items[key].children, itemId)
    });
    decks.items[1].children = removeChildId(decks.items[1].children, itemId)
   
    const requestPayload = {
        deck : decks
    }
    const result = await UpdateDeckService(requestPayload)
 
    const action = {
        type: 'DELETE_DECK',
        decks: decks
   }
   if(result.data.status){
        return action 
   }
   else{
       console.log(result)
   }
}

export const renameDeck = async(actions) => {
    
    const data = {
        title : actions.payload.title
    }
    const item = mutateTree(actions.payload.decks, actions.payload.itemId,{ data: data })
   
    const requestPayload = {
        deck : item
    }

    const result = await UpdateDeckService(requestPayload)
 
    const action = {
        type: 'RENAME_DECK',
        decks: item
   }

   if(result.data.status){
        return action 
   }
   else{
       console.log(result)
   }
    
}

const removeChildId = (children, id) => {
    return (
        children.filter( child => child !== id)
    )
}

export const createDeck = async(actions) => {
    const id = uuid()
    const data = {}

    data[id] = { 
        id: id, 
        children:[], 
        hasChildren:false,
        isExpanded:false,
        status:false,
        data:{title: 'Untitled'}
    }

    const item = {...actions.payload.decks.items}
    item[1].children = [...item[1].children,id] 
    const newItem = {...actions.payload.decks.items, ...data}
    const decks = {...actions.payload.decks, items: {...newItem}}
    const requestPayload = {
        deck : decks
    }
    const result = await UpdateDeckService(requestPayload)
 
    const action = {
        type: 'CREATE_DECK',
        decks: decks
   }

   if(result.data.status){
        return action 
   }
   else{
       console.log(result)
   }
   
}


export const treeActions = async(actions) => {

    const {data,itemId,status} = actions.payload

        let item
        if(actions.payload.type === "ToggleStatus" ){
             item = mutateTree(data, itemId, { status: status })
        }

        else if (actions.payload.type === "COLLAPSE"){
             item = mutateTree(data, itemId, { isExpanded: false })
        }

        else if (actions.payload.type === "EXPAND"){
             item = mutateTree(data, itemId, { isExpanded: true })
        }

        else {
             item = actions.payload.data
        }

        const action = {
             type: 'TREE_ACTIONS',
             decks: item
        }

    return action 
}






