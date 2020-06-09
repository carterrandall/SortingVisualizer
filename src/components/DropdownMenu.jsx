import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../css/navMenu.css";
import Slider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
import {ReactComponent as ArrayIcon} from '../icons/array.svg';
import {ReactComponent as AlgIcon} from '../icons/algorithms.svg';
import {ReactComponent as BackIcon} from '../icons/back.svg';

function DropdownMenu({ updateSorting, updateArrayType, updateArraySize, size }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [sliderValue, setSliderValue] = useState(size);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function updateSize(size) {
    setSliderValue(size);
    updateArraySize(size)
  }

 
function DropdownItem(props) {
    return (
      <>
        {/* if this menu item should bring up another menu */}
        {props.goToMenu && (
          <a
            href="#"
            className="menu-item"
            onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
          >
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        )}
        {/* if this menu item should perform an actiion */}
        {!props.goToMenu && props.algoLabel && (
          <a
            href="#"
            className="menu-item"
            onClick={() => updateSorting(props.algoLabel)}
          >
           <span ><div className="icon-bullet"></div></span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        )}
        {!props.goToMenu && !props.algoLabel && !props.arrayTypeLabel && (
          <a
            href="#"
            className="menu-item"
            //add on click here
          >
            <span ><div className="icon-bullet"></div></span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        )}
        {!props.goToMenu && props.arrayTypeLabel && (
          <a href="#" className="menu-item" onClick={() => updateArrayType(props.arrayTypeLabel)}>
            <span ><div className="icon-bullet"></div></span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        )}
      </>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {/* <DropdownItem>My Profile</DropdownItem> */}
          <DropdownItem leftIcon={<AlgIcon/>} rightIcon={""} goToMenu="algorithms">
            Algorithms
          </DropdownItem>
          <DropdownItem leftIcon={<ArrayIcon/>} rightIcon={""} goToMenu="generateArray">
            Array Properties
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "algorithms"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<BackIcon/>}>
            <h2>Algorithms</h2>
          </DropdownItem>
          <DropdownItem leftIcon="" algoLabel="Insertion">
            Insertion Sort
          </DropdownItem>
          <DropdownItem leftIcon="" algoLabel="Merge">
            Merge Sort
          </DropdownItem>
          <DropdownItem leftIcon="" algoLabel="Heap">
            Heap Sort
          </DropdownItem>
          <DropdownItem leftIcon="" algoLabel="Quick">
            Quick Sort
          </DropdownItem>
         
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "generateArray"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<BackIcon/>}>
            <h2>Array Properties</h2>
          </DropdownItem>
          <DropdownItem leftIcon="" arrayTypeLabel="random">Randomized</DropdownItem>
          <DropdownItem leftIcon="" arrayTypeLabel="unique">Unique</DropdownItem>
          <DropdownItem leftIcon="">{`Size: ${sliderValue}`}</DropdownItem>

          <Slider step={10} min={50} max={200} defaultValue={size} onChange={updateSize}></Slider>

        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
