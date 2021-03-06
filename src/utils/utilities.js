const linesToConnect = {
	thumb: [0, 1, 2, 3, 4],
	indexFinger: [0, 5, 6, 7, 8],
	middleFinger: [0, 9, 10, 11, 12],
	ringFinger: [0, 13, 14, 15, 16],
	pinkyFinger: [0, 17, 18, 19, 20],
};

export const drawHand = (predictions, ctx) => {
	if (predictions.length > 0) {
		predictions.forEach((prediction) => {
			const landmarks = prediction.landmarks;

			for (let j = 0; j < Object.keys(linesToConnect).length; j++) {
				const finger = Object.keys(linesToConnect)[j];

				for (
					let k = 0;
					k < Object.keys(linesToConnect).length - 1;
					k++
				) {
					const firstPoint = linesToConnect[finger][k];
					const secondPoint = linesToConnect[finger][k + 1];

					ctx.beginPath();
					ctx.moveTo(
						landmarks[firstPoint][0],
						landmarks[firstPoint][1],
					);
					ctx.lineTo(
						landmarks[secondPoint][0],
						landmarks[secondPoint][1],
					);
					ctx.strokeStyle = 'plum';
					ctx.lineWidth = 4;
					ctx.stroke();
				}
			}

			for (let i = 0; i < landmarks.length; i++) {
				const x = landmarks[i][0];
				const y = landmarks[i][1];

				ctx.beginPath();
				ctx.arc(x, y, 5, 0, 3 * Math.PI);

				ctx.fillStyle = 'indigo';
				ctx.fill();
			}
		});
	}
};
