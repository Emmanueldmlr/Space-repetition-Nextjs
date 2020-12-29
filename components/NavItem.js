import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import StorageIcon from '@material-ui/icons/Storage';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles} from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Link from 'next/link'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';




const useStyles = makeStyles((theme) => ({
    item: {
        paddingBottom: '0',
        paddingTop: 0
    }
}));

const NavItem = () => {
    const classes = useStyles();

    return (
        <Box className='itemWrapper'>
            <Style/>
            <List className='listItem'>
                <ListItem disableRipple  className='searchWrapper'  key='Dashboard'>
                     <InputBase
                        placeholder="Search"
                    />
                    <IconButton type="submit" className='searchIcon' aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </ListItem>
            </List>
            <List className='listItem'>
                <Link href="/dashboard">
                    <ListItem disableRipple  key='Dashboard'>
                        <ListItemIcon>
                            <DashboardIcon className='navItemIcon' />
                        </ListItemIcon>
                        <ListItemText primary={<Typography type="body2" className='navItemText'>Dashboard</Typography>} />
                    </ListItem>
                </Link>
            </List>
            <List className='listItem'>
                <Link href="/streaks">
                    <ListItem disableRipple  key='Search'>
                        <ListItemIcon>
                            <CalendarTodayIcon className='navItemIcon' />
                        </ListItemIcon>
                        <ListItemText primary={<Typography type="body2" className='navItemText'>Due Today</Typography>} />
                        <Avatar className='avatarIcon'>4</Avatar>
                    </ListItem>
                </Link>
            </List>
            <List className='listItem'>
                 <ListItem disableRipple  key='Favorite'>
                    <ListItemIcon>
                        <StorageIcon className='navItemIcon' />
                    </ListItemIcon>
                    <ListItemText primary={<Typography type="body2" className='navItemText'>Back Logs</Typography>} />
                </ListItem>
            </List>
            <List className='listItem'>
                 <ListItem disableRipple  key='Settings'>
                    <ListItemIcon>
                        <SettingsIcon className='navItemIcon' />
                    </ListItemIcon>
                    <ListItemText primary={<Typography type="body2" className='navItemText'>Settings</Typography>} />
                </ListItem>
            </List>
            
        </Box>
    )
}

const Style = () => {
    return (
      <style jsx >{`
        .itemWrapper{
          padding-left: 14px;
          padding-right:30px;
        }
        .listItem{
            cursor:pointer;
            padding:0 1px 0 1px;
        }

        .searchIcon{
            margin-right: -10px;
        }
        .searchWrapper{
            border: 1px solid #795548;
            padding: 2px 0px 0px 10px;
            height: 40px;
            width: 230px;
            border-radius: 10px;
            margin: 13px 0px 13px 13px;
        }
        .MuiListItem-gutters {
            padding-bottom: 4px;
            padding-top: 4px
        }
        .navItemIcon{
            font-size: 22px !important;
            color: #795548;
          }
          .navItemText{
            font-size: 14px !important;
            color: #795548;
          }
        
        .avatarIcon{
            font-size: 12px;
            width: 22px;
            height: 22px;
            color: #795548;
        }
        
      `}</style>
    )
  }

export default NavItem