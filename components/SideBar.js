import { useRouter } from "next/router";
import useStyles from './rootStyles'
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavItem from './NavItem'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SideNav from './SideNav.tsx'
import { useStoreActions } from 'easy-peasy';
import useUserDispatch from '../hooks/useUserDispatch'
import {createDeck} from '../store/model/cardModel'
import useUserState from '../hooks/useUserState'

const SideBar = ({handleDrawerClose, open}) => {
    const { decks } = useUserState();
    const classes = useStyles();
    const theme = useTheme();
    const userDispatch = useUserDispatch();
    
    const handleAddDeck = () => {
        const structure = {
            payload: {
                decks: decks,
            }
        }
        const action =  createDeck(structure)
        action.then(data => {
            userDispatch(data)
        })
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