
const timePerSwap = 20;
let nSwaps = 1;
module.exports = function insertionSort(a) {

  
  nSwaps = 1;
  
  for (let j = 1; j < a.length; j++) {
    //for the length of the array starting at the second item
    const key = a[j];
    //pick our element to examine, hold it for 100ms

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");

      let i = j - 1; // i is index before j

      while (i >= 0 && a[i] > key) {
        //pick element before n elements before j, hold it for 10ms
        // setTimeout(, k * 100);
        swapHeights(i, j, arrayBars);
     

        a[i + 1] = a[i]; //move the element

        i = i - 1;
      }
     
      a[i + 1] = key;
    });
  }
  
  return a;
};

function swapHeights(i, j, arrayBars) {
  
  nSwaps++;
  setTimeout(() => {
  
    if (j === arrayBars.length - 1) {
      setTimeout(() => {
        arrayBars[j].style.background = "linear-gradient(0deg, rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)";
      }, arrayBars.length * timePerSwap)
    }
    arrayBars[j].style.background = "#d1e8e2";

    const height = arrayBars[i].style.height;
    const margin = arrayBars[i].style.marginTop;
    arrayBars[i].style.height = arrayBars[i + 1].style.height;
    arrayBars[i].style.marginTop = arrayBars[i + 1].style.marginTop;

    arrayBars[i].style.background = "#ffcb9a";

    arrayBars[i + 1].style.height = height;
    arrayBars[i + 1].style.marginTop = margin; 
    if (i + 1 !== j) arrayBars[i + 1].style.background = "#ffcb9a";

    if (i + 1 < arrayBars.length){
      setTimeout(resetColor, timePerSwap * 2, i, arrayBars)
    } else {
      setTimeout(resetColor, timePerSwap * 2, i, arrayBars, false)
    }
    
  }, nSwaps * timePerSwap);
}

function resetColor(i, arrayBars, setNext=true) {

  if (setNext) {
    arrayBars[i + 1].style.background =
          "linear-gradient(0deg, rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)";
  }
  
  arrayBars[i].style.background =
          "linear-gradient(0deg, rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)";
}

