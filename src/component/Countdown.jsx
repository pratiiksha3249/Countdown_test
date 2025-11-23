
import { useRef } from 'react';
import React, { useEffect, useState } from 'react'

const Countdown = () => {
  const [time,setTime]=useState(0);
  const [active,setActive]=useState(false);
  const [pause,setPause]=useState(false);
  const intervalRef =useRef(null);


  //when user enter input values into input box
  const handleInput=(event)=>{

    //Minutes convert into seconds.....
    setTime(parseInt(event.target.value*60));
  }
   
  const formatTime=()=>{
    //secounds convert into minutes...
    const min=String(Math.floor(time/60)).padStart(2,'0');
    const sec=String(time % 60).padStart(2,'0');
    return `${min} : ${sec}`
  }

  const hadleStart=()=>{
        setActive(true);
        setPause(false);

  }
  useEffect(()=>{
          if(active && !pause && time > 0 ){
            intervalRef.current=setInterval(()=>{
                 setTime((prev)=>prev-1)
            },1000)
          }
          else if(time===0){
            clearInterval(intervalRef.current);
            setActive(false);
            alert('Your time is up');
          }
          return ()=> clearInterval(intervalRef.current);
  },[active,pause,time])

  const hadlePause =()=>{
      setPause(!pause)
  }
  const hadleReset=()=>{
             clearInterval(intervalRef.current);
             setActive(false);
             setTime(0);
             
  }

  return (
    <div>
      <center> 
          <div>
      <h1>CountDown</h1>
      </div>

      <div>
        <input type='number' placeholder='Enter Time in Minute....'
        onChange={handleInput}
        ></input>
      </div>

      <div>
        <h3>{formatTime()}</h3>
      </div>

      <div>
        <button onClick={hadleStart} disabled={active && !pause}>Start</button>&nbsp;&nbsp;&nbsp;
        <button onClick={hadlePause} disabled={!active}>{pause ? 'Resum' : 'Pause'}</button>&nbsp;&nbsp;&nbsp;
        <button onClick={hadleReset}>Reset</button>&nbsp;&nbsp;&nbsp;
      </div>
</center>
    </div>
  )
}

export default Countdown
