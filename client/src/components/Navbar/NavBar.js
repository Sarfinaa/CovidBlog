import React,{useState,useEffect} from 'react'
import useStyles from './styles';
import { Button } from './Button';
import {useDispatch} from 'react-redux';
import {Link,useHistory,useLocation} from 'react-router-dom'
import {Avatar,Typography,Toolbar} from '@material-ui/core';
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
import decode from 'jwt-decode';
import './NavBar.css';
function NavBar({darkMode,setDarkMode}) {
    const classes=useStyles();
    const history=useHistory();
    const location =useLocation();
    const dispatch=useDispatch();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    //getting data from reducer;
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const logout=()=>{
        dispatch({type:'LOGOUT'});
        setUser(null);
        history.push('/');
     
    }
    const mobileSignout=()=>{
      setDarkMode(false)
        logout();
        closeMobileMenu();
    }
    const offDark=()=>{
      setDarkMode(false);
      closeMobileMenu();
    }
    useEffect(()=>{
const token=user?.token;
if(token){
    const decodedToken=decode(token);
    //when token expires we logout
    if(decodedToken.exp*1000<new Date().getTime()) logout();
}
setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    return (
        <>
        <nav className={`navbar ${darkMode&&'navbar-on'}`}>
          <Link to='/' className='navbar-logo' onClick={offDark}>
            
             <span className='covid'>COVID </span>
             <BookTwoToneIcon style={{ fontSize: 32 }} />
                  
             
            {/* //logo icon */}
            {/* <i class='fab fa-firstdraft' />  */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {/* //menu icon */}
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={`${click ? 'nav-menu active' : 'nav-menu'} ${darkMode&&'ondark'}`}>
            <li className='nav-item'>
              <Link to='/' className={`nav-links ${darkMode&&'nav-links-on'}`} onClick={offDark}>
                Blogs
              </Link>
            </li>
    
           <li className='nav-item'>
              <Link
                to='/tracker'
                className={`nav-links ${darkMode&&'nav-links-on'}`}
                onClick={closeMobileMenu}
              >
                Tracker
              </Link>
            </li> 
          {/* <li className='nav-item'>
              <div  className='nav-links' onClick={closeMobileMenu}>
            
              </div>
            </li> */}
            <li>
                {user?(
         <div  className='nav-links-mobile'  onClick={ mobileSignout}>
             LOGOUT
         </div>
                ):(
                    <Link
                to='/auth'
                className='nav-links-mobile'
                onClick={offDark}
              >
                SIGN IN
              </Link>
                )}
              
            </li>
          </ul>
          <Toolbar className={classes.toolbar}>
                {user?(
<div className={classes.profile}>
    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
        {user.result.name.charAt(0)}
    </Avatar>
<Typography className={classes.userName} variant="h6">
    {user.result.name}
</Typography>
<Button setDarkMode={setDarkMode} onClick={logout} title="LOGOUT"/>
</div>
                ):(
<Button signin setDarkMode={setDarkMode} title="SIGN IN"/>
                )
                }
        </Toolbar>
     
        </nav>
      </>
    )
}

export default NavBar
 