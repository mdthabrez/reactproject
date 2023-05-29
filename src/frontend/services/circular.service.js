import api from "./api";

function addCircular(data) {
    return api
      .post('/addcircular', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error:', error);
        throw new Error('Failed to add circular');
      });
  }
  
  function getAllCircular() {
    return api
      .get('/getallcircular')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error:', error);
        throw new Error('Failed to fetch circular records');
      });
  }

  const CircularService = {
    addCircular,
    getAllCircular
  }

  export default CircularService;