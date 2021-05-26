import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from '../../loaders/GLTFLoader'

export function LoadModel () {
    const ref = useRef()
    useEffect(() => {
        let model;
        let count = 0;
        let targetRotation = 0;
        let targetRotationOnPointerDown = 0;

        let pointerX = 0;
        let pointerXOnPointerDown = 0;

        let windowHalfX = window.innerWidth / 2;

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio( window.devicePixelRatio );

        scene.background = new THREE.Color(0xffffff)
        camera.position.set( -20, 10, 30 );
        camera.lookAt(-10, 10, 10);

        renderer.setSize(window.innerWidth, window.innerHeight)

        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.225 );
        dirLight.position.set( 1, 1, 1 ).normalize();
        scene.add( dirLight );

        const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
        pointLight.position.set( 10, 100, 90 );
        scene.add( pointLight );

        const render = () => {
            model.rotation.y = ( targetRotation -  model.rotation.y ) * 0.5;
            renderer.clear();
            renderer.render(scene, camera)

            count += 1
        }

        const animate = () => {

            requestAnimationFrame( animate );

            render();
        }

        function onPointerDown( event ) {

            if ( event.isPrimary === false ) return;

            pointerXOnPointerDown = event.clientX - windowHalfX;
            targetRotationOnPointerDown = targetRotation;

            document.addEventListener( 'pointermove', onPointerMove );
            document.addEventListener( 'pointerup', onPointerUp );

        }

        function onPointerMove( event ) {

            if ( event.isPrimary === false ) return;

            pointerX = event.clientX - windowHalfX;

            targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02;

        }

        function onPointerUp(event) {

            if ( event.isPrimary === false ) return;

            document.removeEventListener( 'pointermove', onPointerMove );
            document.removeEventListener( 'pointerup', onPointerUp );

        } 

        if (ref.current) {
            ref.current.appendChild(renderer.domElement)

            ref.current.addEventListener( 'pointerdown', onPointerDown );

            const loader = new GLTFLoader();

            loader.load('/models/girl/scene.gltf', function (gltf) {
                model = gltf.scene
                model.position.set( 0, 10, 0 );
                scene.add(model)

                animate()
            }, undefined, function(e) {
                console.error( e );
            })
        }

    }, [])
    return <div ref={ref}/>
}