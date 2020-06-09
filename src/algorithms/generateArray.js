// import SimplexNoise from "simplex-noise";

export default function generateArray(n, type) {
  let a = [];
  switch (type) {
    case "random":
      
      a = generateRandomArray(n)
      break;
    case "unique":
      a = generateUniqueRandomArray(n)
      break;
    default:
      a = generateRandomArray(n);
      break;
  }

  a[a.length-1] = 10;
  return a;
}

function generateUniqueRandomArray(n) {
  //create an array with n elements from 0 to n
  const a = Array(n)
    .fill()
    .map((x, i) => i + 10);
  //shuffle them
  for (let i = a.length - 1; i > 0; i--) {
    //random number (0 to 1) times index + 1
    const j = Math.floor(Math.random() * (i + 1));
    //exchange elements
    [a[i], a[j]] = [a[j], a[i]];
  }


  return a;
}

function generateRandomArray(n) {
  return Array.from({length: n}, () => Math.floor(Math.random() * n) + 10);
}

// function generateSinWave() {

// }

// function generateSimplexNoise() {}
