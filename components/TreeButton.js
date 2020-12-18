import { useRouter } from "next/router";
import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@atlaskit/button";

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

const TreeButton = ({handleAddSubDeck,itemId, itemChildren, status}) => {
    return (
        <Button spacing="none"
            appearance="subtle-link"
            onClick={() => handleAddSubDeck(itemId,itemChildren)}
            >
            {
                status ? 
                <>
                    <AddBoxIcon className={style.add} />
                    <MenuIcon className={style.add} />
                </> : null
            }
        </Button>
    )
}

export  default TreeButton