let data = [
    {
        "Country":"Afghanistan",
        "Languages":"Pashto, Dari",
        "latitude":7.985532987395444,
        "longitude":-1.176162841316772,
        "Region":"GHANA",
        "Population":31056997,
        "Area_sq_mi":647500,
        "GPD_per_capita":700.0,
        "Climate":"1",
        "Title":"Ghana",
        "Description":"Yellow fever kills thousands in Africa every year. Oracle HMS is powering 5.8 million yellow fever vaccinations, plus nationwide COVID-19 vaccines."
    },
    {
        "Country":"Albania",
        "Languages":"Albanian",
        "latitude":-2.006916942050917,
        "longitude":29.906096640867712, 
        "Region":"RWANDA",
        "Population":3581655,
        "Area_sq_mi":28748,
        "GPD_per_capita":4500.0,
        "Climate":"3",
        "Title":"Rwanda",
        "Description":"Yellow fever kills thousands in Africa every year. Oracle HMS is powering 5.8 million yellow fever vaccinations, plus nationwide COVID-19 vaccines."
    },
];
let globeCanvas = document.getElementById('globe-canvas');
let globeCanvasClientRect = globeCanvas.getBoundingClientRect();
//THREEJS CODE

// CREATE scene where objects will be placed (kind of like a stage)
const scene = new THREE.Scene();

// CREATE camera to see objects (kind of like sitting in the audience)
const camera = new THREE.PerspectiveCamera(75, globeCanvas.offsetWidth / globeCanvas.offsetHeight, 0.1, 1000);

// CREATE renderer to display the created objects (kind of like the people who place the diferent sets on the stage)
const renderer = new THREE.WebGLRenderer({alpha: true});
scene.background = null;
renderer.setSize(globeCanvas.offsetWidth, globeCanvas.offsetHeight);
globeCanvas.appendChild(renderer.domElement);

// CREATE controls so that we can interact with the objects/have interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// CREATE raycaster for mouse interaction (clicks on pins)
const raycaster = new THREE.Raycaster();

// CREATE vector2 for mouse and mobile x,y coordinates
const mouse = new THREE.Vector2();
const touch = new THREE.Vector2();

/*
//TEST CODE (creates a gren cube on the scene)
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
*/

// CREATE earth
// Earthmap is used for the basic texture which has the various continents/countries/etc. on it
let earthMap = new THREE.TextureLoader().load('https://globe-images.vercel.app/earthmap4k.jpg');

// EarthBumpMap is used to give the texture some "depth" so it is more appealing on eyes and data visuals
let earthBumpMap = new THREE.TextureLoader().load('https://globe-images.vercel.app/earthbump4k.jpg');

// EarthSpecMap gives the earth some shininess to the environment, allowing reflectivity off of the lights
let earthSpecMap = new THREE.TextureLoader().load('https://globe-images.vercel.app/earthspec4k.jpg');

// Geometry is what the shape/size of the globe will be
let earthGeometry = new THREE.SphereGeometry( 10, 32, 32);

// Material is how the globe will look like
let earthMaterial = new THREE.MeshPhongMaterial({
    map: earthMap,
    bumpMap: earthBumpMap,
    bumpScale: 0.10,
    specularMap: earthSpecMap,
    specular: new THREE.Color('grey')
});

// Earth is the final product which ends up being rendered on scene, also is used as a grandparent for the points of interest
let earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Add the earth to scene
scene.add( earth );

// Add clouds to the earth object
let earthCloudGeo = new THREE.SphereGeometry(10, 32, 32);

// Add cloud texture
let earthCloudsTexture = new THREE.TextureLoader().load('https://globe-images.vercel.app/earthhiresclouds4K.jpg');

// Add cloud material
let earthMaterialClouds = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: earthCloudsTexture,
    transparent:true,
    opacity: 0.4
});

// Create final texture for clouds
let earthClouds = new THREE.Mesh(earthCloudGeo, earthMaterialClouds);

// Scale above the earth sphere mesh
earthClouds.scale.set( 1.015, 1.015, 1.015);

// Make child of the earth
earth.add( earthClouds );

// CREATE variable to store array of lights
let lights = [];

/**
 * @name createLights.
 * @desc CreateLights is a function which creates the lights and adds them to the scene.
 * @param scene scene - current scene where lights will be added. 
 */

function createLights(scene){
    lights[0] = new THREE.PointLight("#004d99", .5, 0);
    lights[1] = new THREE.PointLight("#004d99", .5, 0);
    lights[2] = new THREE.PointLight("#004d99", .7, 0);
    lights[3] = new THREE.AmbientLight("#ffffff");

    lights[0].position.set(200, 0, -400);
    lights[1].position.set(200, 200, 400);
    lights[2].position.set(-200, -200, -50);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);
}

/**
 * @name addSceneObjects.
 * @desc addSceneObjects adds the items to the scene
 */

