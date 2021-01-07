import { useRouter } from "next/router";
//import useStyles from './rootStyles'
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
import useUserDispatch from '../hooks/useUserDispatch'
import Card from '../store/model/cardModel'
import useUserState from '../hooks/useUserState'
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'

const drawerWidth = 300
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  headerText:{
    display: 'flex',
    paddingRight: '100px'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff !important',
    boxShadow: 'none !important',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: '#fff'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.1),
    '&:hover': {
      color: theme.palette.primary.main,
    },
    fontWeight: 'light'
    
  },
  button:{
    position:'fixed',
    left:0,
    bottom:0,
    width: '299px',
    textTransform: 'initial'
  },
  deck:{
      height: 'auto'
  }
}))

const SideBar = ({handleDrawerClose, open}) => {
    const { decks } = useUserState();
    const classes = useStyles();
    const theme = useTheme();
    const userDispatch = useUserDispatch();
    
    const handleAddDeck = async() => {
        const card = new Card()
        const structure = {
            payload: {
                decks: decks,
            }
        }
        const action =  await card.createDeck(structure)
        await userDispatch(action)
        card.dispatchBackendActions(action.decks);
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
            <Style/>
            <div className='drawerHeader'>
                <Typography className={classes.headerText}>
                    <Link href="/dashboard" className='headerTitle'>
                        SP: Shivam
                    </Link>
                </Typography>
                <IconButton onClick={()=>handleDrawerClose()}>
                    {theme.direction === 'ltr' ? <div className='iconWrapper'><FontAwesomeIcon className='headerIcon' icon={faAngleDoubleLeft} /></div> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <NavItem/>
            <Divider />
            <div className='titleWrapper'>
                <Typography className='title'>
                    Decks
                </Typography>
            </div>
            <SideNav/>
            <Button
            variant="contained"
            color="default"
            startIcon={<AddIcon />}
            disableRipple
            onClick={()=>handleAddDeck()}
            style={{color: '#795548', fontWeight: 'bold', cursor: 'pointer ', position: 'fixed', left: 0, bottom: 0, width: 299, textTransform:'initial'}}
        >
            New Deck
        </Button>
            {/* <div style={{color: '#795548', fontWeight: 'bold', cursor: 'pointer '}}>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    disableRipple
                    onClick={()=>handleAddDeck()}
                    style={{color: '#795548', fontWeight: 'bold', cursor: 'pointer '}}
                >
                    New Deck
                </Button>
             </div> */}
      </Drawer>
    )
}

const Style = () => {
    return (
      <style jsx >{`
        .titleWrapper{
          padding-left: 35px;
          padding-top: 20px;
          color: #795548; 
        }
        .title{
            font-weight: 500;
        }
      `}</style>
    )
  }

export default SideBar