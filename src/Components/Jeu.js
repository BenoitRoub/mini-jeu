import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";

export default function Jeu() {
	const [grid, setGrid] = useState([]);
	const hauteurMap = 15;
	const largeurMap = 44;
	const numberBaie = 20;
	const numberStone = 20;
	const numberWood = 20;
	const numberMonster = 10;

	const [positionCharacter, setPositionCharacter] = useState([5, 5]);

	// CREATION
	// ELEMENT
	// MAP

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	const [stone, setStone] = useState([]);
	const [baie, setBaie] = useState([]);
	const [wood, setWood] = useState([]);
	const [monster, setMonster] = useState([]);

	useEffect(() => {
		var newBaie = [];
		var newStone = [];
		var newWood = [];
		var newMonster = [];
		for (var y = 0; y < numberStone; y++) {
			newStone[y] = {
				x: getRandomInt(hauteurMap),
				y: getRandomInt(largeurMap)
			};
		}
		for (var i = 0; i < numberBaie; i++) {
			newBaie[i] = {
				x: getRandomInt(hauteurMap),
				y: getRandomInt(largeurMap)
			};
		}
		for (var x = 0; x < numberWood; x++) {
			newWood[x] = {
				x: getRandomInt(hauteurMap),
				y: getRandomInt(largeurMap)
			};
		}
		for (var m = 0; m < numberMonster; m++) {
			newMonster[m] = {
				x: getRandomInt(hauteurMap),
				y: getRandomInt(largeurMap)
			};
		}
		setBaie(newBaie);
		setStone(newStone);
		setWood(newWood);
		setMonster(newMonster);
	}, []);

	// INTERVAL
	// RARFAICHISSEMENT
	// MAP ET VIE

	useInterval(() => {
		var newGrid = [];
		for (var x = 0; x < hauteurMap; x++) {
			newGrid[x] = [];
			for (var y = 0; y < largeurMap; y++) {
				newGrid[x][y] = y;
				for (var g = 0; g < baie.length; g++) {
					if (baie[g].x === x && baie[g].y === y) {
						newGrid[x][y] = "baie";
					}
				}
				for (var s = 0; s < stone.length; s++) {
					if (stone[s].x === x && stone[s].y === y) {
						newGrid[x][y] = "stone";
					}
				}
				for (var q = 0; q < wood.length; q++) {
					if (wood[q].x === x && wood[q].y === y) {
						newGrid[x][y] = "wood";
					}
				}
				for (var m = 0; m < monster.length; m++) {
					if (monster[m].x === x && monster[m].y === y) {
						newGrid[x][y] = "monster";
					}
				}
				if (positionCharacter[0] === x && positionCharacter[1] === y) {
					newGrid[x][y] = "character";
				}
			}
		}
		if (life === 0) setGameOver(true);
		setGrid(newGrid);
	}, [1]);

	useInterval(() => {
		var newMonster = monster.slice();
		for (var i = 0; i < newMonster.length; i++) {
			var random = getRandomInt(4);
			var randomDistance = getRandomInt(5);
			if (
				random === 1 &&
				grid[newMonster[i].x + randomDistance] !== undefined
			) {
				for (var y = 0; y < randomDistance; y++) {
					setTimeout(newMonster[i].x++, 1000);
				}
			}
			if (
				random === 2 &&
				grid[newMonster[i].x - randomDistance] !== undefined
			) {
				for (var y = 0; y < randomDistance; y++) {
					setTimeout(newMonster[i].x--, 1000);
				}
			}
			if (
				random === 3 &&
				grid[newMonster[i].y + randomDistance] !== undefined
			) {
				for (var y = 0; y < randomDistance; y++) {
					setTimeout(newMonster[i].y++, 1000);
				}
			}
			if (
				random === 4 &&
				grid[newMonster[i].y - randomDistance] !== undefined
			) {
				for (var y = 0; y < randomDistance; y++) {
					setTimeout(newMonster[i].y--, 1000);
				}
			}
			if (
				newMonster[i].x - positionCharacter[0] === 1 &&
				newMonster[i].y - positionCharacter[1] === 1
			) {
				setLife(life - 20);
			}
			if (
				newMonster[i].x - positionCharacter[0] < 4 &&
				newMonster[i].y - positionCharacter[1] < 4
			) {
				newMonster[i].x = positionCharacter[0] + 1;
				newMonster[i].y = positionCharacter[1] + 1;
			}
		}
		setMonster(newMonster);
	}, 1000);

	const styleCase = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "#54ce54"
	};

	const styleCaseCharacter = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "blue",
		borderRadius: "50%"
	};

	const styleCaseBaie = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "#397b35",
		borderRadius: "40%"
	};

	const styleCaseStone = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "grey",
		borderRadius: "20%"
	};

	const styleCaseWood = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "#8a5425",
		borderRadius: "50%"
	};

	const styleCaseMonster = {
		width: 30,
		height: 30,
		outline: "1px solid #1010100c",
		outlineOffset: "-1px",
		background: "red",
		borderRadius: "10%"
	};

	const [life, setLife] = useState(100);
	const [food, setFood] = useState(100);
	const [gameOver, setGameOver] = useState(false);

	useInterval(() => {
		if (food === 100 && life < 100) setLife(life + 10);
		if (food > 0) {
			setFood(food - 10);
		} else {
			setLife(life - 10);
			if (life === 10) setGameOver(true);
		}
	}, 10000);

	// ACTION HANDLER

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
		if (e.keyCode === 69) {
			setGather(true);
		}
		for (var i = 0; i < inventaire.length; i++) {
			if (e.keyCode === 49 + i) {
				setCurrentItem(inventaire[i].nom);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	//    ACTION éffectué
	//    AVEC E

	const [gather, setGather] = useState(false);
	const [inventaire, setInventaire] = useState([
		{ nom: "hands" },
		{ nom: "baie", number: 0 },
		{ nom: "pierre", number: 0 },
		{ nom: "wood", number: 0 }
	]);
	const [currentItem, setCurrentItem] = useState("hands");

	useEffect(() => {
		function gatherBaie() {
			var newInventaire = inventaire.slice();
			newInventaire[1].number++;
			setInventaire(newInventaire);
			var newBaie = baie.slice();
			newBaie.splice(i, 1);
			setBaie(newBaie);
		}
		function gatherWood() {
			var newInventaire = inventaire.slice();
			newInventaire[3].number++;
			setInventaire(newInventaire);
			var newWood = wood.slice();
			newWood.splice(y, 1);
			setWood(newWood);
		}
		function gatherStone() {
			var newInventaire = inventaire.slice();
			newInventaire[2].number++;
			setInventaire(newInventaire);
			var newStone = stone.slice();
			newStone.splice(z, 1);
			setStone(newStone);
		}

		if (gather) {
			if (currentItem === "hands") {
				for (var i = 0; i < baie.length; i++) {
					if (
						(positionCharacter[0] === baie[i].x + 1 &&
							positionCharacter[1] === baie[i].y) ||
						(positionCharacter[0] === baie[i].x - 1 &&
							positionCharacter[1] === baie[i].y) ||
						(positionCharacter[0] === baie[i].x &&
							positionCharacter[1] === baie[i].y + 1) ||
						(positionCharacter[0] === baie[i].x &&
							positionCharacter[1] === baie[i].y - 1)
					)
						gatherBaie(i);
				}
				for (var y = 0; y < wood.length; y++) {
					if (
						(positionCharacter[0] === wood[y].x + 1 &&
							positionCharacter[1] === wood[y].y) ||
						(positionCharacter[0] === wood[y].x - 1 &&
							positionCharacter[1] === wood[y].y) ||
						(positionCharacter[0] === wood[y].x &&
							positionCharacter[1] === wood[y].y + 1) ||
						(positionCharacter[0] === wood[y].x &&
							positionCharacter[1] === wood[y].y - 1)
					)
						gatherWood(y);
				}
			}
			if (
				currentItem === "baie" &&
				inventaire[1].number > 0 &&
				food < 100 &&
				baie > 0
			) {
				var newInventaire = inventaire.slice();
				newInventaire[1].number--;
				setInventaire(newInventaire);
				setFood(food + 10);
			}
			if (
				currentItem === "baie" &&
				food === 100 &&
				life < 100 &&
				baie > 0
			) {
				var newInventaire = inventaire.slice();
				newInventaire[1].number--;
				setInventaire(newInventaire);
				setLife(life + 5);
			}
			if (currentItem === "wood") {
				for (var z = 0; z < stone.length; z++) {
					if (
						(positionCharacter[0] === stone[z].x + 1 &&
							positionCharacter[1] === stone[z].y) ||
						(positionCharacter[0] === stone[z].x - 1 &&
							positionCharacter[1] === stone[z].y) ||
						(positionCharacter[0] === stone[z].x &&
							positionCharacter[1] === stone[z].y + 1) ||
						(positionCharacter[0] === stone[z].x &&
							positionCharacter[1] === stone[z].y - 1)
					)
						gatherStone(z);
				}
			}
		}
		setGather(false);
	}, [gather]);

	// MOUVEMENT et
	// ACTION relative

	const [direction, setDirection] = useState("");

	useEffect(() => {
		var newPosition = positionCharacter.slice();
		if (direction === "haut" && grid[newPosition[0] - 1] !== undefined) {
			newPosition.splice(0, 1, newPosition[0] - 1);
		}
		if (direction === "bas" && grid[newPosition[0] + 1] !== undefined) {
			newPosition.splice(0, 1, newPosition[0] + 1);
		}
		if (direction === "gauche" && newPosition[1] > 0) {
			newPosition.splice(1, 1, newPosition[1] - 1);
		}
		if (direction === "droite" && newPosition[1] < largeurMap - 1) {
			newPosition.splice(1, 1, newPosition[1] + 1);
		}
		testStone(newPosition);
		if (testCollision(newPosition)) setPositionCharacter(newPosition);
		setDirection("");
	}, [direction]);

	function testStone(newPosition) {
		var newStone = stone.slice();
		for (var i = 0; i < stone.length; i++) {
			if (
				newPosition[0] === stone[i].x &&
				newPosition[1] === stone[i].y
			) {
				if (direction === "haut")
					newStone.splice(i, 1, {
						x: newStone[i].x - 1,
						y: newStone[i].y
					});
				if (direction === "bas")
					newStone.splice(i, 1, {
						x: newStone[i].x + 1,
						y: newStone[i].y
					});
				if (direction === "gauche")
					newStone.splice(i, 1, {
						x: newStone[i].x,
						y: newStone[i].y - 1
					});
				if (direction === "droite")
					newStone.splice(i, 1, {
						x: newStone[i].x,
						y: newStone[i].y + 1
					});
			}
		}
		if (newStone.length) {
			setStone(newStone);
		}
	}

	function testCollision(newPosition) {
		for (var i = 0; i < baie.length; i++) {
			if (newPosition[0] === baie[i].x && newPosition[1] === baie[i].y)
				return false;
		}
		for (var y = 0; y < wood.length; y++) {
			if (newPosition[0] === wood[y].x && newPosition[1] === wood[y].y)
				return false;
		}
		return true;
	}

	return (
		<div>
			{gameOver ? (
				<h1>GAME OVER</h1>
			) : (
				<React.Fragment>
					<div
						id="map"
						style={{
							display: "flex",
							flexWrap: "wrap",
							width: 30 * largeurMap,
							background: "#54ce54"
						}}
					>
						{grid.map((grid, indexligne) =>
							grid.map((gri, indexColonne) =>
								gri === "character" ? (
									<div
										style={styleCaseCharacter}
										key={indexligne + indexColonne}
									/>
								) : gri === "baie" ? (
									<div
										style={styleCaseBaie}
										key={indexligne + indexColonne}
									/>
								) : gri === "stone" ? (
									<div
										style={styleCaseStone}
										key={indexligne + indexColonne}
									/>
								) : gri === "wood" ? (
									<div
										style={styleCaseWood}
										key={indexligne + indexColonne}
									/>
								) : gri === "monster" ? (
									<div
										style={styleCaseMonster}
										key={indexligne + indexColonne}
									/>
								) : (
									<div
										style={styleCase}
										key={indexligne + indexColonne}
									/>
								)
							)
						)}
					</div>
					<p>{life} PV</p>
					<p>{food} Food</p>
					{inventaire.map((item, index) =>
						currentItem === item.nom ? (
							<button
								style={{ border: "2px solid black" }}
								onClick={() =>
									setCurrentItem(inventaire[index].nom)
								}
							>
								{item.number} {item.nom}
							</button>
						) : (
							<button
								onClick={() =>
									setCurrentItem(inventaire[index].nom)
								}
							>
								{item.number} {item.nom}
							</button>
						)
					)}
				</React.Fragment>
			)}
		</div>
	);
}