function addSceneObjects(scene) {
    createLights(scene);
}

addSceneObjects(scene);

// Change position so we can see the objects
camera.position.z = 20;

// Disable control function, so users do not zoom too far in or pan away from center
controls.enableZoom = false;
controls.enablePan = false;
controls.update();

//Add event listeners so DOM knows what functions to use when objects/items are interacted with
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onWindowClick, false);

/**
 * @name onWindowResize.
 * @desc Makes the scene and whatever is inside it responsive.
 */

function onWindowResize() {
    camera.aspect = globeCanvas.offsetWidth / globeCanvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(globeCanvas.offsetWidth , globeCanvas.offsetHeight);
};

/**
 * @name onWindowClick.
 * @desc Listens for the mouse to intersect object and when clicked returns the data to the inner html.
 * @param event gets the clicked object.
 */

function onWindowClick(event) {
    event.preventDefault();
    mouse.x = ( ( event.clientX - globeCanvasClientRect.left ) / ( globeCanvasClientRect.right - globeCanvasClientRect.left ) ) * 2 - 1;
    mouse.y = - ( ( event.clientY - globeCanvasClientRect.top ) / ( globeCanvasClientRect.bottom - globeCanvasClientRect.top) ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(earthClouds.children);

    for (let i = 0; i < intersects.length; i++){
        console.log(intersects[0].object.userData.title);
        let customLabel = document.getElementById('custom-label');
        let cardTitle = document.getElementById('card-title');
        let cardText = document.getElementById('card-text');
        let cardImage = document.getElementById('card-image');
        let cardButton2 = document.getElementById('card-button-2');

        customLabel.style.display = 'none';
        cardTitle.innerHTML = intersects[0].object.userData.title;
        cardText.innerHTML = intersects[0].object.userData.description;
        cardImage.style.display = 'flex';
        cardButton2.style.display = 'flex';
    }
};


function animate() {
    requestAnimationFrame( animate );
    render();
    controls.update();
}

/**
 * @name render
 * @desc Updates camera renderer.
 */

function render() {
    renderer.render( scene, camera );
};

// Removes the points of interest freeing up memory and space to have better performance
function removeChildren(){
    let destroy = earthClouds.children.length;
    while(destroy--) {
        earthClouds.remove(earthClouds.children[destroy].material.dispose())
        earthClouds.remove(earthClouds.children[destroy].geometry.dispose())
        earthClouds.remove(earthClouds.children[destroy])
    }
};

/**
 * @name addCountryCoord.
 * @desc addCountryCoord creates and adds coordinates for the globe as pins.
 * @param earth scene - current scene where lights will be added. 
 */
function addCountryCoord(earth, country, language, latitude, longitude, color, region, population, area_sq_mi, gdp_per_capita, climate, title, description){
    // Code fragment: takes 2D coordinates and converts them to 3D.
    let pointOfInterest = new THREE.SphereGeometry(.1, 32, 32);
    let lat = latitude * (Math.PI/180);
    let lon = -longitude * (Math.PI/180);
    const radius = 10;
    const phi = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);
    // End of Code Fragment.

    let material = new THREE.MeshBasicMaterial({
        color:color
    });

    let mesh = new THREE.Mesh(
        pointOfInterest,
        material
    );

    mesh.position.set(
        Math.cos(lat) * Math.cos(lon) * radius,
        Math.sin(lat) * radius,
        Math.cos(lat) * Math.sin(lon) * radius
    );

    mesh.rotation.set(0.0, -lon, lat-Math.PI*0.5);

    mesh.userData.country = country;
    mesh.userData.language = language;
    mesh.userData.color = color;
    mesh.userData.region = region;
    mesh.userData.population = population;
    mesh.userData.area_sq_mi = area_sq_mi;
    mesh.userData.gdp_per_capita = gdp_per_capita;
    mesh.userData.climate = climate;
    mesh.userData.title = title;
    mesh.userData.description = description;

    earthClouds.add(mesh);
}

function changeToCountry(){
    removeChildren();
    for (let i = 0; i < data.length; i++){
        let region = data[i].Region;
        switch (region) {
            case 'GHANA':
                addCountryCoord(earth, data[i].Country, data[i].Languages, data[i].latitude, data[i].longitude, 'yellow', data[i].Region, data[i].Population, data[i].Area_sq_mi, data[i].GPD_per_capita, data[i].Climate, data[i].Title, data[i].Description);
                break;
            case 'RWANDA':
                addCountryCoord(earth, data[i].Country, data[i].Languages, data[i].latitude, data[i].longitude, 'orange', data[i].Region, data[i].Population, data[i].Area_sq_mi, data[i].GPD_per_capita, data[i].Climate, data[i].Title, data[i].Description);
                break;    
            default:
                break;
        }
    }
}

changeToCountry();
animate();