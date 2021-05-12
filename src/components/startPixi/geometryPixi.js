import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js'

export default function GeometryPixi() {
    const ref = useRef(null)
    function setFullScren(app) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    function drawRect(app) {
        const graphics = new PIXI.Graphics({
            antialias: true
        });
        graphics.lineStyle(2, 0xFF3300)
        graphics.drawRect(1,10,200,100)
        graphics.endFill();

        app.stage.addChild(graphics)
    }

    function drawCricel(app) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF9900)
        graphics.drawCircle(300,300, 20)
        graphics.endFill()

        app.stage.addChild(graphics)
    }

    function drawEllipse(app) {
        const graphics = new PIXI.Graphics()
        graphics.beginFill(0x1AF988)
        graphics.drawEllipse(400,40,100,50)
        graphics.endFill()

        graphics.y = 100

        app.stage.addChild(graphics)
    }

    function drawLine(app) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x1af988);
        graphics.moveTo(200,100)
        graphics.lineTo(400,400)

        app.stage.addChild(graphics)
    }

    function drawText(app) {
        const message = new PIXI.Text('Hello Pixi!')
        message.position.set(app.view.width/2 - message.width / 2,app.view.height/2)
        message.style = {fill: "white", stroke: '#ff3300', strokeThickness: 4, font: "36px PetMe64"};
        app.stage.addChild(message)

    }

    useEffect(() => {
        const app = new PIXI.Application()
        app.renderer.backgroundColor = 0x061639;
        setFullScren(app)

        if(ref.current) {
            drawRect(app)
            drawCricel(app)
            drawEllipse(app)
            drawLine(app)
            drawText(app)
            ref.current.appendChild(app.view);
        }
    }, [])
    return <div ref={ref}/>
}