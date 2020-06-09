let timeToWait = 0;
module.exports = function animateMergeSort(array, heightScaling) {
  timeToWait = 0;
  if (array.length === 1) return;
  const animations = [[], []];

  mergeSort(array, 0, array.length - 1, animations);

  animate(animations, heightScaling);
};

function mergeSort(array, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const middleIdx = Math.floor((endIdx + startIdx) / 2);

    mergeSort(array, startIdx, middleIdx, animations);
    mergeSort(array, middleIdx + 1, endIdx, animations);
    merge(array, startIdx, middleIdx, endIdx, animations);
  }
}

function merge(array, startIdx, middleIdx, endIdx, animations) {


  const leftSide = [];
  const rightSide = [];
  const leftIndeces = [];
  const rightIndeces = [];

  for (let i = startIdx; i <= middleIdx; i++) {
    leftSide.push(array[i]);
    leftIndeces.push(i);
  }

  for (let j = middleIdx + 1; j <= endIdx; j++) {
    rightSide.push(array[j]);
    rightIndeces.push(j);
  }
  animations[0].push([leftIndeces, rightIndeces]);

  leftSide.push(Number.POSITIVE_INFINITY);
  rightSide.push(Number.POSITIVE_INFINITY);

  let i = 0;
  let j = 0;

  const heightSwaps = [];
  //do the sorting
  for (let k = startIdx; k <= endIdx; k++) {
    //comparing leftSide i and right side j //need their indeces in the original array
    //if the card in the left side of the pile is smaller

    if (leftSide[i] <= rightSide[j]) {
      //im moving the element from the left pile to index k
      // console.log(array[k], leftSide[i])
      array[k] = leftSide[i];
      if (leftSide[i] !== Number.POSITIVE_INFINITY)
        heightSwaps.push([k, leftSide[i]]); //place it was moved to and new height
        // heightSwaps.push([k, arrayBars[startIdx + i].style.height])

      i = i + 1;
    } else {
      //place the card from the right into the pile
  
      array[k] = rightSide[j];
      if (rightSide[j] !== Number.POSITIVE_INFINITY)
        heightSwaps.push([k, rightSide[j]]); //place it was moved to and new height
        
        // heightSwaps.push([k, arrayBars[middleIdx + j].style.height]);

      j = j + 1;
    }


  }

  animations[1].push(heightSwaps);

  // console.log(heightSwaps, "heightswaps");
}


function animate(animations, heightScaling) {
  const timePerHeightSwap = 30;
  const arrayBars = document.getElementsByClassName("array-bar");
  // console.log(arrayBars);
  for (let i = 0; i < animations[0].length; i++) {
    //array of array with left side and right side indeces being merged
    const left = animations[0][i][0];
    const right = animations[0][i][1];

    const heightAnims = animations[1][i];
    const n = heightAnims.length;

    const prevTimeToWait = timeToWait;
    timeToWait += n * timePerHeightSwap;

    for (let j = 0; j < left.length; j++) {
      const idx = left[j];
      //set color to selected after the previous is done sweapping height
      setTimeout(changeColor, prevTimeToWait, arrayBars, idx, "#d9b08c");
      //set the color back after the current swaps are done
      setTimeout(
        changeColor,
        timeToWait,
        arrayBars,
        idx,
        "linear-gradient(0deg,rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)"
      );
    }

    for (let k = 0; k < right.length; k++) {
      const idx = right[k];
      setTimeout(changeColor, prevTimeToWait, arrayBars, idx, "#d1e8e2");
      setTimeout(
        changeColor,
        timeToWait,
        arrayBars,
        idx,
        "linear-gradient(0deg,rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)"
      );
    }

    for (let u = 0; u < heightAnims.length; u++) {
      const swap = heightAnims[u];
      setTimeout(
        changeHeights,
        prevTimeToWait + (u + 1) * timePerHeightSwap,
        arrayBars,
        swap[0],
        swap[1],
        heightScaling
      );
    }
  }
}

function changeColor(arrayBars, idx, color) {
  arrayBars[idx].style.background = color;
}

function changeHeights(arrayBars, k, h, heightScaling) { //rewiret this shiet to use the heights, not the value in the array.


  const marginChange =
    -h * heightScaling + parseInt(arrayBars[k].style.height.replace("px", ""));

  const newMargin =
    parseInt(arrayBars[k].style.marginTop.replace("px", "")) + marginChange;

  arrayBars[k].style.height = `${h * heightScaling}px`;
  arrayBars[k].style.marginTop = `${newMargin}px`;
}
