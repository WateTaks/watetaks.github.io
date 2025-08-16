// Thanks to Patt Vira for this first version!

let cols; 
let rows; 
let size = 50;
let arrows = []; // flow field
let xoff=0; let yoff=0; let zoff = 0;
let inc = 0.1;
let r = size/2;

// Particles array
let particles = [];
let num = 50;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');

  cols = floor(width/size);
  rows = floor(height/size);
  angleMode(DEGREES);
  
  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    for (let j = 0; j < rows; j++) {
      arrows[i][j] = createVector(0, 0);
    }
  }
  
  for(let i=0;i<num;i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
  background(18, 28, 34);
}

function draw() {
  background(18, 28, 34, 3);
  xoff = 0;

  for(let i=0;i<cols;i++) {
    yoff = 0;
    for(let j=0;j<rows;j++) {
      let angle=map(noise(xoff, yoff, zoff), 0, 1, 0, 360);
      
      arrows[i][j].set(cos(angle), sin(angle));
      
      yoff += inc;
    }
    
    xoff += inc;
  }
  
  zoff += 0.001;
  
  for(let i=0;i<num;i++) {
    particles[i].checkEdges();
    particles[i].direction(arrows); 
    particles[i].update();
    particles[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-calculate grid and re-initialize particles on resize
  setup(); 
}
