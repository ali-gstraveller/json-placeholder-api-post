import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import axios from 'axios';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/posts', { title, body, userId });
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: error.response?.data?.message || error.message });
    }
  };



  return (
    <div style={{ padding: '2rem' }}>
    <h1>Create a Post</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
      </div>
      <div>
        <label>User ID:</label>
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
    {response && (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    )}
  </div>
  );
}
