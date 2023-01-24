import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import layer1 from "../layer-1.png";
import layer2 from "../layer-2.png";
import layer3 from "../layer-3.png";
import layer4 from "../layer-4.png";
import layer5 from "../layer-5.png";

const Canvas2 = () => {
  let canvas;
  // let ctx;

  const [ctx, setCtx] = useState("");
  const [imagesObject, setImagesObject] = useState([]);

  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 500;

  let gameSpeed = 5;
  let gameFrame = 0;

  const canvasRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);
  const layer5Ref = useRef(null);

  const [layer1Img, setLayer1Img] = useState();
  const [layer2Img, setLayer2Img] = useState();
  const [layer3Img, setLayer3Img] = useState();
  const [layer4Img, setLayer4Img] = useState();
  const [layer5Img, setLayer5Img] = useState();

  let x = 0;
  let x2 = 1667;
  const animate = () => {
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      drawBackground(ctx, layer1Img);
      drawBackground(ctx, layer2Img);
      drawBackground(ctx, layer3Img);
      drawBackground(ctx, layer4Img);
      drawBackground(ctx, layer5Img);

      if (x < -1667) x = 1667 + x2 - gameSpeed;
      else x -= gameSpeed;
      if (x2 < -1667) x2 = 1667 + x - gameSpeed;
      else x2 -= gameSpeed;

      requestAnimationFrame(animate);
    }
  };

  const drawBackground = (ctx, img) => {
    ctx.drawImage(img, x, 0);
    ctx.drawImage(img, x2, 0);
  };

  useEffect(() => {
    canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    setLayer1Img(layer1Ref.current);
    setLayer2Img(layer2Ref.current);
    setLayer3Img(layer3Ref.current);
    setLayer4Img(layer4Ref.current);
    setLayer5Img(layer5Ref.current);

    animate();
  }, [ctx, layer5Ref]);

  return (
    <StyledContainer>
      <StyledCanvas ref={canvasRef}></StyledCanvas>

      <img ref={layer1Ref} src={layer1} alt="" style={{ display: "none" }} />
      <img ref={layer2Ref} src={layer2} alt="" style={{ display: "none" }} />
      <img ref={layer3Ref} src={layer3} alt="" style={{ display: "none" }} />
      <img ref={layer4Ref} src={layer4} alt="" style={{ display: "none" }} />
      <img ref={layer5Ref} src={layer5} alt="" style={{ display: "none" }} />
    </StyledContainer>
  );
};

export default Canvas2;

const StyledContainer = styled.div`
  position: absolute;
  height: 400px;
  width: 800px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: solid 3px red;
`;

const StyledCanvas = styled.canvas`
  position: relative;
  padding-bottom: 2rem;
  border: solid 2px blue;
  width: 100%;
  height: 100%;
`;
