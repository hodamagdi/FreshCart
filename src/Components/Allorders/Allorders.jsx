import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Allorders() {
const navigate = useNavigate();
useEffect(() => {
  navigate("/")
}, [])
}

export default Allorders
