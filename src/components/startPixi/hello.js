import * as PIXI from 'pixi.js'

export default function PixiHi() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
  
      PIXI.utils.sayHello(type)
}