import { useRouter } from "next/router";
import CalendarComponent from "@components/CalendarComponent";
import Grid from '@material-ui/core/Grid';

const Streak = () => {   
    return (
       <div className='root'>
         <Style/>
          <CalendarComponent/>      
       </div>
  )
}

const Style = () => {
  return (
    <style jsx >{`
      .root{
        flex-grow: 1;
        margin: 100px 0px 0 50px;
      }
      
    `}</style>
  )
}
export default Streak;
