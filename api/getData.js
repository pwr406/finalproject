export default async function handler(request, response) {
    const url = 'https://raw.githubusercontent.com/pwr406/finalproject/main/db.json?token=GHSAT0AAAAAACI65HSHP2TNWK72QAPCB5BMZKJXTAA';
  
    try {
      const fetchData = await fetch(url);
      const jsonData = await fetchData.json(); // Convert the fetched data to JSON
  
      response.status(200).json(jsonData); // Sending the JSON data as a response
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }