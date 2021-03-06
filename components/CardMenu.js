import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';


const style = {
    add:{
        display:'flex',
        width: 24,
        height: 32,
        JustifyContent: "center",
        fontSize: 12,
        lineHeight: 32,
        padding: 2
    }
}

const CardMenu = ({status, handleDeckDelete, toggleIsInEditMode,itemId}) =>  {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMode = () => {
    toggleIsInEditMode(itemId)
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>     
        {
            status ? <MenuIcon style={{color:  '#795548'}} onClick={handleClick}  /> : null
        }
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: "top",
            horizontal: "right"
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "left"
            }}
        >
            <div style={{minWidth: 200}}>
                <List component="nav" aria-label="main mailbox folders">
                    
                    <ListItem onClick={toggleMode} button>
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rename" />
                    </ListItem>

                    <ListItem onClick={()=>handleDeckDelete(itemId)} button>
                        <ListItemIcon>
                            <DeleteIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItem>
                </List>
            </div>
        </Popover>
    </div>
  );
}

export default  CardMenu


