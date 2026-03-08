import { useState } from 'react';
import './styles.css';
import { generateHexColor, generateRGBColor } from './generateColor';

const RandomColorGenerator = () => {
    const [color, setColor] = useState("#ffffff");
    const [type, setType] = useState("HEX");
    const [history, setHistory] = useState([]);

    const generateColor = () => {
        let newColor = type === "HEX" ? generateHexColor() : generateRGBColor();
        setColor(newColor);
        setHistory([newColor, ...history.slice(0,4)]);
    }
    const copyColor = () => {
        navigator.clipboard.writeText(color);
        alert("Color copied");
    }
  return (
    <div className='color-generator' style={{backgroundColor: color}}>
        <h1>Random Color Generator</h1>
        <h2 onClick={copyColor}>{color}</h2>
        <div className="buttons">
            <button onClick={() => setType("HEX")}>HEX</button>
            <button onClick={() => setType("RGB")}>RGB</button>
            <button onClick={generateColor}>Generate</button>
        </div>
        <div className='history'>
            <h3>Recent Colors</h3>
            {history.map((col, index) => (
                <div
                    key={index}
                    className='color-item'
                    style={{backgroundColor: col}}
                >
                    {col}
                </div>
            ))}
        </div>
    </div>
  )
}

export default RandomColorGenerator
