const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
   antialias: true,
   alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var ArToolkitSource = new THREEx.ArToolkitSource({
   sourceType : 'webcam',
});
ArToolkitSource.init(function(){
   setTimeout(function(){
      ArToolkitSource.onResizeElement();
      ArToolkitSource.copyElementSizeTo(renderer.domElement);
   }, 2000);
})

var ArToolkitSource = new THREEx.ArToolkitContext({
   cameraParametersUrl: 'data/camera_para.dat',
   detectionMode: 'color_and_matrix',
})
ArToolkitSource.init(function (){
   camera.projectionMatrix.copy( ArToolkitSource.getProjectionMatrix() );
})

// var ArMarkerControls = new THREEx.ArMarkerControls({
//    type : 'pattern',
//    patternUrl : 'data/patt.hiro',
//    changeMatrixMode: 'cameraTransformMatrix',
//    minConfidence: 0.6,
// })

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();