import { useRouter } from "next/router";
import useStyles from './rootStyles'
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavItem from './NavItem'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SideNav from './SideNav.tsx'
import useUserState from '../hooks/useUserState'
import useUserDispatch from "../hooks/useUserDispatch";


const SideBar = ({handleDrawerClose, open}) => {
    const classes = useStyles();
    const theme = useTheme();
    const userDispatch = useUserDispatch();
    
    const handleAddDeck = () => {
        const action = {
            type: 'CREATE_DECK',
          }
        userDispatch(action)
    }

    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
            <div className={classes.drawerHeader}>
                <Typography className={classes.headerText}>
                    <Link href="#" className={classes.title}>
                        SP: Shiv Sinha
                    </Link>
                </Typography>
                <IconButton onClick={()=>handleDrawerClose()}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <NavItem/>
            <Divider />
            <div className={classes.deck}>
                <SideNav/>
            </div>
            <div className={classes.button}>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    disableRipple
                    onClick={()=>handleAddDeck()}
                >
                    Add New Card
                </Button>
             </div>
      </Drawer>
    )
}

export default SideBar