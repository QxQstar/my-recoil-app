import * as THREE from 'three'
import React, { useEffect, useRef} from 'react'


export function DrawLine() {
    const ref = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500)
        const renderer = new THREE.WebGLRenderer()

        scene.background = new THREE.Color(0xffffff)

        camera.position.set( 0, 400, 700 );
        camera.lookAt(0, 150, 0);

        renderer.setSize(window.innerWidth, window.innerHeight)
        

        if (ref.current) {
            ref.current.appendChild(renderer.domElement)
            const material = new THREE.LineBasicMaterial({color: 0x000000})

            const points = []
            points.push(new THREE.Vector3(500,200,0))
            points.push(new THREE.Vector3(-500,200,0))

            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            const line = new THREE.Line(geometry, material)

            scene.add(line)

            // load font
            const loader = new THREE.FontLoader();
            loader.load('/fonts/helvetiker_bold.typeface.json', function(font) {
                const textGeo = new THREE.TextGeometry( 'Hi Three.js', {
					font: font,
					size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelSegments: 5
				} );

                textGeo.center()

                const materials = [
					new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
					new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
				];
                
                const textMesh = new THREE.Mesh(textGeo, materials)

                textMesh.castShadow = true

                textMesh.position.set(0,300, 0)

                scene.add(textMesh)

                const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
				dirLight.position.set( 0, 0, 1 ).normalize();
				scene.add( dirLight );

				const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
				pointLight.position.set( 0, 100, 90 );
				scene.add( pointLight );

                renderer.render(scene, camera)
            })

            

        }
    }, [])
    return <div ref={ref}/>
}