import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, body, userId } = req.body ;

      // Validate request body
      if (!title || !body || !userId) {
        return res.status(400).json({ message: 'Missing required fields: title, body, and userId' });
      }

      // Send POST request to JSONPlaceholder API using Axios
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId,
      });

      // Return response
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.response ? error.response.data : error.message,
      });
    }
  }
