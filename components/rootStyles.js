import { makeStyles} from '@material-ui/core/styles';

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
    backgroundColor: '#fff',
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
    backgroundColor: '#ececec'

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    
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
    }
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
}));

export default useStyles;