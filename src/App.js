import React, { useRef, useState } from 'react';

import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './utils/utilities';

function App() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const [handDetected, setHandDetected] = useState(false);

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log('Handpose model loaded');

		setInterval(() => {
			detect(net);
		}, 100);
	};

	const detect = async (net) => {
		if (
			typeof webcamRef.current !== undefined &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			const hand = await net.estimateHands(video);
			if (hand.length > 0) {
				setHandDetected(true);
			} else {
				setHandDetected(false);
			}

			const ctx = await canvasRef.current.getContext('2d');
			drawHand(hand, ctx);
		}
	};

	runHandpose();

	return (
		<div className='App'>
			<header className='App-header'>
				<Webcam
					ref={webcamRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 10,
						width: 640,
						height: 480,
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 10,
						width: 640,
						height: 480,
					}}
				/>
			</header>
			<p>Hand is {handDetected ? 'Detected' : 'Not detected'}</p>
		</div>
	);
}

export default App;
