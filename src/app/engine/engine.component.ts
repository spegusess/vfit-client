import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { AmbientLight, PointLight } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent implements OnInit {

  constructor() {
  }

  //@ViewChild('rendererContainer') canvas: ElementRef;
  //canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('rendererContainer') canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(12, 622 / 516, 0.1, 1000);
    //const canvas = document.getElementById("rendererContainer");

    const renderer = new THREE.WebGLRenderer({
      //canvas: canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(622, 516);

    document.body.appendChild(renderer.domElement); //render content on page

    //this.canvas.nativeElement(renderer.domElement);
    //this.canvas.nativeElement.querySelector('#rendererContainer');

    /*const textureloader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    const texture = new THREE.TextureLoader().load('/assets/Textures/Shirt_Texture_01.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    var texture = textureLoader.load('/assets/Textures/Shirt_Texture_01.png');
    */

    //let material = new THREE.MeshBasicMaterial({ map: textureLoader.load('/assets/Textures/Shirt_Texture_01.png') });

    //const dracoLoader = new DRACOLoader();
    //dracoLoader.setDecoderPath('js/libs/draco/gltf/');

    const loader = new GLTFLoader();

    let modelLoader = new THREE.TextureLoader().load('./assets/Textures/Shirt_Texture_01.png');
    loader.load('./assets/Models/Shirt01.glb', (gltf) => {
      let model = gltf.scene;
      model.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.map = modelLoader;
        }
      });
      //scene.add(model);
      //scene.background = new THREE.Color(0x777777);
      scene.add(gltf.scene);
      model.position.set(0, -1.35, 0);
      modelLoader.repeat.set(1, 1); //scaling texture
      modelLoader.needsUpdate = true;
    });


    //const tdmodel: any = loader.load('assets/Models/Shirt01.glb', function (gltf) {
      //var model = gltf.scene;

      //const material = new THREE.MeshBasicMaterial({ map: texture });
      //const mesh = new THREE.Mesh(model, material);
      //mesh.material.map = THREE.ImageUtils.loadTexture('/assets/Textures/Shirt_Texture_01.png');
      //scene.add(mesh);
      //model.name = 'shirt';

      /*
      scene.background = new THREE.Color(0x777777);
      scene.add(gltf.scene);
      model.position.set(0, -1.35, 0);
      */

      // const texture = new THREE.TextureLoader().load('/assets/Textures/Shirt_Texture_01.png');
      // texture.flipY = false;
      // const material = new THREE.MeshBasicMaterial({ map: texture });
      // const mesh = new THREE.Mesh(model, material);
      // scene.add(mesh);

      /*model.traverse((o) => {
        if (o.isMesh) {
          note: for a multi-material mesh, `o.material` may be an array,
          in which case you'd need to set `.map` on each value.
          o.material.map = texture;
        }
      });

      const model = gltf.scene.children[0];
      const model = gltf.scene;
      let model2 = gltf.scene;
      let part = model.getObjectByName('Shirt01')


      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/Textures/Shirt_Texture_01.png')
      });

      part.material = new THREE.MeshStandardMaterial({
        color: 0xff4400, metalness: 1.0, roughness: 0.2, name: 'orange'
      })


      textureLoader.crossOrigin = true;
      textureLoader.load('/assets/Textures/Shirt_Texture_01.png', function (texture) {
        console.log("TEXTURE LOADED", texture);
        texture.anisotropy = 16
        var material = new THREE.MeshPhongMaterial({ map: texture, opacity: 1, transparent: true });

      });
      */
/*
    },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
      console.error(error);
    });
*/
    // const texture = new THREE.TextureLoader().load('/assets/Textures/Shirt_Texture_01.png');
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // const mesh = new THREE.Mesh(tdmodel.model, material);
    // scene.add(mesh);


    camera.position.z = 4;

    const controls = new OrbitControls(camera, renderer.domElement);
    const pointLight = new THREE.PointLight(0xffffff)
    const pointLight2 = new THREE.PointLight(0xffffff)
    pointLight.position.set(25, 25, 25)
    pointLight2.position.set(-25, 25, -35)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, pointLight2, ambientLight)

    //const lightHelper = new THREE.PointLightHelper(pointLight);
    //const gridHelper = new THREE.GridHelper(200, 50)
    //scene.add(lightHelper, gridHelper)

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      controls.update();
    }
    animate();

  }
}

/*
    @ViewChild('canvas', { static: true })
      @ViewChild('rendererContainer', null) rendererContainer: ElementRef;
      @ViewChild('rendererContainer', null) canvas: ElementRef;
      @ViewChild('rendererContainer', { static: true })
      canvas: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const canvas = new ElementRef<HTMLCanvasElement>;
    const canvas: ElementRef<HTMLCanvasElement> = document.querySelector('#rendererContainer');
    const canvas: ElementRef<HTMLCanvasElement> = document.body.appendChild(renderer.domElement);
      canvas: document.querySelector('#rendererContainer'),
      canvas: this.canvas.nativeElement.appendChild('#rendererContainer'),
    @ViewChild('rendererContainer') renderContainer: ElementRef<HTMLElement>;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    document.getElementsByClassName('engine-wrapper').appendChild(renderer.domElement)
    rendererContainer.appendChild(renderer.domElement);
    getElementsById('rendererContainer').appendChild(renderer.domElement);
    this.canvas.nativeElement.appendChild('#rendererContainer'),
*/