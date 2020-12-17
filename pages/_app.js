import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../config/theme';
import Layout from '../components/layout';
import UserProvider from '../context/UserContext';
import App from "next/app";
import cookies from "next-cookies";
import pages from '../mockdata/data';
// import store from '../store/models/index'
// import { StoreProvider } from 'easy-peasy'


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
        {/* <StoreProvider store={store}> */}
        <UserProvider initialState={{isAuthenticated, initialDecks}}>
          <Layout>
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
              `}</style>
              {/* <style jsx global>{`
                .kDFczx{
                  max-height: 450px
                }
              `}</style> */}
              <Component {...pageProps} />
          </Layout>
        {/* </StoreProvider> */}
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



  
  export default MyApp;




