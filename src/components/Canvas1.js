import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import player from "../player.png";
import boom from "../boom.png";
import Button from "@mui/material/Button";
import sound from "../sound.mp3";

const Canvas1 = () => {
  const audio = new Audio(sound);

  // Canvas dimension
  const CANVAS_WIDTH = 1200;
  const CANVAS_HIGHT = 700;

  const SCREEN_TOP = -150;

  const SHOOT_SPEED = 20;

  // spritesheet
  const SPRITE_WIDTH = 200;
  const SPRITE_HEIGHT = 200;

  const [spriteFrame, setSpriteFrame] = useState(0);

  // console.log(spriteFrame);

  // explosions
  const explosion = [];
  const EXPLOSION_WIDTH = SPRITE_WIDTH * 0.5;
  const EXPLOSION_HEIGHT = SPRITE_HEIGHT * 0.5;

  // collision
  const [isCollied, setIsCollied] = useState(false);

  // states
  const [startGame, setStartGame] = useState(true);
  const [startShooting, setStartShooting] = useState(false);

  // target cordination info
  const FOX_WIDTH = 100;
  const FOX_HEIGHT = 91.3;
  const [foxX, setFoxX] = useState(0);
  const [foxSX, setFoxSX] = useState(91.3);
  const [foxY, setFoxY] = useState(0);

  // weapon cordination info
  const [weaponX, setWeaponX] = useState(550);
  const [weaponY, setWeaponY] = useState(550);
  const [weaponSX, setWeaponSX] = useState(562);
  const WEAPON_WIDTH = 100;
  const WEAPON_HEIGHT = 91.3;

  // target image switch
  const [imgUp, setImgUp] = useState(true);

  // dom manuplation
  const canvasRef = useRef(null);
  const foxRef = useRef(null);
  const weaponRef = useRef(null);
  const boomRef = useRef(null);

  const toggleStart = () => {
    setStartGame((PS) => !PS);
    setIsCollied(false);
    setSpriteFrame(0);
  };

  const handleShooting = () => {
    setStartShooting(true);
  };

  const checkCollision = () => {
    // if (foxX + FOX_WIDTH === weaponX + weaponX) {
    //   if (weaponY === 0) {
    //     console.log("collied");
    //   }
    //   // foxX > weaponX + WEAPON_WIDTH ||
    //   // foxX + FOX_WIDTH < weaponX ||
    //   // foxY > weaponY + WEAPON_HEIGHT ||
    //   // foxY + FOX_WIDTH < WEAPON_WIDTH
    //   // console.log("not collied");
    // } else {
    //   // console.log("not Collied");
    //   // console.log(startShooting);
    //   // setIsCollied(true);
    // }
  };

  const drawExplosion = (canvas) => {
    console.log("jo");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const foxImg = foxRef.current;
    const weaponImg = weaponRef.current;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HIGHT;
    const ctx = canvas.getContext("2d");

    if (!isCollied) {
      ctx.drawImage(
        foxImg,
        foxY,
        foxSX,
        FOX_WIDTH,
        FOX_HEIGHT,
        foxX,
        0,
        100,
        91.3
      );
      ctx.drawImage(
        weaponImg,
        0,
        weaponSX,
        WEAPON_WIDTH,
        WEAPON_HEIGHT,
        weaponX,
        weaponY,
        100,
        91.3
      );
    }
  });

  useEffect(() => {
    let xId;
    if (foxX < CANVAS_WIDTH && startGame) {
      xId = setInterval(() => {
        setFoxX((prevX) => prevX + 10);
      }, 8);
    } else {
      setFoxX(0);
    }

    return () => {
      clearInterval(xId);
    };
  });

  useEffect(() => {
    if (foxX % 100 === 0) {
      setImgUp((prevState) => !prevState);
    }
    if (imgUp) {
      setFoxSX(91.3);
    } else {
      setFoxSX(182.6);
    }
  }, [foxX]);

  useEffect(() => {
    let weaponId;
    if (startGame && startShooting) {
      if (weaponY > SCREEN_TOP) {
        weaponId = setInterval(() => {
          setWeaponY((PS) => PS - SHOOT_SPEED);
        }, 8);
      } else {
        setWeaponY(550);
        setStartShooting(false);
      }
    }
    // console.log(foxX);
    if (foxX - FOX_WIDTH < 650 && foxX + FOX_WIDTH > 450) {
      if (weaponY <= SCREEN_TOP) {
        console.log("gg");
        setIsCollied(true);
      }
    }
    return () => {
      clearInterval(weaponId);
    };
  }, [foxX, weaponY, startShooting, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const boomImg = boomRef.current;
    let spriteId;
    if (isCollied) {
      // audio.play();

      if (spriteFrame < 6) {
        spriteId = setInterval(() => {
          setSpriteFrame((PS) => PS + 1);
          console.log(spriteFrame);
        }, 50);
        ctx.drawImage(
          boomImg,
          SPRITE_WIDTH * spriteFrame,
          0,
          SPRITE_WIDTH,
          SPRITE_HEIGHT,
          550,
          0,
          EXPLOSION_WIDTH,
          EXPLOSION_HEIGHT
        );
      }
    }
    return () => {
      clearInterval(spriteId);
    };
  }, [spriteFrame, isCollied]);

  return (
    <>
      <StyledCanvas ref={canvasRef}></StyledCanvas>

      <img ref={foxRef} src={player} alt="" style={{ display: "none" }} />
      <img ref={weaponRef} src={player} alt="" style={{ display: "none" }} />
      <img ref={boomRef} src={boom} alt="" style={{ display: "none" }} />

      <StyledBtn onClick={handleShooting}> shoot </StyledBtn>
      <Button variant="text" color="primary" onClick={toggleStart}>
        {"start game"}
      </Button>
    </>
  );
};

export default Canvas1;

const StyledCanvas = styled.canvas`
  background-color: peachpuff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledBtn = styled.button`
  padding: 1rem 2rem;
  background-color: white;
  position: absolute;
  right: 20%;
  bottom: 15%;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.25);
`;
