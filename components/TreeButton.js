import { useRouter } from "next/router";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from "@atlaskit/button";

const style = {
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
                <AddBoxIcon style={{color:  '#795548'}}  />
                : null
            }
        </Button>
    )
}

export  default TreeButton