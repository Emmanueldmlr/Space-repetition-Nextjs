import React, { Component, useState, useEffect } from "react";
import Navigation, { AkNavigationItem } from "@atlaskit/navigation";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import Button from "@atlaskit/button";
import useUserState from '../hooks/useUserState'
import useUserDispatch from '../hooks/useUserDispatch'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';




//import { v4 as uuidv4 } from 'uuid';
import uuid from 'uuid-random';

import {createSubDeck, dragEnd, fetchDeck,treeActions, deleteDeck, renameDeck, dispatchBackendActions} from '../store/model/cardModel'


import Tree, {
    RenderItemParams,
    TreeItem,
    TreeData,
    ItemId,
    TreeSourcePosition,
    TreeDestinationPosition
    } from "@atlaskit/tree";
import TreeButton from "./TreeButton";
import CardMenu from "./CardMenu";
    type State = {
    tree: TreeData;
    };

    const DragDropWithNextingTree = () => {
        const userDispatch = useUserDispatch();
        const { decks } = useUserState();
        useEffect(() => {
             const result = fetchDeck()
             result.then(action => {
                 userDispatch(action)
             })
        }, [])

        const onExpand = (itemId: ItemId) => {
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    type: "EXPAND",
                }
            }
            const action =  treeActions(structure)
            action.then(data => {
                userDispatch(data)
            })
        };

        const toggleIsInEditMode = (itemId: ItemId) => {
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    type: "EditMode",
                }
            }
            const action =  treeActions(structure)
            action.then(data => {
                userDispatch(data)
            })
        }

        const onCollapse = (itemId: ItemId) => {
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    type: "COLLAPSE",
                }
            }
            const action =  treeActions(structure)
            action.then(data => {
                userDispatch(data)
            })
        };

        const handleAddSubDeck = async (itemId, children) => {
            const id = uuid();
            children.push(id)  
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    children: children,
                    id: id
                }
            }
            const action =  await createSubDeck(structure)
            await userDispatch(action)
            dispatchBackendActions(action.decks);
        }
        const onDragEnd = async( source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
            if (!destination) {
            return;
            }
            const structure = {
                payload: {
                    source: source,
                    data: decks,
                    destination: destination
                }
            }
            const action = await dragEnd(structure)
            await userDispatch(action)
            dispatchBackendActions(action.decks);
        };

        const onHover =  (itemId, status) => {
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    status: status,
                    type: "ToggleStatus"
                }
            }
            const action =   treeActions(structure)
             action.then(data => {
                 userDispatch(data)
            })
            
        }

        const handleDeckDelete = async(id) => {
            const structure = {
                payload: {
                    itemId: id,
                     decks,
                    type: "DeleteDeck"
                }
            }
            const action =  await deleteDeck(structure)
            await userDispatch(action)
            dispatchBackendActions(action.decks);
        }

        const handleDeckRename = async(id,e) => {
            if (e.charCode === 13) {
                const name = e.target.value === '' ? "Untitled" : e.target.value
                const structure = {
                    payload: {
                        itemId: id,
                        decks,
                        title: name,
                    }
                }
            const action =  await renameDeck(structure)
            await userDispatch(action)
            dispatchBackendActions(action.decks);
            }
        }

        const getIcon = ( item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) =>  {
            if (item.children && item.children.length > 0) {
                return item.isExpanded ? (
                    <>
                        <Button
                        spacing="none"
                        appearance="subtle-link"
                        onClick={() => onCollapse(item.id)}
                        >
                        <ChevronDownIcon
                            label=""
                            size="medium"
                            onClick={() => onCollapse(item.id)}
                        />
                        </Button>
                        </>
                ) : (
                    <>
                        <Button
                        spacing="none"
                        appearance="subtle-link"
                        onClick={() => onExpand(item.id)}
                        >
                        <ChevronRightIcon
                            label=""
                            size="medium"
                            onClick={() => onExpand(item.id)}
                        />
                        </Button>
                    </>
                );
            }
            return( 
                    <>
                        
                        <Button
                        spacing="none"
                        appearance="subtle-link"
                        onClick={() => onExpand(item.id)}
                        >
                            <ChevronRightIcon
                                label=""
                                size="medium"
                                onClick={() => onExpand(item.id)}
                                
                            />
                        </Button>
                    </>
                  )
        }

        const getRHSIcon = ( item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) =>  {
            return( 
                    <>
                        <Box display="flex"  flexDirection="row" alignItems="center" justifyContent="flex-start"
                        >
                            <TreeButton status={item.status} 
                            handleAddSubDeck={(id,children) => handleAddSubDeck(id,children)}
                            itemId={item.id} itemChildren={item.children} />
                            <CardMenu 
                            handleDeckDelete={(id)=>handleDeckDelete(id)}
                            toggleIsInEditMode={(id)=>toggleIsInEditMode(id)}
                            status={item.status} itemId={item.id} /> 
                            
                        </Box>

                    </>
                  )
        }


        const renderItem = ({ item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
            return (
                <div ref={provided.innerRef} {...provided.draggableProps}
                >
                    {
                        item.isInEditMode 
                        ? 
                        <div>
                            <TextField
                                id="outlined-size-small"
                                defaultValue={item.data.title}
                                variant="outlined"
                                size="small"
                                className='editMode'
                                fullWidth
                                autoFocus
                                onKeyPress={(e)=>handleDeckRename(item.id, e)}
                                onBlur={(e)=>handleDeckRename(item.id, e)}
                            />
                        </div>
                        :
                        <AkNavigationItem
                        isDragging={snapshot.isDragging}
                        text={item.data ? item.data.title : ""}
                        icon={getIcon(item, onExpand, onCollapse)}
                        dnd={{ dragHandleProps: provided.dragHandleProps }}
                        textAfter={getRHSIcon(item, onExpand, onCollapse)}
                        onMouseLeave={() => onHover(item.id,false)} 
                        onMouseEnter={() => onHover(item.id, true)}
                    />
                    }    
                </div>
            );
        };
        return (
        //<Container>
            <>
                <Style/>
                <Navigation>   
                {
                    decks ? 
                        <Tree
                        tree={decks}
                        renderItem={renderItem}
                        onExpand={onExpand}
                        onCollapse={onCollapse}
                        onDragEnd={onDragEnd}
                        isDragEnabled
                        isNestingEnabled /> 
                : 
                    <p className='emptyTitle'>Empty Deck</p>
                } 
  
                </Navigation>
                
            </>
        //</Container>
        );
    }

    const Style = () => {
        return (
          <style jsx >{`
            .emptyTitle{
              padding-left: 35px;
              color: #795548; 
            }
            .editMode{
              padding-left: 20px;
            }
            .iconStyle{
                color: #795548 !important
            }
          `}</style>
        )
      }

export default DragDropWithNextingTree;