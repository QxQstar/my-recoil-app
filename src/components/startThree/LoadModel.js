import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from '../../loaders/GLTFLoader'

export function LoadModel () {
    const ref = useRef()
    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio( window.devicePixelRatio );

        scene.background = new THREE.Color(0xffffff)
        camera.position.set( 0, 0, 30 );
        camera.lookAt(0, 0, 0);

        renderer.setSize(window.innerWidth, window.innerHeight)

        if (ref.current) {
            ref.current.appendChild(renderer.domElement)

            const loader = new GLTFLoader();

            loader.load('/models/girl/scene.gltf', function (gltf) {
                const model = gltf.scene
                model.position.set( 0, -10, 0 );
                model.rotation.set(0,-1.4,0)
                scene.add(model)

                const dirLight = new THREE.DirectionalLight( 0xffffff, 0.225 );
				dirLight.position.set( 1, 1, 1 ).normalize();
				scene.add( dirLight );

				const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
				pointLight.position.set( 10, 100, 90 );
				scene.add( pointLight );

                renderer.render(scene, camera)
            }, undefined, function(e) {
                console.error( e );
            })
        }

    }, [])
    return <div ref={ref}/>
}