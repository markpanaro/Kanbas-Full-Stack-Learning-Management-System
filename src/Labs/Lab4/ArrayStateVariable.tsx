import React, { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <ul>
                <button onClick={addElement} className="btn btn-success w-5">Add Element</button>
            </ul>
            <ul>
                {array.map((item, index) => (
                    <div key={index}>
                        <div className="form-control mb-2 form-wrapper">
                            <span className="right-text-margin">{item}</span>
                            <button onClick={() => deleteElement(index)}
                                id="wd-delete-element-click" className="btn btn-danger w-5">
                                Delete</button>
                        </div>
                    </div>
                ))}

            </ul >
            <hr />
        </div >
    );
}
