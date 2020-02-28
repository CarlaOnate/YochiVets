import React from 'react';
import { Link } from 'react-router-dom'
import {  } from '@chakra-ui/core';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h4>Are you a veterinarian and want to join?</h4>
      <Link exact to="/register-vet">Click here to register</Link>
    </div>
  )
}

export default Home
