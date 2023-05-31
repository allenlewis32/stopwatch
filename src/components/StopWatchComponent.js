import React, { useState } from "react";

let display, setDisplay;
let interval;
let state = 0; // 0 - stopped, 1 - running, 2 - paused

let time = 0;

function StopWatch() {
    [display, setDisplay] = useState('00:00.00');
    return (
        <React.Fragment>
            <div className='stopwatch'>{display}</div>
            <button type='button' onClick={start}>Start</button>
            <button type='button' onClick={pause}>Pause</button>
            <button type='button' onClick={stop}>Stop</button>
            <button type='button' onClick={reset}>Reset</button>
            <button type='button'>Lap</button>
        </React.Fragment>
    );
}

function start() {
    if(state !== 1) {
        if(state === 0) {
            time = 0;
            update();
        }
        state = 1;
        interval = setInterval(() => {
            time += 0.01;
            update();
        }, 10);
    }
}

function pause() {
    if(state === 1) {
        state = 2;
        clearInterval(interval);
    }
}

function stop() {
    if(state !== 0) {
        if(state === 1) {
            clearInterval(interval);
        }
        state = 0;
    }
}

function reset() {
    stop();
    time = 0;
    update();
}

function update() {
    let result;
    result = '' + Math.floor(time / 60);
    if(result.length === 1) result = '0' + result;
    result += ':' + ('0' + Math.floor(time % 60)).slice(-2);
    result += '.' + ('0' + Math.floor(time % 1 * 100) / 100).slice(-2);
    setDisplay(result);
}

export default StopWatch;
