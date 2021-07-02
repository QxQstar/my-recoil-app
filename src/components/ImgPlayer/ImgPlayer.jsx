import VideoContext from 'videocontext'
import React, { useEffect } from 'react'

var combineDecription ={
    title:"Combine",
    description: "A basic effect which renders the input to the output, Typically used as a combine node for layering up media with alpha transparency.",
    vertexShader : `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);
            v_texCoord = a_texCoord;
        }`,
    fragmentShader : `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;
        varying float v_mix;
        void main(){
            vec4 color = texture2D(u_image, v_texCoord);
            gl_FragColor = color;
        }`,
    properties:{
        
    },
    inputs:["u_image"]
};

export function ImgPlayer() {

    useEffect(() => {
        const canvas = document.querySelector('canvas')
        var videoCtx = new VideoContext(canvas);
        var imageNode = videoCtx.image("/logo512.png");
        var logoNode = videoCtx.image("/logo192.png");

        var combineEffect = videoCtx.compositor(combineDecription);
        

        imageNode.start(0);
        imageNode.stop(2);
        logoNode.start(0)
        logoNode.stop(4);

        imageNode.connect(combineEffect);
        logoNode.connect(combineEffect)

        combineEffect.connect(videoCtx.destination);

        videoCtx.play();
    }, []);

    return <canvas width="580" height="580"/>
}