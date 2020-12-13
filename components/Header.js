import { useRouter } from "next/router";
import useStyles from './rootStyles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Grid } from "@material-ui/core";


const Header = ({handleDrawerOpen, open}) => {
   const classes = useStyles();
   return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>handleDrawerOpen()}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Button>SIGN UP</Button>
                    <Button>LOGIN</Button>
                </Grid>
            </Toolbar>
        </AppBar>
   )
}

export default Header;