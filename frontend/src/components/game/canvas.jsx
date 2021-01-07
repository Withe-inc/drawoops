import React, { useRef,  useEffect, useState, useCallback }from 'react';

//https://morioh.com/p/bbafb569e6a1
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
//https://medium.com/@martin.crabtree/react-creating-an-interactive-canvas-component-e8e88243baf6
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
	const getCoordinates = (event)=>{
		const canvas = canvasRef.current
		if (!canvas)return
		console.log(event)
		console.log({x:event.clientX-canvas.offsetLeft, y:event.clientY-canvas.offsetTop})
		return {x:event.clientX-canvas.offsetLeft, y:event.clientY-canvas.offsetTop}

	}

	//update mouse position when mouse pressed
	const startPaint = useCallback((event) => {
		const coordinates = getCoordinates(event);
		if (coordinates){
			setIsPainting(true)
			setMousePosition(coordinates)
		}

	},[])

	const paint = useCallback((event)=>{
		if (isPainting){
			const newMousePosition = getCoordinates(event);
			if (mousePosition && newMousePosition) {
				drawLine(mousePosition, newMousePosition);
				setMousePosition(newMousePosition);
			}
		}
	},[isPainting, mousePosition])


	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		canvas.addEventListener('mousedown', startPaint)
		return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };

	},[startPaint])

	useEffect(() => {
		const canvas = canvasRef.current;
        if (!canvas) return;

        
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
	}, [paint]);
	
	const drawLine = (mousePosition, newMousePosition)=>{
		const canvas = canvasRef.current;
		if (!canvas)  return;
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
        setIsPainting(false);
	}, []);
	
	useEffect(() => {
		const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
	}, [exitPaint]);
	
	return <canvas ref = {canvasRef} height={props.height} width={props.width} />;
};




export default Canvas
