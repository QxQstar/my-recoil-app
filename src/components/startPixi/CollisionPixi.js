import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js'

import { keyboard } from '../../utils';

export default function CollisionPixi() {
    const ref = useRef(null)
    const messageRef = useRef(null)
    const boxRef = useRef(null)
    const blueReg = useRef(null)
    const appRef = useRef(null);

    const left = keyboard(37);
    const up = keyboard(38);
    const right = keyboard(39);
    const down = keyboard(40)

    left.press = () => {
        if (blueReg.current) {
            blueReg.current.x -= 20;

            hitTestRectangle(boxRef.current, blueReg.current)
        }
    }

    up.press = () => {
        if (blueReg.current) {
            blueReg.current.y -= 20;

            hitTestRectangle(boxRef.current, blueReg.current)
        }
    }

    down.press = () => {
        if (blueReg.current) {
            blueReg.current.y += 20;

            hitTestRectangle(boxRef.current, blueReg.current)
        }
    }

    right.press = () => {
        if (blueReg.current) {
            blueReg.current.x += 20;

            hitTestRectangle(boxRef.current, blueReg.current)
        }
    }

    function setFullScren(app) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    function hitTestRectangle(box, blue) {
        const app = appRef.current;

        const boxCenterX = app.view.width / 2 - 50;
        const boxCenterY = app.view.height / 2 - 50;
        const blueCenterX = blue.x + blue.width / 2;
        const blueCenterY = blue.y + blue.height / 2;

        if (Math.abs(boxCenterX - blueCenterX) < box.width / 2 + blue.width / 2
        && Math.abs(boxCenterY - blueCenterY) < box.height / 2 + blue.height / 2
        ) {

            box.tint = 0xff3300
            messageRef.current.text = '击中了。。。'
        } else {
            box.tint = 0x061639;
            messageRef.current.text = '没有击中...'
        }
    }

    function drawMessage(app) {
        const message = new PIXI.Text('没有击中...')
        message.style = {fill: "white", font: "26px PetMe64"};
        message.position.set(20)

        app.stage.addChild(message);

        messageRef.current = message
    }

    function drawBox(app) {
        const graphics = new PIXI.Graphics()
        graphics.beginFill(0x1AF988)
        graphics.drawRect(app.view.width / 2 - 50, app.view.height / 2 - 50, 100,100)

        app.stage.addChild(graphics);

        boxRef.current = graphics;
    }

    function drawBlue(app, textures) {
        const blue = new PIXI.Sprite(textures['ico-blue-big.png'])
        blue.scale.set(0.5)
        blue.position.set(10, 50)

        app.stage.addChild(blue)

        blueReg.current = blue;
    }

    function setup(app) {
        const sheet = PIXI.loader.resources["/xuebi.json"];
        const textures = sheet.textures
        drawBlue(app, textures)
    }

    useEffect(() => {
        const app = new PIXI.Application();
        appRef.current = app;

        app.renderer.backgroundColor = 0x061639;
        setFullScren(app)  
        
        if (ref.current) {
            ref.current.appendChild(app.view);
            drawMessage(app)
            drawBox(app)
            PIXI.loader
            .add('/xuebi.json')
            .load(() => setup(app))
        }
    }, [])

    return <div ref={ref}/>
}