import React, { useState } from 'react'
import {Rnd} from 'react-rnd'

export function ReactRndDemo() {
    const [size, setSize] = useState({width: 100, height: 30})
    const [position, setPosition] = useState({x: 10, y: 10})
    const onDragStop = ( e, data) => {
        setPosition({
            x: data.x,
            y: data.y
        })
    }
    const onResizeStop = (e, data, ref, delta, position) => {
        setSize({
            width: ref.style.width,
            height: ref.style.height,
            
        })
        setPosition({...position})
    }
    return (
        <div style={{height: '300px'}}>
            <Rnd
                bounds="parent"
                className="my-rnd"
                size={size}
                position={position}
                lockAspectRatio={true}
                resizeHandleStyles={{right: {background: 'blue'}}}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                style={{opacity: 0.5}}
            >
                <div style={{background: 'red'}}>我可以被移动</div>
            </Rnd>
        </div>
    )
}