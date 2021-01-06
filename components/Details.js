import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Details = () => {
  return (
      <CardContent >
            <Style/>
            <List className='detailsItem'>
                    <ListItem disableRipple  key='currrent Streak'>
                        <ListItemText primary={<Typography type="body2" className='detailsItemText'>Current Streak</Typography>} />
                        <Typography type="body2" className='detailsItemText'>30 Days</Typography>
                    </ListItem>
            </List>
            <List className='detailsItem'>
                 <ListItem disableRipple  key='Daily Average'>
                    <ListItemText primary={<Typography type="body2" className='detailsItemText'>Daily Avg.</Typography>} />
                    <Typography type="body2" className='detailsItemText'>5 Cards</Typography>
                </ListItem>
            </List>
            <List className='detailsItem'>
                 <ListItem disableRipple  key='Best Streaks'>
                    <ListItemText primary={<Typography type="body2" className='detailsItemText'>Best Streaks</Typography>} />
                    <Typography type="body2" className='detailsItemText'>90 Days</Typography>
                </ListItem>
            </List>
            <List className='detailsItem'>
                 <ListItem disableRipple  key='Days Learned'>
                    <ListItemText primary={<Typography type="body2" className='detailsItemText'>Days Learned</Typography>} />
                    <Typography type="body2" className='detailsItemText'>85 %</Typography>
                </ListItem>
            </List>
      </CardContent>
  );
}

const Style = () => {
    return (
      <style jsx >{`
      .detailsItem{
        cursor:pointer;
        border-bottom: 1px solid white;
        padding: 12px 0 13px 0;
      }
      .detailsItemText{
          font-weight : 600;
          color: #795548;
      }    
      `}</style>
    )
  }

export default Details