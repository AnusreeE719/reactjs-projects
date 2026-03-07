import { useState } from 'react';
import data from './data';
import './styles.css'

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [multiSelection, setMultiSelection] = useState(false);
    const [multiSelected, setMultiSelected] = useState([]);
    const handleSingleSelection = (currentId) => {
        setSelected(currentId === selected ? null : currentId)
    }
    const handleMultiSelection = (currentId) => {
        let list = [...multiSelected];
        const indexOfCurrentId = list.indexOf(currentId);

        if (indexOfCurrentId === -1) list.push(currentId);
        else list.splice(indexOfCurrentId, 1);
        setMultiSelected(list);
    }
    const handleToggleMultiSelection = () => {
        setMultiSelection(prev => !prev);
        setSelected(null);
        setMultiSelected([]);
    }
    console.log(selected, multiSelected, multiSelection)
    return (
        <div className='acc-wrapper'>

            <div className="toggle-container">
                <span>Multi Selection</span>
                <div
                    className={`toggle-switch ${multiSelection ? "on" : ""}`}
                    onClick={handleToggleMultiSelection}
                >
                    <div className="toggle-circle"></div>
                </div>
            </div>


            <div className="accordion">
                {
                    data && data.length > 0 ?(
                        data.map((dataItem) => (
                            <div key={dataItem.id} className="item">
                                <div 
                                    onClick={
                                        multiSelection 
                                            ? () => handleMultiSelection(dataItem.id)
                                            : () => handleSingleSelection(dataItem.id)
                                    } 
                                    className='title'>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    multiSelection 
                                        ? multiSelected.indexOf(dataItem.id) !== -1 && (
                                            <div className='acc-content'>{dataItem.answer}</div>
                                        ) 
                                        : selected === dataItem.id && (
                                            <div className='acc-content'>{dataItem.answer}</div>
                                        )
                                }
                            </div>
                        ))
                    )
                    : ( <div> No data found. </div> ) 
                }
            </div>
        </div>
    )
}

export default Accordion;
