import {FetchStreakService} from '../services/streakServices'



export const fetchStreaks = async() => {
    try{
        const result = await FetchStreakService();
        return result
        //return 
    }
    catch(error){
        console.log(error)
    }
}