import React, { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar.jsx";
import NavItem from "./components/NavItem.jsx";
import DropdownMenu from "./components/DropdownMenu.jsx";
// import {DropdownItem} from "./components/DropdownMenu.jsx";
import "./css/graphView.css";
import SortingVisualizer from "./components/SortingVisualizer";
import generateArray from "./algorithms/generateArray";
import insertionSort from "./algorithms/insertionSort";
import mergeSort from "./algorithms/mergeSort";
import heapSort from "./algorithms/heapSort";
import quickSort from "./algorithms/quickSort";
import {ReactComponent as DownIcon} from './icons/down.svg'
import {ReactComponent as PlayIcon} from './icons/play.svg'
import {ReactComponent as ResetIcon} from './icons/reset.svg'

function App() {
  const [array, setArray] = useState(generateArray(100, "random"));
  const [sortingAlg, setSortingAlg] = useState("Insertion");
  const [arrayType, setArrayType] = useState("random");
  const [arraySize, setArraySize] = useState(100);
  const [heightScaling, setHeightScaling] = useState(1);
  const [isSorted, setIsSorted] = useState(false);

  const algorithms = {
    Insertion: insertionSort,
    Merge: mergeSort,
    Heap: heapSort,
    Quick: quickSort
  };

 
  const init = (algLabel = "Insertion", arrayType, size) => {
    const a = generateArray(size, arrayType);
    setArray(a);
    setSortingAlg(algLabel)
    setIsSorted(false);
  };

  const updateSorting = (sorting) => {

    resetTimeouts()
    init(sorting, arrayType, arraySize);
  }

  const updateArray = (type) => {
    resetTimeouts();
    setArrayType(type);
    init(sortingAlg, type, arraySize);
  }

  const updateArraySize = (size) => {
    resetTimeouts();
    setArraySize(size);
    init(sortingAlg, arrayType, size);
  }

  const resetArray = () => {
    resetTimeouts();
    init(sortingAlg, arrayType, arraySize);
    
  }


  const sortArray = (algorithm) => {
    resetTimeouts();
    
    if (isSorted) {
      console.log("Already sorrted!!")
      const a = generateArray(arraySize, arrayType);
      setArray(a);
      const sortedArray = algorithm([...a], heightScaling);
      setArray(sortedArray);
    } else {
      const sortedArray = algorithm([...array], heightScaling);
      setIsSorted(true);
    }
    
  };

  const updateHeightScaling = (scaling) => {
    resetTimeouts();
    setHeightScaling(scaling);
    setIsSorted(false);
  }

  const resetTimeouts = () => {
    var id = window.setTimeout(function() {}, 0);
    let j = 0;
    while (id--) {
      j++;
     window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    if (j > 0) {
      const arrayBars = document.getElementsByClassName('array-bar')
      for (let i = 0; i < arrayBars.length; i ++) {
        arrayBars[i].style.background = "linear-gradient(0deg,rgba(1, 2, 27, 1) 0%,rgba(17, 100, 102, 1) 100%)";
      }

    }
    


  }


  return (
    <>
      <NavBar title={sortingAlg}>
       
         <a //RESET
            href="#"
            className="navButtonContainer"
            onClick={resetArray}          >
            <span className="icon-button">{<ResetIcon/>}</span>
          </a>

        <a //PLAY 
            href="#"
            className="navButtonContainer"
            onClick={() => sortArray(algorithms[sortingAlg])}
          >
            <span className="icon-button">{<PlayIcon/>}</span>
          </a>

        <NavItem icon={<DownIcon/>}>
          <DropdownMenu updateArrayType={(updateArray)} updateSorting={(updateSorting)} updateArraySize={updateArraySize} size={arraySize}></DropdownMenu>
        </NavItem>
        {/* <button>GenerateRandomArray</button> */}
      </NavBar>
      <div className="graph-view">
        <SortingVisualizer array={array} didUpdateScaling={updateHeightScaling} init={init}></SortingVisualizer>
      </div>
    </>
  );
}

export default App;
