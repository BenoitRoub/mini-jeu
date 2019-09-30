import React, { useState, useEffect } from "react";

export default function MasterMind() {
	const page = {
		width: "100vw",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const container = {
		position: "relative",
		width: 300,
		height: 500,
		background: "#fafafa",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		borderRadius: 10,
		boxShadow: "0 2px 8px black"
	};

	const bouttonRejouer = {
		marginBottom: 20
	};

	const containerGrilleResult = {
		position: "absolute",
		left: 220,
		top: 85,
		display: "flex",
		flexDirection: "column"
	};

	const styleResult = {
		margin: "2px 10px",
		width: 15
	};

	const colors = [
		"black",
		"purple",
		"green",
		"blue",
		"red",
		"orange",
		"yellow",
		"white"
	];

	const colorContainer = {
		marginTop: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	};

	const [color, setColor] = useState("black");

	const styleColor = {
		width: 20,
		height: 20,
		borderRadius: "50%",
		background: color
	};

	const styleListeColor = {
		display: "flex",
		padding: 0
	};

	const [combinaison, setCombinaison] = useState([
		"blue",
		"blue",
		"red",
		"orange"
	]);

	const [jouer, setJouer] = useState(true);

	useEffect(() => {
		var newCombinaison = [];
		for (var i = 0; i < 4; i++) {
			var num = Math.floor(Math.random() * Math.floor(8));
			newCombinaison[i] = colors[num];
		}
		setCombinaison(newCombinaison);
	}, [jouer]);

	const [grilles, setGrilles] = useState([]);
	const [grillesResult, setGrillesResult] = useState([]);

	useEffect(() => {
		var newGrille = [];
		for (var i = 0; i < 9; i++) {
			newGrille[i] = [];
			for (var y = 0; y < 4; y++) {
				newGrille[i][y] = "grey";
			}
		}
		setGrilles(newGrille);
		var newGrilleResult = [];
		for (var x = 0; x < 9; x++) {
			newGrilleResult[x] = [];
			for (var z = 0; z < 2; z++) {
				newGrilleResult[x][z] = ".";
			}
		}
		setGrillesResult(newGrilleResult);
	}, [jouer]);

	function updateGrille(index, index2) {
		var newGrille = grilles.slice();
		newGrille[index][index2] = color;
		setGrilles(newGrille);
		var y = 0;
		for (var i = 0; i < 4; i++) {
			if (newGrille[index][i] !== "grey") {
				y++;
			}
		}
		if (y === 4) {
			updateGrilleResult(index, newGrille);
		}
	}

	const [win, setWin] = useState("clear");

	function updateGrilleResult(index, newGrille) {
		var newGrilleResult = grillesResult.slice();
		var newCombinaison = combinaison.slice();
		var bonnePlace = 0;
		var mauvaisePlace = 0;
		for (var i = 0; i < 4; i++) {
			if (newGrille[index][i] === combinaison[i]) {
				bonnePlace++;
				newCombinaison[i] = "";
			}
		}
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				if (newGrille[index][x] === newCombinaison[y]) {
					mauvaisePlace++;
					newCombinaison[y] = "";
				}
			}
		}
		newGrilleResult[index][0] = bonnePlace;
		newGrilleResult[index][1] = mauvaisePlace;
		setGrillesResult(newGrilleResult);
		if (bonnePlace === 4) {
			setWin("win");
		}
		if (index === 0 && bonnePlace !== 4) {
			setWin("lost");
		}
	}

	function rejouer() {
		setWin("clear");
		setJouer(!jouer);
	}

	return (
		<div style={page}>
			<div style={container}>
				{win !== "clear" ? (
					<React.Fragment>
						<button style={bouttonRejouer} onClick={rejouer}>
							Rejouer
						</button>
						<div style={{ display: "flex" }}>
							{combinaison.map(couleur => (
								<button
									style={{
										width: 15,
										height: 15,
										borderRadius: "50%",
										background: couleur,
										margin: 5
									}}
								/>
							))}
						</div>
					</React.Fragment>
				) : null}
				<div style={{ display: "flex", flexDirection: "column" }}>
					{grilles.map((grille, index) => (
						<div style={{ display: "flex" }}>
							{grille.map((grill, index2) => (
								<button
									style={{
										width: 15,
										height: 15,
										borderRadius: "50%",
										background: grill,
										margin: 5
									}}
									onClick={() => updateGrille(index, index2)}
								/>
							))}
						</div>
					))}
				</div>
				<div style={containerGrilleResult}>
					{grillesResult.map(grille => (
						<div style={{ display: "flex" }}>
							{grille.map(grill => (
								<p style={styleResult}>{grill}</p>
							))}
						</div>
					))}
				</div>

				<div style={colorContainer}>
					<button style={styleColor} />
					<ul style={styleListeColor}>
						{colors.map(color => (
							<li style={{ listStyle: "none" }}>
								<button
									style={{
										width: 15,
										height: 15,
										borderRadius: "50%",
										background: color,
										margin: 3
									}}
									onClick={() => setColor(color)}
								></button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
