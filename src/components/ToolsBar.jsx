import Brush from '../model/tools/Brush'
import React, { useState } from 'react'
import FilledRect from '../model/tools/FilledRect'
import toolState from '../store/toolState'
import canvasState from "../store/canvasState";
import FilledCircle from '../model/tools/FilledCircle'
import Line from '../model/tools/Line'
import RoundedRect from '../model/tools/RoundedRect'
import Eraser from '../model/tools/Eraser'
import { CirclePicker } from 'react-color';
import Tooltip from './ToolTip';
import brush from "../assets/icons/brush.svg"
import rect from "../assets/icons/rect.svg"
import roundedRect from "../assets/icons/roundedRect.svg"
import circle from "../assets/icons/circle.svg"
import line from "../assets/icons/line.svg"
import eraser from "../assets/icons/eraser.svg"
import swatch from "../assets/icons/swatch.svg"
import undo from "../assets/icons/undo.svg"
import redo from "../assets/icons/redo.svg"
import bin from "../assets/icons/bin.svg"


const pastels = ["#F2C4DE", "#71B1D9", " #AED8F2", "#F2DEA2", "#F2CDC4", "#ABD3DB", "#C2E6DF", "#D1EBD8", "#E5F5DC", "#FFFFE1", "#B8C6D9", "#8596A6", " #F2D9D0", "#FFB6A3", "#F5D1C3", "#C4D7D1", "#F0BC68", "#5F9595"];

const ToolsBar = () => {
    const [colorPicker, setShow] = useState(false);

    const changeColor = (color) => {
        toolState.setStrokeColor(color.hex)
        toolState.setFillColor(color.hex)
    }

    const download = () => {
        const image = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = image
        a.download = canvasState.sessionId.concat(`${canvasState.username}`) + ".jpeg"
        a.click()
        a.remove()
    }

    const clearCanvas = () => {
        let ctx = canvasState.canvas.getContext('2d')
        ctx.fillStyle="#ffff"
        ctx.fillRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
    }

    return (
        <nav className='tool-navbar'>
            <div className="tools-wrapper" >
            <Tooltip text="Brush">
                <div className='single-tool' role="button" name="brush"
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.sessionId))}>
                  <img src={brush} alt="brush"/>
                </div>
                </Tooltip>
                <Tooltip text="rect">
                <div
                    className='single-tool' role="button" name="rect"
                    onClick={() => toolState.setTool(new FilledRect(canvasState.canvas, canvasState.sessionId))}>
                      <img src={rect} alt="rect"/>
                </div>
                </Tooltip>
                <Tooltip text="rounded rect">
                <div
                    className='single-tool' role="button" name="rounded rect"
                    onClick={() => toolState.setTool(new RoundedRect(canvasState.canvas, canvasState.sessionId))}>
                      <img src={roundedRect} alt="rounded rect"/>
                </div>
                </Tooltip>
                <Tooltip text="circle">
                <div className='single-tool' role="button" name="circle"
                    onClick={() => { toolState.setTool(new FilledCircle(canvasState.canvas, canvasState.sessionId)) }}>
                    <img src={circle} alt="circle"/>
                </div>
                </Tooltip>
                <Tooltip text="line">
                <div className='single-tool' role="button" name="line"
                    onClick={() => { toolState.setTool(new Line(canvasState.canvas, canvasState.sessionId)) }}>
                  <img alt='line' src={line}/>
                </div>
                </Tooltip>
                <Tooltip text="eraser">
                <div className='single-tool' role="button"
                    onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.sessionId))}>
                           <img alt='eraser' src={eraser}/>
                </div>
                </Tooltip>

                <Tooltip  text="pastel colors" >
                <div className='single-tool' role="button"
                    onClick={() => setShow(colorPicker => !colorPicker)}>
                 <img alt='swatch' src={swatch}/>
                 {colorPicker && <CirclePicker
                        className='custom-colorPicker'
                        circleSpacing={14}
                        circleSize={26}
                        colors={pastels}
                        onChange={changeColor}
                    />}
                </div>
                </Tooltip>
            </div>
            <div className='undo-redo-save'>
                <div className='single-tool' role="button"
                    onClick={() => canvasState.undo()}>
                           <img alt='undo' src={undo}/>                  
                </div>
                <div className='single-tool' role="button"
                    onClick={() => canvasState.redo()}>
                    <img alt='redo' src={redo}/>
                </div>
                <div className='single-tool' role="button"
                    onClick={() => clearCanvas()}>
                     <img alt='delete' src={bin}/>
                </div>
                <button className="toolbar-btn " onClick={() => download()}> Save </button>
            </div>
        </nav>
    )
}

export default ToolsBar
