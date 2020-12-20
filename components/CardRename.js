import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 250,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      iconColor: {
          color: 'green'
      }
  }
));

const CardRename = ({initialName, handleDeckRename}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = React.useState(initialName);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if(text !=='') handleDeckRename(text)
    setAnchorEl(null);
  };

  const handleRenameSubmit = () => {
    if(text ==='') alert("Text Field Cannot Be empty")
    handleDeckRename(text)
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <ListItem aria-describedby={id} variant="contained" color="primary" onClick={handleClick} button>
        <ListItemIcon>
            <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </ListItem>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
      >
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                autoFocus
                value={text}
                onChange={(e)=>setText(e.target.value)}
            />
            <IconButton onClick={handleRenameSubmit} className={classes.iconButton} aria-label="directions">
                <CheckBoxIcon className={classes.iconColor}/>
            </IconButton>
        </Paper>
      </Popover>
    </div>
  );
}

export default CardRename;
