import React from 'react'
import { faUser } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../../App"

export default function Navbar(){
  const navigate = useNavigate();
  const state = useSelector((state) => state)
  console.log(state)

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div className='container'>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">AlgoMaster</a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
            <li class="nav-item" onClick={() => navigate("/profile")}>
              <a class="nav-link" href="#"> <FontAwesomeIcon icon={faUser}/>  </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

