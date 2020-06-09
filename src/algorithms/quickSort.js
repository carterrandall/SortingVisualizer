const timePerHeightSwap = 30;
let totalTime = 0;

module.exports = function callQuickSort(array) {
  console.log("original array", array);
  totalTime = 0;
  
  const animations = []; //[[partition ranges, array of swaps for partition range]]

  const partitions = [];

  quickSort(array, 0, array.length - 1, animations, partitions);
  
  animate(animations, partitions);
  console.log("done animating")
  // return sorted;
};

function quickSort(array, p, r, animations, partitions) {
  if (p < r) {
    const q = partition(array, p, r, animations, partitions);

    quickSort(array, p, q - 1, animations, partitions);
    quickSort(array, q + 1, r, animations, partitions);
  } 
}

function partition(array, p, r, animations, partitions) {
  
  partitions.push([p,r]);
  animations[partitions.length - 1] = []; 
  
  const x = array[r];
  let i = p - 1;
  for (let j = p; j < r; j++) {
    
    if (array[j] <= x) {
      i++;
    
      const indeces = [i, j];
      const heights = [array[i], array[j]];
      
      [array[i], array[j]] = [array[j], array[i]];

       animations[partitions.length - 1].push([indeces, heights]);
    }
  }
  
  const indeces = [i + 1, r];
  const heights = [array[i + 1], array[r]];
  
  [array[i + 1], array[r]] = [array[r], array[i + 1]];
  animations[partitions.length - 1].push([indeces, heights])

  return i + 1;
}


function animate(animations, partitions) {
  
  const arrayBars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < partitions.length; i++) {
    
      setTimeout(colorPartition, totalTime, i, partitions[i], partitions[i-1], arrayBars, animations[i])
      
    
    totalTime += timePerHeightSwap * (animations[i].length + 1);

  }
  setTimeout(resetColor, totalTime, arrayBars);
}

function resetColor(arrayBars) {
  for (let i = 0; i < arrayBars.length; i ++) {
    arrayBars[i].style.background = 'linear-gradient(0deg,rgba(10, 20, 37, 1) 0%,rgba(17, 100, 102, 1) 100%)';
  }
}


function colorPartition(i, currentPartition, prevPartition, arrayBars, animations) {

  if (i != 0) {
    for (let k = prevPartition[0]; k <= prevPartition[1]; k ++) {
      arrayBars[k].style.background = 'linear-gradient(0deg,rgba(10, 20, 37, 1) 0%,rgba(17, 100, 102, 1) 100%)';
    }
  }

  for (let j = currentPartition[0]; j <= currentPartition[1]; j++) {
    arrayBars[j].style.background = '#d9b08c';
  }

  swapHeights(animations, arrayBars);
}

function swapHeights(animations, arrayBars) {

  for (let i = 0; i < animations.length; i++) {
    setTimeout(swap, i * timePerHeightSwap, animations[i], arrayBars);
 
  }
}

function swap(animation, arrayBars ) {
  
  const bar1 = arrayBars[animation[0][0]];
  const bar2 = arrayBars[animation[0][1]];
  const h1 = bar1.style.height;
  const h2 = bar2.style.height;
  const m1 = bar1.style.marginTop;
  const m2 = bar2.style.marginTop;
  bar1.style.height = h2; 
  bar1.style.marginTop = m2;
  bar2.style.height = h1; 
  bar2.style.marginTop = m1;

  setColor(bar1, bar2, "#d1e8e2");

  
  setTimeout(setColor, timePerHeightSwap, bar1, bar2, '#d9b08c');
  
}

function setColor(bar1, bar2, color) {

  bar1.style.background = color;
  bar2.style.background = color;
}
