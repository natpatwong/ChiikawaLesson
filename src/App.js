import { useState } from 'react';
import './App.css';
import chiikawa from './assets/chiikawa_characters.png';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleStart = () => {
    setCurrentPage('register');
  };

  const handleRegister = () => {
    // Save or proceed
    console.log('Registered:', firstName, lastName);
    // Proceed to next page or lesson
  };

  // Generate notebook lines
  const notebookLines = [];
  for (let i = 0; i < 40; i++) {
    notebookLines.push(
      <div
        key={i}
        className="notebook-line"
        style={{ top: `${i * 2.6}%` }}
      />
    );
  }

  return (
    <div className="landing-page" id="landing-page">
      {/* Notebook Lines Background */}
      <div className="notebook-lines">
        {notebookLines}
      </div>

      {/* Decorative Scratch Marks - Top Left */}
      <div className="scratch-mark scratch-top-left"
      style={{
  position: 'absolute',
  top: '10%',
  left: '30%',
}}
>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 10 C30 25, 25 35, 20 55" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 8 C42 28, 38 40, 30 60" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M70 4 C50 40, 60 90, 40 600" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />

        </svg>
      </div>

       {/* Decorative Scratch Marks - Top Right */}
      <div className="scratch-mark scratch-top-right"
      style={{
  position: 'absolute',
  top: '10%',
  right: '30%',  
}}
>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 10 C50 25, 55 35, 60 55" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M30 8 C38 28, 42 40, 50 60" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M55 15 C57 30, 60 42, 65 50" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Peach Blob - Left */}
      <div className="blob blob-left"
      style={{
  position: 'absolute',
    top: '50%',
  left: '30%',  
}}>
        <div className="blob-shape">
          <span className="blob-scratches">///</span>
        </div>
      </div>

      {/* Peach Blob - Right */}
      <div className="blob blob-right"
      style={{
  position: 'absolute',
  top: '50%',
  right: '30%',  
}}>
        <div className="blob-shape">
          <span className="blob-scratches">////</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="main-card" id="main-card">
        {currentPage === 'landing' && (
          <>
            {/* Characters */}
            <div className="characters-container">
              <img
                src={chiikawa}
                alt="ชีคาวะ, ฮาจิวาเระ, อุซางิ"
                className="characters-img"
              />
            </div>

            {/* Title */}
            <h1 className="main-title" id="main-title">
              จี้คาวะสั่งลุย<span className="exclaim">!!</span>
            </h1>

            {/* Wavy Separator */}
            <div className="wavy-separator">
              <svg viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0,12 C15,6 30,18 45,12 C60,6 75,18 90,12 C105,6 120,18 135,12 C150,6 165,18 180,12"
                  stroke="#b8a0a8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Subtitle */}
            <p className="subtitle">มารู้จักโค้ดพื้นฐานไปกับจี้คาวะ</p>

            {/* Description */}
            <div className="description">
              <p>
                มีง่ายๆ 5 บท บทละ 5 คะแนน
                <br />
                ถ้านายทำได้มากกว่า 20 คะแนน
                <br />
                จะได้ใบประกาศนียบัตรด้วยแหละ
              </p>
              <p className="note">*การใช้ตัวช่วยจะทำให้ถูกหักคะแนน</p>
            </div>

            {/* Start Button */}
            <button className="start-button" onClick={handleStart}>
              Start <span className="arrow">→</span>
            </button>
          </>
        )}

        {currentPage === 'register' && (
          <div className="form-container">
            <div className="input-group">
              <label className="input-label">ชื่อจริง</label>
              <input 
                type="text" 
                className="text-input" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">นามสกุล</label>
              <input 
                type="text" 
                className="text-input" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <button className="submit-button" onClick={handleRegister}>
              ตกลง
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
