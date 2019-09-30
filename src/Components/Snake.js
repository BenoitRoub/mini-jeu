import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";

export default function SnakeTable() {
	const taille = 20;
	const taillecase = 10;

	const container = {
		width: taille * taillecase,
		height: taille * taillecase,
		display: "flex",
		flexWrap: "wrap",
		borderRadius: "5px",
		background: "#78e455",
		overflow: "hidden"
	};

	const containerContainer = {
		width: taille * taillecase + 30,
		height: taille * taillecase + 100,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxShadow: "0 0 5px",
		background: "#51a237"
	};

	const bigContainer = {
		background: "white",
		width: "100vw",
		height: "100vh",
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		flexDirection: "column"
	};

	const scoreStyle = {
		border: "1px solid #fafafa",
		padding: "5px 10px",
		borderRadius: "2px",
		color: "#fafafa"
	};

	const caseLibre = {
		background: "#78e455",
		width: taillecase,
		height: taillecase
	};

	const caseLibre2 = {
		background: "#51a237",
		width: taillecase,
		height: taillecase
	};

	const caseSerpent = {
		background: "#69a5f1",
		borderRadius: "1px",
		width: taillecase,
		height: taillecase,
		boxShadow: "0px 0px 4px black",
		zIndex: 1
	};

	const caseNourriture = {
		background: "#ec2511",
		borderRadius: 8,
		width: taillecase,
		height: taillecase,
		boxShadow: "0px 0px 4px black"
	};

	const [direction, setDirection] = useState("droite");

	const handleKeyPress = e => {
		if (e.keyCode === 38) {
			setDirection("haut");
		}
		if (e.keyCode === 40) {
			setDirection("bas");
		}
		if (e.keyCode === 37) {
			setDirection("gauche");
		}
		if (e.keyCode === 39) {
			setDirection("droite");
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 11, y: 10 }]);

	function avanceSnake() {
		var newSnake = snake.slice();
		var lastElement = newSnake[newSnake.length - 1];
		if (direction === "droite")
			newSnake.push({ x: lastElement.x, y: lastElement.y + 1 });
		if (direction === "gauche")
			newSnake.push({ x: lastElement.x, y: lastElement.y - 1 });
		if (direction === "bas")
			newSnake.push({ x: lastElement.x + 1, y: lastElement.y });
		if (direction === "haut")
			newSnake.push({ x: lastElement.x - 1, y: lastElement.y });
		newSnake.splice(0, 1);
		testLost(newSnake);
		setSnake(newSnake);
		testNourriture(newSnake);
	}

	const [gameOver, setGameOver] = useState(false);

	useInterval(() => {
		avanceSnake();
	}, 100);

	function testLost(newSnake) {
		var lastElement = snake[newSnake.length - 1];
		if (
			lastElement.x >= taille ||
			lastElement.y >= taille ||
			lastElement.x < 0 ||
			lastElement.y < 0
		) {
			setGameOver(true);
		}
		for (var i = 0; i < snake.length - 1; i++)
			if (lastElement.x === snake[i].x && lastElement.y === snake[i].y) {
				setGameOver(true);
			}
	}

	const [nourriture, setNourriture] = useState([]);
	const [score, setScore] = useState(0);

	useInterval(() => {
		spawnNourriture();
	}, 2000);

	function spawnNourriture() {
		var newNourriture = nourriture.slice();
		newNourriture.push({
			x: getRandomInt(taille),
			y: getRandomInt(taille)
		});
		setNourriture(newNourriture);
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function testNourriture(newSnake) {
		var lastElement = snake[newSnake.length - 1];
		for (var i = 0; i < nourriture.length - 1; i++) {
			if (
				lastElement.x === nourriture[i].x &&
				lastElement.y === nourriture[i].y
			) {
				grossiSnake();
				var newNourriture = nourriture.slice();
				newNourriture = nourriture.splice(i, 1);
				setScore(score + 1);
			}
		}
	}

	function grossiSnake() {
		var newSnake = snake.slice();
		var firstElement = newSnake[0];
		console.log(firstElement);
		if (firstElement.y + 1 === newSnake[1].y) {
			newSnake.splice(0, 0, { x: firstElement.x, y: firstElement.y - 1 });
			newSnake.splice(0, 0, { x: firstElement.x, y: firstElement.y - 2 });
		}
		if (firstElement.y - 1 === newSnake[1].y) {
			newSnake.splice(0, 0, { x: firstElement.x, y: firstElement.y + 1 });
			newSnake.splice(0, 0, { x: firstElement.x, y: firstElement.y + 2 });
		}
		if (firstElement.x + 1 === newSnake[1].x) {
			newSnake.splice(0, 0, { x: firstElement.x - 1, y: firstElement.y });
			newSnake.splice(0, 0, { x: firstElement.x - 2, y: firstElement.y });
		}
		if (firstElement.x - 1 === newSnake[1].x) {
			newSnake.splice(0, 0, { x: firstElement.x + 1, y: firstElement.y });
			newSnake.splice(0, 0, { x: firstElement.x + 2, y: firstElement.y });
		}
		setSnake(newSnake);
	}

	const [key, setKey] = useState(false);

	var [tables, setTables] = useState([[1, 2], [1, 2]]);

	useEffect(() => {
		var newTables = [];
		for (var i = 0; i < taille; i++) {
			newTables[i] = [];
			for (var y = 0; y < taille; y++) {
				newTables[i][y] = y;
			}
		}
		for (var r = 0; r < snake.length; r++) {
			var x = snake[r].x;
			var m = snake[r].y;
			for (var a = 0; a < taille; a++) {
				if (x === a) {
					for (var b = 0; b < taille; b++) {
						if (m === b) {
							newTables[a][b] = "snake";
						}
					}
				}
			}
		}
		for (var t = 0; t < nourriture.length - 1; t++) {
			var f = nourriture[t].x;
			var q = nourriture[t].y;
			for (var j = 0; j < taille; j++) {
				if (f === j) {
					for (var d = 0; d < taille; d++) {
						if (q === d) {
							newTables[j][d] = "nourriture";
						}
					}
				}
			}
		}
		setTables(newTables);
		setKey(!key);
	}, [snake]);

	function refreshPage() {
		window.location.reload();
	}

	return (
		<div style={bigContainer} key={key}>
			{gameOver ? (
				<button onClick={refreshPage}>Jouer</button>
			) : (
				<div style={containerContainer}>
					<p style={scoreStyle}>{score}</p>
					<div style={container}>
						{tables.map(table =>
							table.map(tabl =>
								tabl === "snake" ? (
									<div style={caseSerpent} />
								) : tabl === "nourriture" ? (
									<div style={caseNourriture} />
								) : (
									<div style={caseLibre} />
								)
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
}
