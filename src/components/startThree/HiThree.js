import * as THREE from 'three'
import React, { useEffect, useRef } from 'react';

export function HiThree() {
    const ref = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)

        if (ref.current) {
            ref.current.appendChild(renderer.domElement)

            const geometry = new THREE.BoxGeometry()
            const material = new THREE.MeshBasicMaterial({color: 0x00ff00}) 

            const cube = new THREE.Mesh(geometry, material)

            scene.add(cube)

            camera.position.z = 5

            function animate() {
                renderer.render(scene, camera)
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                requestAnimationFrame(animate)
            }

            animate()
        }

    }, [])
    return <div ref={ref}/>
}