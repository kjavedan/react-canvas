import styled from 'styled-components'
import React, {useState, useRef} from 'react'
import { useEffect } from 'react';
import player from '../player.png'
const Canvas = () => {

    // Canvas dimension
    const CANVAS_WIDTH = 1200;
    const CANVAS_HIGHT = 700;


    // states
    const [startGame, setStartGame] = useState(true)
    const [startShooting, setStartShooting] = useState(false);

    // target cordination info
    const [foxX, setFoxX] = useState(0)
    const [foxSX, setFoxSX] = useState(91.3)
    
    // weapon cordination info
    const [weaponX, setWeaponX] = useState(550)
    const [weaponSX, setWeaponSX] = useState(562)

    // target image switch
    const [imgUp, setImgUp] = useState(true) 

    // dom manuplation
    const canvasRef = useRef(null)
    const foxRef = useRef(null)
    const weaponRef = useRef(null)


    const handleShooting = () => {
        console.log('shoooot now')
    }

    useEffect(() => {
        
        const canvas = canvasRef.current;
        const foxImg = foxRef.current;
        const weaponImg = weaponRef.current;

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HIGHT;
        const ctx = canvas.getContext('2d');

        // ctx.fillStyle = 'lightblue';
        // ctx.fillRect(X,0,100,91.3);
        ctx.drawImage(
            foxImg, 
            0, 
            foxSX, 
            100, 
            91.3, 
            foxX,
            0,
            100, 
            91.3,
            );

        ctx.drawImage(
            weaponImg, 
            0, 
            weaponSX, 
            100, 
            91.3, 
            weaponX,
            550,
            100, 
            91.3,
            );

        
    })

    // useEffect(()=> {
    //     let xId;
    //     if(foxX < CANVAS_WIDTH){
    //         xId = setInterval(()=> {
    //             setFoxX(prevX => prevX + 10)
    //         },20)
    //     }else{
    //         setFoxX(0)
    //     }

    //     return () => {
    //         clearInterval(xId)
    //     }
    // })

    // useEffect(()=>{
    //     if(foxX % 100 === 0){
    //         setImgUp(prevState => !prevState)
    //     }
    //     if(imgUp){
    //         setFoxSX(91.3)
    //     }else{
    //         setFoxSX(182.6)
    //     }
    // },[foxX])

  return (
    <>
        <StyledCanvas
        ref={canvasRef}
        >

        </StyledCanvas>

        <img
        ref={foxRef}
        src={player} alt=""
        style={{display: 'none'}} />
        <img
        ref={weaponRef}
        src={player} alt=""
        style={{display: 'none'}} />

        <StyledBtn
        onClick={handleShooting}
        > shoot </StyledBtn>
    </>
  )
}

export default Canvas


 const StyledCanvas = styled.canvas`
 background-color: peachpuff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`
const StyledBtn = styled.button`
padding: 1rem 2rem;
background-color: white;
position: absolute;
right: 15%;
bottom: 12%;
cursor: pointer;
border: none;
border-radius: 15px;
box-shadow: 0px 2px 2px 2px rgba(0, 0, 0,0.25);

`