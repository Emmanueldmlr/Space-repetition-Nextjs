import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Navigation, { AkNavigationItem } from "@atlaskit/navigation";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import Button from "@atlaskit/button";
import useUserState from '../hooks/useUserState'
import useUserDispatch from '../hooks/useUserDispatch'
import Box from '@material-ui/core/Box';



//import { v4 as uuidv4 } from 'uuid';
import uuid from 'uuid-random';


import {createSubDeck, dragEnd, fetchDeck,treeActions, deleteDeck, renameDeck} from '../store/model/cardModel'


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
    const Container = styled.div`
    display: flex;
    `;

    const Dot = styled.span`
    display: flex;
    width: 24px;
    height: 32px;
    justify-content: center;
    font-size: 12px;
    line-height: 32px;
    `;

    type State = {
    tree: TreeData;
    };

    const DragDropWithNextingTree = () => {
        const userDispatch = useUserDispatch();
        const { decks } = useUserState();
        useEffect(() => {
             const action = fetchDeck()
             action.then(action => {
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

        const handleAddSubDeck = (itemId, children) => {
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
            const action =  createSubDeck(structure)
            action.then(data => {
                userDispatch(data)
            })
        }
        const onDragEnd = ( source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
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
            const action =  dragEnd(structure)
            action.then(data => {
                userDispatch(data)
            })
        };

        const onHover = (itemId, status) => {
            const structure = {
                payload: {
                    itemId: itemId,
                    data: decks,
                    status: status,
                    type: "ToggleStatus"
                }
            }
            const action =  treeActions(structure)
            action.then(data => {
                userDispatch(data)
            })
            
        }

        const handleDeckDelete = (id) => {
            const structure = {
                payload: {
                    itemId: id,
                     decks,
                    type: "DeleteDeck"
                }
            }
            const action =  deleteDeck(structure)
            action.then(data => {
                userDispatch(data)
            })
        }

        const handleDeckRename = (id,name) => {
            const structure = {
                payload: {
                    itemId: id,
                     decks,
                     title: name,
                }
            }
            const action =  renameDeck(structure)
            action.then(data => {
                userDispatch(data)
            })
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
                    <Box   display="flex"  flexDirection="row" alignItems="center" justifyContent="flex-start">
                        <TreeButton status={item.status} 
                        handleAddSubDeck={(id,children) => handleAddSubDeck(id,children)}
                        itemId={item.id} itemChildren={item.children} />
                        <CardMenu 
                        handleDeckDelete={(id)=>handleDeckDelete(id)}
                        handleDeckRename={(id,name)=>handleDeckRename(id,name)}
                        status={item.status} itemId={item.id} />
                        </Box>
                    </>
                  )
        }


        const renderItem = ({ item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
            return (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <AkNavigationItem
                        isDragging={snapshot.isDragging}
                        text={item.data ? item.data.title : ""}
                        icon={getIcon(item, onExpand, onCollapse)}
                        dnd={{ dragHandleProps: provided.dragHandleProps }}
                        onMouseLeave={() => onHover(item.id,false)} 
                        onMouseEnter={() => onHover(item.id, true)}
                        textAfter={getRHSIcon(item, onExpand, onCollapse)}
                    />
                </div>
            );
        };
        return (
        <Container>
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
                    <p>Empty Deck</p>
                } 
                
                
            </Navigation>
        </Container>
        );
    }

export default DragDropWithNextingTree;