import { useState, useEffect } from 'react';
import { makeStyles, createStyles, useTheme, Button } from '@material-ui/core';
import Head from 'next/head'
import cookies from "next-cookies";
import { Box } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeatMap from '@components/HeatMap';
import ChartKick from '@components/ChartKick';
import CalendarComponent from '@components/CalendarComponent';
import Details from '@components/Details';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 700
  },
}));


const Dashboard = (props) => {
  return (
        <>
           <div className='root'>
              <Style/>
              <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                md={12}
                lg={9}
                xl={9}
              >
                <Grid item xs={12}>
                  <Paper className='paper'>
                    <HeatMap/>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className='paper'>
                    <CalendarComponent/>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className='paper details'>
                    <Details/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className='paper'>
                    <ChartKick/>
                  </Paper>
                </Grid>
              </Grid>
           </div>
        </>
  )
}

const Style = () => {
  return (
    <style jsx >{`
      .root{
        flex-grow: 1;
        margin: 100px 0px 0 50px;

      }
      .paper{
        padding: 16px;
        text-align: center;
        color: rgba(0, 0, 0, 0.54);
      }
      .details{
        background-color: #e0e0e0;
      }
      
    `}</style>
  )
}
export default Dashboard;


// export const getServerSideProps = async (context) => {
//   const { token } = cookies(context);
//   const res = context.res;
//   const req = context.req;
//   return {   props: { } };
// }
