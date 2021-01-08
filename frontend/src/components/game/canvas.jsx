import React, { useRef,  useEffect, useState, useCallback }from 'react';
import './canvas.scss'
//https://morioh.com/p/bbafb569e6a1
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
//https://medium.com/@martin.crabtree/react-creating-an-interactive-canvas-component-e8e88243baf6
//https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events

/**
 * Basic canvas for drawing
 * draw black line when mouse pressed
 * 
 * implemented based on tutorial above
 * 
 * Must do: 
 * 		-save picture drawn json 
 * 		-mobile touch screen events
 * 
 * Potential improvement: undo, redo, change color
 * 
 */
const Canvas = (props) =>{
	const canvasRef = useRef(null);
	const [isPainting, setIsPainting] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: null, y: null })
	// get coordinate on canvas
	// let ongoingTouches = new Array();
	const getCoordinates = (event)=>{
		const canvas = canvasRef.current
		if (!canvas)return
		
		//console.log({x:event.clientX-canvas.offsetLeft, y:event.clientY-canvas.offsetTop})
		return {x:event.clientX-canvas.offsetLeft, y:event.clientY-canvas.offsetTop}

	}

	// const ongoingTouchIndexById = (idToFind) {
	// 	for (var i = 0; i < ongoingTouches.length; i++) {
	// 	  var id = ongoingTouches[i].identifier;
	  
	// 	  if (id == idToFind) {
	// 		return i;
	// 	  }
	// 	}
	// 	return -1;    // not found
	//   }

	//update mouse position when mouse pressed
	const startPaint = useCallback((event) => {
		const coordinates = getCoordinates(event);

		//regitster touch
		// ongoingTouches.push(copyTouch(event))
		if (event && event.preventDefault )event.preventDefault();
		if (event && event.stopPropagation) event.stopPropagation(); 
		if (coordinates){
			setIsPainting(true)
			console.log('start')
			setMousePosition(coordinates)
		}

	},[])

	const paint = useCallback((event)=>{
		if (isPainting){
			const newMousePosition = getCoordinates(event);
			if (event && event.preventDefault )event.preventDefault();
			if (event && event.stopPropagation) event.stopPropagation(); 
			// const idx = ongoingTouchIndexById(event.pointerId);
			if (mousePosition && newMousePosition ) {
				console.log("painting")
				drawLine(mousePosition, newMousePosition);
				setMousePosition(newMousePosition);
			}
		}
	},[isPainting, mousePosition])


	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		canvas.addEventListener('pointerdown', startPaint)
		return () => {
            canvas.removeEventListener('pointerdown', startPaint);
        };

	},[startPaint])

	useEffect(() => {
		const canvas = canvasRef.current;
        if (!canvas) return;
		canvas.addEventListener('pointermove', paint)
        return () => {
            canvas.removeEventListener('pointermove', paint);
        };
	}, [paint]);
	
	const drawLine = (mousePosition, newMousePosition)=>{
		const canvas = canvasRef.current;
		if (!canvas) {console.log("not ca");return;}
		const context = canvas.getContext('2d')
		if (context) {
            context.strokeStyle = 'black';
            context.lineJoin = 'round';
			context.lineWidth = 5;
			context.beginPath();
        	context.moveTo(mousePosition.x, mousePosition.y);
        	context.lineTo(newMousePosition.x, newMousePosition.y);
        	context.closePath();
        	context.stroke();
		}
	}

	const exitPaint = useCallback(() => {
		console.log("leave, up")
        setIsPainting(false);
	}, []);
	
	useEffect(() => {
		const canvas = canvasRef.current;
        if (!canvas) return;
        // canvas.addEventListener('pointerup', exitPaint);
        canvas.addEventListener('pointercancel', exitPaint);
        return () => {
            // canvas.removeEventListener('pointerup', exitPaint);
			canvas.removeEventListener('pointercancel', exitPaint);
			
        };
	}, [exitPaint]);
	
	return <canvas ref = {canvasRef} height={props.height} width={props.width} />;
};




export default Canvas
