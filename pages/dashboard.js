import { useState, useEffect } from 'react';
import { makeStyles, createStyles, useTheme, Button } from '@material-ui/core';
import Head from 'next/head'
import cookies from "next-cookies";
import { Box } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeatMap from '@components/HeatMap';
import ChartKick from '@components/ChartKick';



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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className='paper'>
                    <HeatMap/>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className='paper'>
                    <p>Streaks</p>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className='paper'>xs=6</Paper>
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
        margin: 10px 50px 0 50px;
      }
      .paper{
        padding: 16px;
        text-align: center;
        color: rgba(0, 0, 0, 0.54);
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
