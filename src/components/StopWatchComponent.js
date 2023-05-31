import React, { useState } from "react";

let display, setDisplay;

let time = 0;

function StopWatch() {
    [display, setDisplay] = useState('00:00');
    return (
        <React.Fragment>
            <div className='stopwatch'>{display}</div>
            <button type='button' onClick={start}>Start</button>
            <button type='button'>Pause</button>
            <button type='button'>Stop</button>
            <button type='button'>Lap</button>
        </React.Fragment>
    );
}

function start() {
    setInterval(() => {
        time++;
        update();
    }, 1000);
}

function update() {
    let result;
    result = '' + Math.floor(time / 60);
    if(result.length === 1) result = '0' + result;
    result += ':' + ('0' + Math.floor(time % 60)).slice(-2);
    setDisplay(result);
}

export default StopWatch;
