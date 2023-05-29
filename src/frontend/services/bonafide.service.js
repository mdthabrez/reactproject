import api from "./api";



// function addBonafide(formData) {
//     return api
//       .post('/addbonafide', formData, { 
//         'Content-Type': 'application/json',  
//       })
//     //   .then((response) => response.data)
//       .catch((error) => {
//         console.error('Error:', error);
//         throw new Error('Failed to add bonafide');
//       });
//   }

async function addBonafide(formData) {
try {
    const response = await api.post('/addbonafide', formData, {
      responseType: 'blob',  // Specify the response type as arraybuffer
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to create bonafide');
  }
};

  function getBonafide(filters) {
    return api
      .get('/getbonafide/filter', { params: filters })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error:', error);
        throw new Error('Failed to get bonafide');
      });
  }


const BonafideService = {
    addBonafide,
    getBonafide
}

export default BonafideService;