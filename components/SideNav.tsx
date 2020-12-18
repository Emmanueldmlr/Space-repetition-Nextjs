import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Navigation, { AkNavigationItem } from "@atlaskit/navigation";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import Button from "@atlaskit/button";
import useUserState from '../hooks/useUserState'
import useUserDispatch from '../hooks/useUserDispatch'
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuIcon from '@material-ui/icons/Menu';

//import { v4 as uuidv4 } from 'uuid';
import uuid from 'uuid-random';


import {createSubDeck, dragEnd, fetchDeck,treeActions} from '../store/model/cardModel'


import Tree, {
    RenderItemParams,
    TreeItem,
    TreeData,
    ItemId,
    TreeSourcePosition,
    TreeDestinationPosition
    } from "@atlaskit/tree";
import TreeButton from "./TreeButton";


    const style = {
        button:{
            position:'fixed',
            left:0,
            bottom:0,
            width: '299px',
            textTransform: 'initial'
        },
        add:{
            display:'flex',
            width: 24,
            height: 32,
            JustifyContent: "center",
            fontSize: 12,
            lineHeight: 32,
            padding: 4
        }
    }
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
                        <TreeButton status={item.status} handleAddSubDeck={(id,children) => handleAddSubDeck(id,children)} itemId={item.Id} itemChildren={item.children} />
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
                        <TreeButton status={item.status} handleAddSubDeck={(id,children) => handleAddSubDeck(id,children)} itemId={item.Id} itemChildren={item.children} />
                    </>
                );
            }
            return <TreeButton status={item.status} handleAddSubDeck={(id,children) => handleAddSubDeck(id,children)} itemId={item.Id} itemChildren={item.children} />;
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
                    isNestingEnabled
                    
                    
                /> 
                : 
                    <p>Empty Deck</p>
                } 
                
                
            </Navigation>
        </Container>
        );
    }

export default DragDropWithNextingTree;