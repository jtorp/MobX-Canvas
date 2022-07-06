import React, { useRef } from 'react'
import toolState from '../store/toolState';

const ToolSettingsBar = () => {
    const lineWidthRef = useRef()
    return (
        <nav className='settings-bar'>
            <ul>
                <li><span htmlFor="fill-color">
                    Fill color:
                </span>
                    <input type="color"
                        id="fill-color"
                        onChange={e => toolState.setFillColor(e.target.value)}
                    />
                </li>
                <li><span htmlFor="stroke-color">
                    Stroke color:
                </span>
                    <input type="color"
                        id="color-picker"
                        onChange={e => toolState.setStrokeColor(e.target.value)}
                    />
                </li>
                <li><span htmlFor="line-width">Line width:</span>
                    <input
                        ref={lineWidthRef}
                        onChange={(e) => toolState.setLineWidth(e.target.value)}
                        id="line-width"
                        type="range"
                        defaultValue={12} min={1} max={150} />
                </li>
                <li><span>Line cap:</span>
                    <select
                        id="line-cap"
                        onClick={(e) => toolState.setLineCap(e.target.value)}>
                        <option value="default" >
                            Line style </option>
                        <option value='round' >round</option>
                        <option value='square' >square</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default ToolSettingsBar;