/* complex_program.js */

// This code demonstrates a complex program that generates a fractal pattern using the Mandelbrot Set algorithm

// Constants
const CANVAS_SIZE = 800;
const MAX_ITERATIONS = 1000;
const ZOOM_FACTOR = 1.5;
const PAN_FACTOR = 0.1;

// Initialize canvas and context
const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Function to map pixel coordinates to the complex plane
function mapToComplex(x, y) {
  const real = ((x - CANVAS_SIZE / 2) / CANVAS_SIZE) * ZOOM_FACTOR - PAN_FACTOR;
  const imag = ((y - CANVAS_SIZE / 2) / CANVAS_SIZE) * ZOOM_FACTOR - PAN_FACTOR;
  return { real, imag };
}

// Function to check if a complex number is in the Mandelbrot Set
function isInMandelbrotSet(c) {
  let z = { real: 0, imag: 0 };
  
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const squaredMagnitude = z.real * z.real + z.imag * z.imag;
    
    if (squaredMagnitude > 4) {
      return false;
    }
    
    z = {
      real: z.real * z.real - z.imag * z.imag + c.real,
      imag: 2 * z.real * z.imag + c.imag
    };
  }
  
  return true;
}

// Function to generate the Mandelbrot Set and color the pixels
function generateMandelbrotSet() {
  for (let x = 0; x < CANVAS_SIZE; x++) {
    for (let y = 0; y < CANVAS_SIZE; y++) {
      const c = mapToComplex(x, y);
      const isInsideSet = isInMandelbrotSet(c);
      
      if (isInsideSet) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 1, 1);
      } else {
        const hue = (c.real + c.imag) * 50;
        const saturation = 100;
        const lightness = (c.real + c.imag) * 30;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Generate the Mandelbrot Set
generateMandelbrotSet();