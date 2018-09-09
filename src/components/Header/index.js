import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'

class Header extends Component {
    render () {
        return (
            <header className="header">
                <ul className="navList">
                	<li><Link to="/" className="effect-underline"><b>Главная</b></Link></li>
                </ul>
            </header>
        )
    }
}

export default Header
