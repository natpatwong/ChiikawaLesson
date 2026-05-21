import { useState } from 'react';
import './App.css';
import chiikawa from './assets/chiikawa_characters.png';
import hachi from './assets/ฮาชิ.png';
import usagi from './assets/usagi.png';
import chiikawaThumbs from './assets/จี้คาวะนิ้วโป้ง.png';
import chiikawaSmile from './assets/จี้ยิม้.png';
import chiikawaCry from './assets/cry.png';

// ===== ข้อมูลบทเรียนแยกไฟล์ =====
import { lessonsByLanguage, availableLanguages } from './lessons';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [lessonIndex, setLessonIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showHintDialog, setShowHintDialog] = useState(false);
  const [score, setScore] = useState(0);
  const [usedHint, setUsedHint] = useState(false);

  // ดึงบทเรียนปัจจุบันจากไฟล์ที่แยก
  const currentLesson =
    selectedLanguage && lessonsByLanguage[selectedLanguage]
      ? lessonsByLanguage[selectedLanguage].lessons[lessonIndex]
      : null;

  // ====== Handlers ======
  const handleStart = () => setCurrentPage('register');

  const handleRegister = () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert('กรุณากรอกชื่อและนามสกุล');
      return;
    }
    setCurrentPage('selectLanguage');
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setLessonIndex(0);
    setCurrentPage('confirmLanguage');
  };

  const handleConfirmLanguage = () => setCurrentPage('lessonIntro');

  const handleStartExercise = () => {
    setUserCode('');
    setUsedHint(false);
    setCurrentPage('lessonExercise');
  };

  const handleAskSubmit = () => setShowSubmitDialog(true);
  const handleCancelSubmit = () => setShowSubmitDialog(false);

  const handleConfirmSubmit = () => {
    setShowSubmitDialog(false);
    if (!currentLesson) return;
    const isCorrect = currentLesson.check(userCode);
    if (isCorrect) {
      const earned = usedHint ? 3 : 5;
      setScore((s) => s + earned);
      setCurrentPage('resultCorrect');
    } else {
      setCurrentPage('resultWrong');
    }
  };

  const handleNextLesson = () => {
    const list = lessonsByLanguage[selectedLanguage].lessons;
    if (lessonIndex + 1 < list.length) {
      setLessonIndex(lessonIndex + 1);
      setCurrentPage('lessonIntro');
    } else {
      // จบทุกบท — กลับไปเลือกภาษาใหม่
      setCurrentPage('selectLanguage');
    }
  };

  const handleAskHint = () => setShowHintDialog(true);
  const handleCancelHint = () => setShowHintDialog(false);
  const handleConfirmHint = () => {
    setUsedHint(true);
    setShowHintDialog(false);
    setCurrentPage('hint');
  };

  const handleBackToExercise = () => setCurrentPage('lessonExercise');

  const handleBack = () => {
    const backMap = {
      register: 'landing',
      selectLanguage: 'register',
      confirmLanguage: 'selectLanguage',
      lessonIntro: 'selectLanguage',
      lessonExercise: 'lessonIntro',
      hint: 'lessonExercise',
      resultCorrect: 'lessonExercise',
      resultWrong: 'lessonExercise',
    };
    const prev = backMap[currentPage];
    if (prev) setCurrentPage(prev);
  };

  // ====== Decorative notebook lines ======
  const notebookLines = [];
  for (let i = 0; i < 40; i++) {
    notebookLines.push(
      <div key={i} className="notebook-line" style={{ top: `${i * 2.6}%` }} />
    );
  }

  const renderBackground = () => (
    <>
      <div className="notebook-lines">{notebookLines}</div>
      <div className="scratch-mark scratch-top-left" style={{ position: 'absolute', top: '10%', left: '5%' }}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 10 C30 25, 25 35, 20 55" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 8 C42 28, 38 40, 30 60" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M70 4 C50 40, 60 90, 40 600" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className="scratch-mark scratch-top-right" style={{ position: 'absolute', top: '10%', right: '5%' }}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 10 C50 25, 55 35, 60 55" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M30 8 C38 28, 42 40, 50 60" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M55 15 C57 30, 60 42, 65 50" stroke="#4a3040" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className="blob blob-left" style={{ position: 'absolute', top: '70%', left: '5%' }}>
        <div className="blob-shape">
          <span className="blob-scratches">///</span>
        </div>
      </div>
      <div className="blob blob-right" style={{ position: 'absolute', top: '70%', right: '5%' }}>
        <div className="blob-shape">
          <span className="blob-scratches">////</span>
        </div>
      </div>
    </>
  );

  const renderBackButton = () =>
    currentPage !== 'landing' && (
      <button className="back-button" onClick={handleBack}>
        ←
      </button>
    );

  // ====== Lesson layout (สำหรับ exercise / hint / result) ======
  const renderLessonLayout = (rightContent, options = {}) => {
    const { showHintIcon = true } = options;
    if (!currentLesson) return null;
    return (
      <div className="lesson-page">
        {renderBackground()}
        {renderBackButton()}

        <div className="lesson-frame">
          <div className="lesson-header">
            <div className="lesson-title">
              <div>{currentLesson.title}</div>
              <div className="lesson-lang">ภาษา {selectedLanguage}</div>
            </div>
            <div className="lesson-header-icons">
              {showHintIcon && (
                <button className="icon-btn hint-icon" onClick={handleAskHint} title="ขอคำใบ้">
                  ?
                </button>
              )}
              <div className="score-pill">Point {score}</div>
            </div>
          </div>

          <div className="lesson-body">
            <div className="lesson-left">
              <div className="exercise-prompt">
                <p>{currentLesson.prompt}</p>
                <p className="prompt-text">{currentLesson.promptText}</p>
                <p className="prompt-hint">
                  โดยใช้ภาษา <b>{selectedLanguage}</b>
                </p>
              </div>
              <button className="submit-button left-submit" onClick={handleAskSubmit}>
                Submit
              </button>
            </div>
            <div className="lesson-right">{rightContent}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-page" id="landing-page">
      {/* ===== LANDING ===== */}
      {currentPage === 'landing' && (
        <>
          {renderBackground()}
          <div className="main-card">
            <div className="characters-container">
              <img src={chiikawa} alt="ชีคาวะ, ฮาจิวาเระ, อุซางิ" className="characters-img" />
            </div>
            <h1 className="main-title">
              จี้คาวะสั่งลุย<span className="exclaim">!!</span>
            </h1>
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
            <p className="subtitle">มารู้จักโค้ดพื้นฐานไปกับจี้คาวะ</p>
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
            <button className="start-button" onClick={handleStart}>
              Start <span className="arrow">→</span>
            </button>
          </div>
        </>
      )}

      {/* ===== REGISTER ===== */}
      {currentPage === 'register' && (
        <>
          {renderBackground()}
          {renderBackButton()}
          <div className="main-card">
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
          </div>
        </>
      )}

      {/* ===== SELECT LANGUAGE ===== */}
      {currentPage === 'selectLanguage' && (
        <>
          {renderBackground()}
          {renderBackButton()}
          <div className="main-card select-lang-card">
            <h2 className="select-lang-title">Select language</h2>
            <div className="lang-options">
              {availableLanguages.map((lang) => (
                <button key={lang} className="lang-pill" onClick={() => handleSelectLanguage(lang)}>
                  {lang}
                </button>
              ))}
            </div>
            <img 
  src={hachi} 
  alt="ฮาชิแว่น" 
  className="corner-character" 
  style={{ width: '200px', height: 'auto' }}
/>
          </div>
        </>
      )}

      {/* ===== CONFIRM LANGUAGE ===== */}
      {currentPage === 'confirmLanguage' && (
        <>
          {renderBackground()}
          {renderBackButton()}
          <div className="main-card select-lang-card">
            <h2 className="select-lang-title">Select language</h2>
            <p className="confirm-text">เลือกภาษาเป็นภาษา</p>
            <p className="confirm-lang">{selectedLanguage}</p>
            <div className="confirm-actions">
              <button className="pill-btn confirm-yes" onClick={handleConfirmLanguage}>
                ตกลง
              </button>
              <button className="pill-btn confirm-no" onClick={handleBack}>
                ย้อนกลับ
              </button>
            </div>
            <img 
  src={hachi} 
  alt="ฮาชิแว่น" 
  className="corner-character" 
  style={{ width: '200px', height: 'auto' }}
/>
          </div>
        </>
      )}

      {/* ===== LESSON INTRO (ตัวอย่างโค้ด) ===== */}
      {currentPage === 'lessonIntro' && currentLesson && (
        <div className="lesson-page">
          {renderBackground()}
          {renderBackButton()}
          <div className="intro-card">
            <h2 className="intro-title">{currentLesson.title.replace('Hello World', 'ตัวอย่าง Hello World')}</h2>
            <p className="intro-desc">{currentLesson.description}</p>
            <div className="code-editor">
              <pre>
                <code>{currentLesson.exampleCode}</code>
              </pre>
            </div>
            <div className="terminal">
              <div className="terminal-header">▌Output</div>
              <pre>{currentLesson.exampleOutput}</pre>
            </div>
            <p className="intro-note">เมื่อเข้าใจแล้ว ลองกดปุ่มเริ่มทำเพื่อเขียนโค้ดด้วยตัวเองดูสิ!</p>
            <button className="submit-button" onClick={handleStartExercise}>
              เริ่มทำ
            </button>
          </div>
          <img src={usagi} alt="อุซางิ" className="floating-usagi" />
        </div>
      )}

      {/* ===== LESSON EXERCISE ===== */}
      {currentPage === 'lessonExercise' &&
        renderLessonLayout(
          <div className="editor-area">
            <textarea
              className="code-input"
              placeholder={`เขียนโค้ด ${selectedLanguage} ตรงนี้...`}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
          </div>
        )}

      {/* ===== HINT PAGE ===== */}
      {currentPage === 'hint' &&
        renderLessonLayout(
          <div className="hint-card">
            <p className="hint-text">{currentLesson && currentLesson.hint}</p>
            <button className="pill-btn confirm-yes" onClick={handleBackToExercise}>
              เข้าใจแล้ว
            </button>
          </div>,
          { showHintIcon: false }
        )}

      {/* ===== RESULT CORRECT ===== */}
      {currentPage === 'resultCorrect' &&
        renderLessonLayout(
          <div className="result-card">
            <h2 className="result-correct">ทำถูกต้อง!</h2>
            <img src={chiikawaThumbs} alt="ดีมาก!" className="result-character" />
            <button className="pill-btn confirm-yes" onClick={handleNextLesson}>
              ต่อไป
            </button>
          </div>,
          { showHintIcon: false }
        )}

      {/* ===== RESULT WRONG ===== */}
      {currentPage === 'resultWrong' &&
        renderLessonLayout(
          <div className="result-card">
            <h2 className="result-wrong">ยังไม่ถูกนะ ลองใหม่</h2>
            <img src={chiikawaCry} alt="ลองอีกครั้ง" className="result-character" />
            <button className="pill-btn confirm-no" onClick={handleBackToExercise}>
              ลองอีกครั้ง
            </button>
          </div>,
          { showHintIcon: false }
        )}

      {/* ===== SUBMIT CONFIRM DIALOG ===== */}
      {showSubmitDialog && (
        <div className="overlay">
          <div className="dialog">
            <img src={chiikawaSmile} alt="" className="dialog-character" />
            <h3 className="dialog-title">ส่งคำตอบ?</h3>
            <p className="dialog-sub">ตรวจสอบก่อนกดส่งนะ</p>
            <div className="dialog-actions">
              <button className="pill-btn confirm-yes" onClick={handleConfirmSubmit}>
                ส่ง
              </button>
              <button className="pill-btn confirm-no" onClick={handleCancelSubmit}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HINT CONFIRM DIALOG ===== */}
      {showHintDialog && (
        <div className="overlay">
          <div className="dialog">
            <img src={chiikawaSmile} alt="" className="dialog-character" />
            <h3 className="dialog-title">ขอคำใบ้?</h3>
            <p className="dialog-sub">การใช้ตัวช่วยจะทำให้ถูกหักคะแนน</p>
            <div className="dialog-actions">
              <button className="pill-btn confirm-yes" onClick={handleConfirmHint}>
                ขอ
              </button>
              <button className="pill-btn confirm-no" onClick={handleCancelHint}>
                ไม่ขอ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
