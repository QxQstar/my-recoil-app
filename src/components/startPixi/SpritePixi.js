import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js'

import { keyboard } from '../../utils';

export default function SpritePixi() {
    const ref = useRef(null)
    const back = useRef(false);

    const left = keyboard(37);
    const up = keyboard(38);
    const right = keyboard(39);
    const down = keyboard(40);

    const setFullScren = function (app) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    const setup = (app) => {
        const sheet = PIXI.loader.resources["/xuebi.json"];
        const textures = sheet.textures

        drawBlue(app, textures)
        drawCloud(app, textures)
    }

    const drawBlue = (app, textures) => {
        const blue = new PIXI.Sprite(textures['ico-blue-big.png'])
        blue.position.set(10, app.view.height - blue.height)
        app.stage.addChild(blue)

        blueMove(blue, app)
    }

    const blueMove = (blue) => {
        left.press = () => {
            blue.x -= 10;
        }

        right.press = () => {
            blue.x += 10;
        }

        up.press = () => {
            blue.y -= 20;
        }

        up.release = () => {
            blue.y += 20;
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const drawCloud = (app, textures) => {
        for (let i = 0; i < 10; i++) {
            const cloud = new PIXI.Sprite(textures['cloud_4.png'])
            cloud.scale.set(Math.random())
            cloud.position.set(randomInt(0, app.view.width - cloud.width), randomInt(0, app.view.height / 3))
            app.stage.addChild(cloud)

            app.ticker.add(() => {
                cloudLoop(cloud, app)
            })
        }
    }
    const cloudLoop = (cloud, app) => {
        const newX = cloud.x + 1 
        if (newX > app.view.width) {
            cloud.x = -1 * cloud.width;
        } else {
            cloud.x = newX
        }
    }
    useEffect(() => {
        const app = new PIXI.Application()
        app.renderer.backgroundColor = 0x061639;
        setFullScren(app)
        if (ref.current) {
            PIXI.loader
            .add('/xuebi.json')
            .load(() => {
                setup(app);
            })
            ref.current.appendChild(app.view);
        }
    }, []);
    return <div ref={ref}></div>
}