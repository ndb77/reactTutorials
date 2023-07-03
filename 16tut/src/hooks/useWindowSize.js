import {useState, useEffect} from 'react'

const useWindowSize = () =>{
  const [windowSize, setWindowSize] = useState({
    width:undefined,
    height:undefined
  })

  useEffect(()=>{
    const handleResize = () =>{
      setWindowSize({
        width: window.innerHeight,
        height: window.innerHeight
      })
    }
    // resets width and height
    handleResize();

    //sets the window width and height according to what is retrieved from the event
    window.addEventListener("resize",handleResize);

    // removes the event listener - prevents memory leak 
    const cleanUp = () =>{
      console.log('runs if a useEffect dep changes')
      window.removeEventListener('resize',handleResize)
    }

    return cleanUp;
  },[])

  return windowSize;
}

export default useWindowSize