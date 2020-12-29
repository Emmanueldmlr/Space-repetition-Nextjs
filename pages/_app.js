import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../config/theme';
import Layout from '../components/layout';
import UserProvider from '../context/UserContext';
import App from "next/app";
import cookies from "next-cookies";
import 'react-calendar-heatmap/dist/styles.css';
import './style.css'


const MyApp = ({ Component, pageProps,isAuthenticated, initialDecks }) => {
    React.useEffect(async() => {
    const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }, []);
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>        
        <UserProvider initialState={{isAuthenticated, initialDecks}}>
          <Layout>
              <Style/>
              <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (context) => {
    const {pathname } = context.router;
    let isAuthenticated = false;
    let decksRequired = pathname.includes('/dashboard') || pathname.includes('/deck')
    let props = {};
    const  { token } = cookies(context.ctx);
    if (token) {
      isAuthenticated = true;
    }
    const appProps = await App.getInitialProps(context);
    props =  { ...appProps};
    if(decksRequired){
      props = { ...props, initialDecks: null}
    }
    return props;
};
const Style = () => {
  return (
    <style jsx global>{`
      .jbUCQa{
        display: none
      }
      .kDFczx{
        max-height: 450px;
        width: 299px;
      }
      .bCKIOm{
        background-color: #ffffff;
        height: 250px
      }
      .gROfWs{
        min-height: 0
      }
      .gfcSzi:before, .gfcSzi:after{
        content:none
      }
      .MuiSvgIcon-root{
        padding: 3px
      }
      .drawerHeader{
        display: flex;
        align-items: center;
        padding: 8px;
        justify-content: center;
      }
      .headerTitle{
        font-weight: bold;
        color: #795548;
      }
      .drawal{
        width: 300;
        flex-shrink: 0;
        background-color: #fff
      }
      .makeStyles-content-10{
        padding-top: 100px !important
      }
      .makeStyles-content-50{
        margin-top: 60px !important
      }
      .headerIcon{
        font-size: 16px;
        color: #795548;
        text-align: center
      }
      .iconWrapper{
        background-color: #D0D0D0;
        height: 30px;
        width: 30px;
        border-radius: 50%
      }
      .MuiDivider-root{
        display:none;
      }
      .bovEVy{
        color: #795548;
      }
      .kOeFrb{
        color: #795548;
        padding-left:20px
      }
      .iDQOIT{
        display:none
      }
      .kDFczx{
        max-height: 300px
      }
      .react-calendar-heatmap text {
        font-size: 10px;
        fill: #aaa;
      }
      
      .react-calendar-heatmap .react-calendar-heatmap-small-text {
        font-size: 5px;
      }
      
      .react-calendar-heatmap rect:hover {
        stroke: #555;
        stroke-width: 1px;
      }
     
      .react-calendar-heatmap .color-empty {
        fill: #eeeeee;
      }
      
      .react-calendar-heatmap .color-filled {
        fill: #8cc665;
      }

      .react-calendar-heatmap .color-github-0 {
        fill: #eeeeee;
      }
      .react-calendar-heatmap .color-github-1 {
        fill: #d6e685;
      }
      .react-calendar-heatmap .color-github-2 {
        fill: #8cc665;
      }
      .react-calendar-heatmap .color-github-3 {
        fill: #44a340;
      }
      .react-calendar-heatmap .color-github-4 {
        fill: #1e6823;
      }
    
      .react-calendar-heatmap .color-gitlab-0 {
        fill: #ededed;
      }
      .react-calendar-heatmap .color-gitlab-1 {
        fill: #acd5f2;
      }
      .react-calendar-heatmap .color-gitlab-2 {
        fill: #7fa8d1;
      }
      .react-calendar-heatmap .color-gitlab-3 {
        fill: #49729b;
      }
      .react-calendar-heatmap .color-gitlab-4 {
        fill: #254e77;
      }
      .react-calendar-heatmap .color-scale-1 { fill: #d6e685; }
      .react-calendar-heatmap .color-scale-2 { fill: #8cc665; }
      .react-calendar-heatmap .color-scale-3 { fill: #44a340; }
      .react-calendar-heatmap .color-scale-4 { fill: #1e6823; }
    `}</style>
  )
}

export default MyApp;




