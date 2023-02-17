import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './images/logo.jpg'
import 'animate.css';

const Intro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/game')
        }, 7000)
    }, [])

  return (
    <div className="logo">
      <img src={logo} alt="logo" className="animate__animated animate__bounceInDown" />
      <p className="animate__animated animate__fadeIn animate__delay-1s">simplified</p>
      <div className="animate__animated animate__fadeIn animate__delay-2s rules-link">
        <p>Find the rules <a href="https://cdn.1j1ju.com/medias/f9/2f/9b-king-of-tokyo-rulebook.pdf" target="_blank">here</a></p>
      </div>
    </div>
  )
}

export default Intro
