import HttpService from './httpServices'

export const FetchStreakService = () => {
    const http = new HttpService();
    const fetchUrl = "user/completed-dates";
    return http.getData( fetchUrl)
        .then((data) => data)
        .catch((error) => error);
  };
  
//   export const UpdateDeckService = (payload) => {
//     const http = new HttpService();
//     const updateUrl = "decks";
//     return http.putData( updateUrl , payload)
//           .then((data) => data)
//           .catch((error) => error);
//   };