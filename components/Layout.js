import { useRouter } from "next/router";
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./Header";
import SideBar from "./SideBar";
import useStyles from './rootStyles'
import clsx from 'clsx';



const Layout = ({children}) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
                <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
                <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    {/* <div className={classes.drawerHeader} /> */}
                    {children}
                </main>
                
            </div>
        </>
    );
}
 
export default Layout;

