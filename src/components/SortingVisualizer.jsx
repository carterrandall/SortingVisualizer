import React, { useState, useEffect } from "react";
import "../css/SortingVisualizer.css";
import userWindowDimensions from '../helpers/getWindowDimensions';

const SortingVisualizer = (props) => {

  const [data, setData] = useState({
    array: [],
    heightScaling: 0,
    barWidth: 0
  });

  const [currentHeight, setCurrentHeight] = useState(0)

  
  const { height, width } = userWindowDimensions();

  useEffect(() => {
  

      if (data.array !== props.array || currentHeight !== height) {

        setCurrentHeight(height);

        updateData(props.array);
      }

  })


  function updateData(array) {
    
    const nBars = array.length;
    if (nBars === 0) return;
    console.log(width, nBars)
    // const spaceW = (nBars/ width) 
    const spacing = 2 * nBars // is the amount of spacing
    
    let w = (100/nBars);

    console.log(w, w*100, "W")
    //what is the width taken up by spacing
    //space = (nBars-2 * 2) pixels, (nBars-2*2) / w * 100
  
    const maxValue = nBars + 10;
    const scaling = (height - 60) / maxValue;

    setData({array: array, heightScaling: scaling, barWidth: w});

  
    props.didUpdateScaling(scaling); //used only for merge sort because merge doesint swap heights but overwrites them in a reference array.
  }

 

  return ( <>
    <div className="array-container">
      {data.array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            height: value * data.heightScaling,
            marginTop: height - value * data.heightScaling - 60,
            width: `${data.barWidth}%`,
          }}
        ></div>
      ))}
    </div>
  </> );
}
 
export default SortingVisualizer;

