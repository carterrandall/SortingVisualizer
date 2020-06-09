const timePerSwap = 20;
let totalTime = 0; 
module.exports = function heapSort(array) {
  totalTime = 0;
  const heapSizes = []; 
  const animations = [];

  animations[0] = []; //initialize the animations for that heap
  heapSizes.push(array.length - 1); //put initial heap size
  buildMaxHeap(array, animations, heapSizes);

  for (let i = array.length - 1; i >= 1; i--) {
    
    const indeces = [0,i];
    const heights = [array[0], array[i]];

    [array[0], array[i]] = [array[i], array[0]];

    array.heapSize = array.heapSize - 1;

    heapSizes.push(array.heapSize);

    animations[heapSizes.length - 1] = [];
    animations[heapSizes.length - 1].push([indeces, heights]);

    maxHeapify(array, 0, animations, heapSizes);
  }    

  animate(heapSizes, animations);
  console.log("sorted", array)
  return array;
};

function buildMaxHeap(array, animations, heapSizes) {
  array.heapSize = array.length - 1; 
  for (let i = Math.floor(array.length - 1 / 2); i >= 0; i--) {
    maxHeapify(array, i, animations, heapSizes);
  }
}

function maxHeapify(array, i, animations, heapSizes) {
  // console.log("max heapify", i)
  const l = left(i); //2 *i
  const r = right(i);//2 *i + 1
  let largest; //declare largest 
  if (l <= array.heapSize && array[l] > array[i]) { //if the left is less than heap size and array at the l > arrat at i
    largest = l; //we found a new largest, l
  } else largest = i; //otherwise set largest to i
  if (r <= array.heapSize && array[r] > array[largest]) { //if r less than heapSize and array[r] > array[l] or array[i]
    largest = r; //largest at r
  }
  if (largest !== i) {
    //exchange A[i] with A[largest]
    const indeces = [i, largest];
    const heights = [array[i], array[largest]];

    [array[i], array[largest]] = [array[largest], array[i]];

    
    animations[heapSizes.length - 1].push([indeces, heights])
    // console.log("animations for heap", animations[heapSizes.length - 1], "Heap size", array.heapSize)

    maxHeapify(array, largest, animations, heapSizes);
  }
}


function left(i) {
  return 2 * i;
}

function right(i) {
  return 2 * i + 1;
}


function animate(heapSizes, animations) {
  
  const arrayBars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < heapSizes.length; i ++) {
    setTimeout(colorHeap, totalTime, arrayBars, heapSizes[i], animations[i])

    totalTime += timePerSwap * (animations[i].length + 1);
    
  }

  setTimeout(() => {
    const arrayBars = document.getElementsByClassName('array-bar')
    for (let i = 0; i < arrayBars.length; i ++) {
      arrayBars[i].style.background = 'linear-gradient(0deg,rgba(10, 20, 37, 1) 0%,rgba(17, 100, 102, 1) 100%)';
    }
  }, totalTime)

  
}


function colorHeap(arrayBars, heapSize, animation) {
  for (let i = 0; i < heapSize; i++) {
    arrayBars[i].style.background = "#ffcb9a"
  }
  for (let i = heapSize+1; i < arrayBars.length; i ++) {
    arrayBars[i].style.background = 'linear-gradient(0deg,rgba(10, 20, 37, 1) 0%,rgba(17, 100, 102, 1) 100%)';
  }

  swapHeights(animation, arrayBars)

}

function swapHeights(animation, arrayBars) {
  for (let j = 0; j < animation.length; j++) {
    // console.log(animations[j], "anim for heap")
  setTimeout(changeHeight, (j) * timePerSwap, animation[j], arrayBars)
  }
}




function changeHeight(animation, arrayBars) {
  // console.log(animation)
  


  const bar1 = arrayBars[animation[0][0]];
  const bar2 = arrayBars[animation[0][1]];

  setColor(bar1, bar2, "#d1e8e2");

  const m1 = bar1.style.marginTop;
  const m2 = bar2.style.marginTop;
  const h1 = bar1.style.height;
  const h2 = bar2.style.height;

  bar1.style.height = h2;
  bar1.style.marginTop = m2;
  bar2.style.height = h1;
  bar2.style.marginTop = m1;

  setTimeout(setColor, timePerSwap, bar1, bar2, "#ffcb9a");
}

function setColor(bar1, bar2, color) {

  bar1.style.background = color;
  bar2.style.background = color;
}