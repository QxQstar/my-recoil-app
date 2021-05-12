import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js'

export default function SpriteGroup() {
    const ref = useRef(null);

    function setFullScren(app) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    function setup(app) {
        const sheet = PIXI.loader.resources["/xuebi.json"];
        const textures = sheet.textures

        const biscuit = new PIXI.Sprite(textures['biscuit.png'])
        biscuit.position.set(10);

        const blue = new PIXI.Sprite(textures['ico-blue-big.png']) 
        // blue.position.set(50);

        const container = new PIXI.particles.ParticleContainer()
        container.addChild(biscuit)
        // container.addChild(blue);
        
        container.position.set(100)
        blue.position.set(50);
        
        app.stage.addChild(container)
        app.stage.addChild(blue)
        console.log(blue.toLocal(blue.position, biscuit).x)
    }

    useEffect(() => {
        const app = new PIXI.Application();
        app.renderer.backgroundColor = 0x061639;
        setFullScren(app)

        if (ref.current) {
            PIXI.loader
            .add('/xuebi.json')
            .load(() => {
                setup(app)
            })
            ref.current.appendChild(app.view);
        }
    }, [])

    return <div ref={ref}/>
}