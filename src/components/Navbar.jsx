import React, {useEffect, useRef, useState} from 'react'
import {TiLocationArrow} from "react-icons/ti";
import {useWindowScroll} from "react-use";
import Button from "./Button.jsx";

const Navbar = () => {
  const navItems = ['Nexus', 'Vault', 'Prologue', "About", "Contact"];
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const {y: currentScrollY} = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prevState) => !prevState);
    setIsIndicatorVisible((prevState) => !prevState);
  }

  useEffect(() => {
    if(currentScrollY === 0) {
      setIsNavbarVisible(true);
      navContainerRef.current.classList.remove("floating-nav")
    }

  }, [currentScrollY]);

  useEffect(() => {
    if(isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }

  }, [isAudioPlaying])

  return (
      <div ref={navContainerRef} className={"fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"} >
        <header className={"absolute top-1/2 w-full -translate-y-1/2"}>
          <nav className={"flex size-full items-center justify-between p-4"}>


            <div className={"flex items-center gap-7"} >
              <img src="/img/logo.png" alt="logo" className={"w-10"}/>
              <Button
                  id = "product-button"
                  title = "Products"
                  rightIcon={<TiLocationArrow />}
                  containerClass = "bg-blue-50 mg:flex hidden items-center justify-center gap-1"
              />
            </div>
            <div className={"flex h-full items-center"} >
              <div className={"hidden md:block"} ></div>
              {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className={"nav-hover-btn"}>
                    {item}
                  </a>
              ))}
            <button onClick={toggleAudioIndicator} className={"ml-10 flex items-center space-x-0.5 cursor-pointer"} >
              <audio ref={audioElementRef} src="/audio/loop.mp3"  className={"hidden"} loop/>
                {[1,2,3,4].map((bar) => (
                    <div key={bar} className={`indicator-line ${isIndicatorVisible ? 'active' : ''}`} style={{animationDelay: `${bar * 0.2}s`}}/>
                ))}
            </button>
            </div>
          </nav>
        </header>
      </div>
  )
}
export default Navbar
