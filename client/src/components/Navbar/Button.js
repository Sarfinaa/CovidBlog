import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button({signin,onClick,title,setDarkMode}) {
  const offdark=()=>{
    setDarkMode(false);
    onClick();
  }
  return (
    <div>
    {signin?(  <Link to='/auth'>
      <button className='btn' onClick={()=>setDarkMode(false)}>{title}</button>
    </Link>
    
    ):(   
      <button onClick={offdark} className='btn'>{title}</button>
    )
    
    }

    </div>
  );
}
