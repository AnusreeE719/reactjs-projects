import { useState } from 'react'
import { LC, NC, SC, UC } from './data';
import './styles.css';
import { FaCheck, FaCopy, FaLock } from 'react-icons/fa';

const RandomPasswordGenerator = () => {
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passlength, setPasslength] = useState(10);
  const [finalPass, setFinalPass] = useState('');
  const [copied, setCopied] = useState(false);

  const createPassword = () => {
    let newPass = '';
    let charSet = '';

    if (uppercase || lowercase || number || symbols) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NC;
      if (symbols) charSet += SC;

      for (let i = 0; i < passlength; i++) {
        newPass += charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        );
      }

      setFinalPass(newPass);
    } else {
      alert("Please select at least one option");
    }
  };

  const copyPass = () => {
    if (!finalPass) return;
    navigator.clipboard.writeText(finalPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const getStrengthClass = () => {
    if (finalPass.length < 8) return "strength-fill weak";
    if (finalPass.length < 12) return "strength-fill medium";
    return "strength-fill strong";
  };

  const getStrengthText = () => {
    if (finalPass.length < 8) return "Weak";
    if (finalPass.length < 12) return "Medium";
    return "Strong";
  };

  return (
    <div className="rpg-container">
      <div className="rpg-card">

        <h2 className="rpg-title">
          <FaLock style={{ marginRight: "8px" }} />
          Password Generator
        </h2>

        
        <div className="password-box">
          <input
            type="text"
            value={finalPass}
            readOnly
            placeholder="Your password..."
            className="password-input"
          />
          <button onClick={copyPass} className="copy-btn">
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>

        
        {finalPass && (
          <>
            <div className="strength-bar">
              <div className={getStrengthClass()}></div>
            </div>
            <p className="strength-text">
              {getStrengthText()} Password
            </p>
          </>
        )}

       
        <div className="length-box">
          <div className="length-header">
            <span>Password Length</span>
            <span>{passlength}</span>
          </div>
          <input
            type="range"
            min="6"
            max="25"
            value={passlength}
            onChange={(e) => setPasslength(Number(e.target.value))}
          />
        </div>

        
        <div className="rpg-options">

          <div className="rpg-option">
            <span>Uppercase</span>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
          </div>

          <div className="rpg-option">
            <span>Lowercase</span>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
          </div>

          <div className="rpg-option">
            <span>Numbers</span>
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />
          </div>

          <div className="rpg-option">
            <span>Symbols</span>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
          </div>

        </div>

        <button onClick={createPassword} className="rpg-generate-btn">
          Generate Password
        </button>

      </div>
    </div>
  );
};

export default RandomPasswordGenerator;
