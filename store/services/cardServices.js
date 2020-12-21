import HttpService from './httpServices'

export const FetchDeckService = () => {
    const http = new HttpService();
    const fetchUrl = "decks";
    return http.getData( fetchUrl)
          .then((data) => data)
          .catch((error) => error);
  };
  
  export const UpdateDeckService = (payload) => {
    const http = new HttpService();
    const updateUrl = "decks";
    return http.putData( updateUrl , payload)
          .then((data) => data)
          .catch((error) => error);
  };
  
//   export const DeleteTodoService = (id) => {
//     const http = new HttpService();
//     const deleteUrl = "todos/" + id;
//     return http.deleteData( deleteUrl)
//           .then((data) => data)
//           .catch((error) => error);
//   };
  
//   export const CreateCardService = () => {
//     const http = new HttpService();
//     const createUrl = "cards";
//     return http.postData([],createUrl)
//       .then((data) => data)
//       .catch((error) => error);
//   };
