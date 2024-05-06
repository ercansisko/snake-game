import { useEffect, useState } from "react";
import "./App.css";
var ful = new Array(400).fill(null);

function App() {
	const keyPress = (e) => {
		if (e.key === "ArrowLeft") {
			if (direction === "up" || direction === "down") {
				setDirection("left");
				console.log("sola");
			}
		} else if (e.key === "ArrowUp") {
			if (direction === "right" || direction === "left") {
				setDirection("up");
				console.log("yukarı");
			}
		} else if (e.key === "ArrowDown") {
			if (direction === "right" || direction === "left") {
				setDirection("down");
				console.log("aşağı");
			}
		} else if (e.key === "ArrowRight") {
			if (direction === "up" || direction === "down") {
				setDirection("right");
				console.log("sağa");
			}
		}
	};
	const initializeBait = () => {
		let excludedNumbers = [0, 1, 2, 3];
		do {
			var rx = Math.floor(Math.random() * 400);
		} while (excludedNumbers.includes(rx));
		return rx;
	};
	const produceBait = (arr) => {
		let excludedNumbers = arr.map((a) => intToGrid(a));
		do {
			var rx = Math.floor(Math.random() * 400);
		} while (excludedNumbers.includes(rx));
		console.log(excludedNumbers);
		return rx;
	};
	const intToGrid = (a) => {
		let y = Math.floor(a / 20);
		let x = a % 20;
		return [x, y];
	};
	const gridToInt = (arr) => {
		return arr[0] + arr[1] * 20;
	};
	const [gridItems, setGridItems] = useState(ful);
	const [snake, setSnake] = useState([
		[0, 0],
		[1, 0],
		[2, 0],
	]);
	const [direction, setDirection] = useState("right");
	const [time, setTime] = useState(0);
	const [bait, setBait] = useState(initializeBait());
	useEffect(() => {
		setInterval(() => {
			setTime((prev) => prev + 1);
		}, 100);
		let is = [];
		for (let i = 0; i < snake.length; i++) {
			is.push(snake[i][1] * 20 + snake[i][0]);
		}
		setGridItems((prev) => {
			let arr = [...prev];
			for (let i of is) {
				arr[i] = 1;
			}
			return arr;
		});
	}, []);
	useEffect(() => {
		if (direction === "right") {
			setSnake((prev) => {
				let arr = [...prev];
				let first = [...arr[arr.length - 1]];
				first[0]++;
				arr.shift();
				arr.push(first);
				return arr;
			});
		} else if (direction === "left") {
			setSnake((prev) => {
				let arr = [...prev];
				let first = [...arr[arr.length - 1]];
				first[0]--;
				arr.shift();
				arr.push(first);
				return arr;
			});
		} else if (direction === "up") {
			setSnake((prev) => {
				let arr = [...prev];
				let first = [...arr[arr.length - 1]];
				first[1]--;
				arr.shift();
				arr.push(first);
				return arr;
			});
		} else if (direction === "down") {
			setSnake((prev) => {
				let arr = [...prev];
				let first = [...arr[arr.length - 1]];
				first[1]++;
				arr.shift();
				arr.push(first);
				return arr;
			});
		}
	}, [time]);
	useEffect(() => {
		let arr = [...ful];
		let is = [];
		for (let i = 0; i < snake.length; i++) {
			is.push(snake[i][1] * 20 + snake[i][0]);
		}
		for (let i of is) {
			arr[i] = 1;
		}
		setGridItems(arr);
		window.addEventListener("keydown", keyPress);
		if (gridToInt(snake[snake.length - 1]) === bait) {
			let x = [...snake];
			setBait(produceBait(x));
			let firstS = [...snake[0]];
			let secondS = [...snake[1]];
			let qDir =
				firstS[0] === secondS[0] && firstS[1] > secondS[1]
					? "up"
					: firstS[0] === secondS[0] && firstS[1] < secondS[1]
					? "down"
					: firstS[0] > secondS[0] && firstS[1] === secondS[1]
					? "left"
					: "right";
			qDir === "up"
				? firstS[1]++
				: qDir === "down"
				? firstS[1]--
				: qDir === "left"
				? firstS[0]++
				: firstS[0]--;
			setSnake((prev) => {
				let arr = [...prev];
				arr.unshift(firstS);
				return arr;
			});
		}

		return () => {
			window.removeEventListener("keydown", keyPress);
		};
	}, [snake]);

	return (
		<div className="App">
			{time}
			<div className="grid-container">
				{gridItems.map((item, index) => (
					<div
						key={index}
						style={{
							backgroundColor:
								index === bait ? "red" : item === 1 ? "yellow" : "antiquewhite",
						}}
						className="grid-item"
						id={index + 1}
					></div>
				))}
			</div>
		</div>
	);
}

export default App;
