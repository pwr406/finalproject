const url = 'https://raw.githubusercontent.com/pwr406/finalproject/main/db.json';



export default async function handler(request, response) {
    
    try {
        const fetchData = await fetch(url);
        const textData = await fetchData.text(); // Convert the fetched data to JSON
    
       

        const jsonData = JSON.parse(textData)

  // Handle specific requests for parks or reviews
  if (request.url === '/getParks/') {
    response.status(200).json(jsonData.parks);
  } else if (request.url === '/getReviews/') {
    response.status(200).json(jsonData.reviews);
  } else {
    response.status(200).json(jsonData.parks);
    
  }
} catch (error) {
  console.error('Error fetching or parsing data:', error);
  response.status(500).json({ error: 'Internal Server Error' });
}
}