import * as PIXI from 'pixi.js'
import React, { useEffect, useRef } from 'react';

export default function PixiStage() {
    const ref = useRef(null);
    const setFullScren = (app) => {
        app.renderer.view.style.position = 'absolute'
        app.renderer.view.style.display = 'block'
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    const setup = (app) => {
        const logo = new PIXI.Sprite(PIXI.loader.resources['/logo512.png'].texture)
        logo.position.set(200,100);
        logo.scale.set(0.1)
        app.stage.addChild(logo);

        const log1 = new PIXI.Sprite(PIXI.loader.resources['/logo512.png'].texture)
        log1.position.set(500,100);
        log1.scale.set(0.1)
        log1.pivot.set(250)
        app.stage.addChild(log1);
    }
    const loadProgressHandler = (loader, resource) => {
        console.log('loading', loader.progress, resource.url)

    }
    useEffect(() => {
        const app = new PIXI.Application({
            width: 256, 
            height: 256,
        })
        app.renderer.backgroundColor = 0x061639;
        setFullScren(app);
        if (ref.current) {
            ref.current.appendChild(app.view);
            PIXI.loader
            .add(['/logo512.png','/logo192.png'])
            .on('progress', loadProgressHandler)
            .load(() => {
                console.log('setup')
                setup(app);
            })
        }
        return () => {
            app.destroy()
        }
    }, [])
    return <div ref={ref}></div>
}