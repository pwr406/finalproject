export default async function handler(req, res) {
    const url = 'https://raw.githubusercontent.com/pwr406/finalproject/main/db.json?token=GHSAT0AAAAAACI65HSHP2TNWK72QAPCB5BMZKJXTAA'; 
  
    // Fetch the JSON data
    const response = await fetch(url);
    const data = await response.json();
  
    // Return the data
    res.status(200).json(data);
  }