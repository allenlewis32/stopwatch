import React, { useState } from "react";

let display, setDisplay;
let seconds, setSeconds;
let minutes, setMinutes;
let interval;
let state, setState; // 0 - stopped, 1 - running, 2 - paused
let laps, setLaps;

let time = 0;

function StopWatch() {
    [display, setDisplay] = useState('00:00.00');
    [seconds, setSeconds] = useState(0);
    [minutes, setMinutes] = useState(0);
    [state, setState] = useState(0);
    [laps, setLaps] = useState([]);
    let secondHandStyle = {
        'transform':seconds
    };
    let minuteHandStyle = {
        'transform':minutes
    }
    return (
        <React.Fragment>
            <div className='dial-second'>
                <div className='dial-minute'>
                    <div id='minuteHand' className='hand-minute' style={minuteHandStyle}></div>
                    <div className='dial-north-minute'>30</div>
                    <div className='dial-south-minute'>15</div>
                </div>
                <div id='secondHand' className='hand-second' style={secondHandStyle}></div>
                <div className='dial-north'>60</div>
                <div className='dial-east'>15</div>
                <div className='dial-south'>30</div>
                <div className='dial-west'>45</div>
            </div>
            {display}
            <div className='buttons'>
                {state !== 1 && <button type='button' onClick={start}>Start</button>}
                {state === 1 && <button type='button' onClick={pause}>Pause</button>}
                {state !== 0 && <button type='button' onClick={stop}>Stop</button>}
                {display !== '00:00.00' && <button type='button' onClick={reset}>Reset</button>}
                <button type='button' onClick={addLap}>Lap</button>
            </div>
            <ol>
                {laps.map(e=><li>{e}</li>)}
            </ol>
        </React.Fragment>
    );
}

function addLap() {
    setLaps([...laps, display]);
}

function start() {
    if(state !== 1) {
        if(state === 0) {
            time = 0;
            setLaps([]);
            update();
        }
        setState(1);
        interval = setInterval(() => {
            time += 0.01;
            update();
        }, 10);
    }
}

function pause() {
    if(state === 1) {
        setState(2);
        clearInterval(interval);
    }
}

function stop() {
    if(state !== 0) {
        if(state === 1) {
            clearInterval(interval);
        }
        setState(0);
    }
}

function reset() {
    stop();
    time = 0;
    setLaps([]);
    update();
}

function update() {
    let result;
    result = '' + Math.floor(time / 60);
    if(result.length === 1) result = '0' + result;
    result += ':' + ('0' + Math.floor(time % 60)).slice(-2);
    result += '.' + ('0' + Math.floor(time % 1 * 100)).slice(-2);
    setDisplay(result);

    setSeconds(`rotate(${time % 60 * 6}deg)`);
    setMinutes(`rotate(${time / 60 * 12}deg)`);
}

export default StopWatch;
