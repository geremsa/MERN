import React ,{useState}from 'react'
import { Link } from 'react-router-dom'

import Mainheader  from'./mainheader'
import Navlinks from './navlinks'
import Sidedrawer from './sidedrawer'
import Backdrop from '../UIElements/Backdrop'
import './mainnavigation.css'


function Mainnavigation(props) {
    const [drawerIsOpen, setdrawerIsOpen] = useState(false);
    return (
        <>
        {drawerIsOpen && <Backdrop onClick={()=>setdrawerIsOpen(false)}/>}
        {drawerIsOpen &&
        <Sidedrawer>
            <nav className="main-navigation__drawer-nav">
                <Navlinks/>
            </nav>
        </Sidedrawer>
        }
        <Mainheader>
            <button className="main-navigation__menu-btn" onClick={()=>{
                setdrawerIsOpen(p=>!p)
            }}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1 className="main-navigation__title">
                <Link to='/'>Your Places</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
               <Navlinks/> 
            </nav>
        </Mainheader>
        </>
    )
}

export default Mainnavigation
