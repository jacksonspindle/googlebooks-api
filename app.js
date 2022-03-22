import * as THREE from "../node_modules/three/build/three.module.js"


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x554090)


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );



// cube.rotation.x = 20


camera.position.z = 2;
camera.position.x = -.7;


console.log(scene)





// GOOGLE BOOKS

google.books.load();

function initialize() {
  
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('ISBN:0738531367')

  $('#viewerCanvas').css({"width": "500px", "height": "700px", "position": "absolute"})
  console.log(viewer)
}


google.books.setOnLoadCallback(initialize);









var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=isbn:0738531367";


$.getJSON(googleAPI, function (response) {
    console.log(response.items);
    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.text should have the HTML entities escaped.
        // document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;

        var bookCover = item.volumeInfo.imageLinks.thumbnail
      
        $('#content').append(`<img src='${bookCover}'></img>`)

        console.log(bookCover)
        const textureLoader = new THREE.TextureLoader()
        // textureLoader.crossOrigin = "Anonymous"
        textureLoader.setCrossOrigin('anonymous')
      

        const thisisatest = textureLoader.load('https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg')


        const bookCoverTexture = textureLoader.load(thisisatest)

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { map: thisisatest } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        
            // cube.rotation.y -= .01;
        
        }
        animate();

      }
});

