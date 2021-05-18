import * as THREE from 'three'
import React, { useEffect, useRef} from 'react'

export function DrawLine() {
    const ref = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
        const renderer = new THREE.WebGLRenderer()

        camera.position.set(0,0,100)
        camera.lookAt(1,1,1);

        renderer.setSize(window.innerWidth, window.innerHeight)

        if (ref.current) {
            ref.current.appendChild(renderer.domElement)
            const material = new THREE.LineBasicMaterial({color: 0x0000ff})

            const points = []
            points.push(new THREE.Vector3(10,0,0))
            points.push(new THREE.Vector3(-1,0,0))

            points.push(new THREE.Vector3(0,10,0))

            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            const line = new THREE.Line(geometry, material)

            scene.add(line)

            renderer.render(scene, camera)

        }
    }, [])
    return <div ref={ref}/>
}