import React from 'react';
import FileUpload from '../components/FileUpload';

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Automated Meeting Notes Generator</h1>
      <FileUpload />
    </div>
  );
};

export default Home;
