import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Navigation, { AkNavigationItem } from "@atlaskit/navigation";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import Button from "@atlaskit/button";
import AddIcon from '@material-ui/icons/Add';
import useUserState from '../hooks/useUserState'


import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition
} from "@atlaskit/tree";

const style = {
    button:{
        position:'fixed',
        left:0,
        bottom:0,
        width: '299px',
        textTransform: 'initial'
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
    const { decks } = useUserState();
    const [data , setData] = useState(decks)
    
    // useEffect(() => {
    //     setData(decks)
    // }, [decks])

    console.log('data', data)
    console.log('deck', decks)

    const getIcon = ( item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) =>  {
        if (item.children && item.children.length > 0) {
            return item.isExpanded ? (
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
            ) : (
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
            );
        }
        return <Dot>&bull;</Dot>;
    }

    const renderItem = ({ item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
        return (
            <div ref={provided.innerRef} {...provided.draggableProps}>
                <AkNavigationItem
                    isDragging={snapshot.isDragging}
                    text={item.data ? item.data.title : ""}
                    icon={getIcon(item, onExpand, onCollapse)}
                    dnd={{ dragHandleProps: provided.dragHandleProps }}
                />
            </div>
        );
    };

    const onExpand = (itemId: ItemId) => {
        //const { tree }: State = this.state;
        setData(mutateTree(data, itemId, { isExpanded: true }));
    };

    const onCollapse = (itemId: ItemId) => {
        //const { tree }: State = this.state;
        setData(mutateTree(data, itemId, { isExpanded: false }));
    };

    const onDragEnd = ( source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
        if (!destination) {
        return;
        }
        const newData = moveItemOnTree(data, source, destination);
        setData(newData);
    };

    return (
      <Container>
        <Navigation>    
            <Tree
                tree={data}
                renderItem={renderItem}
                onExpand={onExpand}
                onCollapse={onCollapse}
                onDragEnd={onDragEnd}
                isDragEnabled
                isNestingEnabled
                
            />
        </Navigation>
      </Container>
    );
}

export default DragDropWithNextingTree;