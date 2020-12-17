//import {FetchDeckService} from '../store/services/cardServices'
const data = {
    rootId: "1",
    items: {
      1: {
        id: "1",
        children: ["1-0", "1-1"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: "Title 1"
        }
      },
      "1-0": {
        id: "1-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        status:false,
        data: {
          title: "Title 1-0"
        }
      },
      "1-1": {
        id: "1-1",
        children: ["1-1-1", "1-1-2"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        status:false,
        data: {
          title: "Title 1-1"
        }
      },
      "1-1-1": {
        id: "1-1-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        status:false,
        data: {
          title: "Title 1-1-1"
        }
      },
      "1-1-2": {
        id: "1-1-2",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        status:false,
        data: {
          title: "Title 1-1-2"
        }}
    }
  };

// const fetchData = () => {
//   return FetchDeckService()
//   .then((data) => {
//       console.log(data)     
//     }
//   )
//   .catch(error => console.log(error))
// }
  export default data