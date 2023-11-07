import fetch from 'node-fetch'; // Ensure you've imported fetch or use any other HTTP library

export default async function handler(req, res) {
  const url = 'https://raw.githubusercontent.com/pwr406/finalproject/main/db.json?token=GHSAT0AAAAAACI65HSHP2TNWK72QAPCB5BMZKJXTAA';

  try {
    const response = await fetch(url);
    const rawData = await response.text(); // Fetch as text

    // Manually parse the fetched text as JSON
    const data = JSON.parse(rawData);

    // Return the data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}