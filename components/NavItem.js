import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Dashboard from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        paddingBottom: '0',
        paddingTop: 0
    }
}));

const NavItem = () => {
    const classes = useStyles();

    return (
        <Box>
            <List>
                 <ListItem disableRipple button classes={{ root: classes.item }} key='Dashboard'>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItem>
            </List>
            <List>
                 <ListItem disableRipple classes={{ root: classes.item }} button key='Favorite'>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Favourite' />
                </ListItem>
            </List>
            <List>
                 <ListItem disableRipple classes={{ root: classes.item }} button key='Search'>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary='Search' />
                </ListItem>
            </List>
        </Box>
    )
}

export default NavItem