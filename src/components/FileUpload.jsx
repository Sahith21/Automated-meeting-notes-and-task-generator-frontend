import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [meetingId, setMeetingId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await axios.post('https://automated-meeting-notes-and-task.onrender.com/api/transcribe', formData);
      setMessage(res.data.message);
      setMeetingId(res.data.meetingId);
    } catch (err) {
      setMessage('Upload failed');
      console.error(err);
    }
  };

  const handleNotionPush = async () => {
    try {
      const res = await axios.post('https://automated-meeting-notes-and-task.onrender.com/api/notion', { meetingId });
      setMessage(res.data.message + ` | View: ${res.data.notionPageUrl}`);
    } catch (err) {
      setMessage('Notion push failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Meeting Audio</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="audio/*" />
        <button type="submit">Transcribe</button>
      </form>

      {meetingId && <button onClick={handleNotionPush}>Push to Notion</button>}
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
