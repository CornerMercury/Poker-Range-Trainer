import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { POKER_CHART } from "../constants/constants";
const { width } = Dimensions.get("window");
const CELL_SIZE = width / 13;

const RangesScreen = () => {
	const [gridColors, setGridColors] = useState(
		Array(13).fill(Array(13).fill("blue"))
	);

	const handleTouchMove = (evt, row, col) => {
		const { locationX, locationY } = evt.nativeEvent;
		const newRow = Math.floor((locationY / GRID_SIZE) * 13);
		const newCol = Math.floor((locationX / GRID_SIZE) * 13);

		if (
			newRow >= 0 &&
			newRow < gridColors.length &&
			newCol >= 0 &&
			newCol < gridColors[0].length &&
			gridColors[newRow][newCol] !== "red"
		) {
			const newGridColors = gridColors.map((rowColors, rowIndex) =>
				rowColors.map((color, colIndex) =>
					rowIndex === newRow && colIndex === newCol ? "red" : color
				)
			);
			setGridColors(newGridColors);
		}
	};
	// Create a function to generate the poker chart
	const renderChart = () => {
		const rows = [];
		for (let i = 0; i < 13; i++) {
			const cols = [];
			for (let j = 0; j < 13; j++) {
				const hand = POKER_CHART[i][j];
				cols.push(
					<TouchableOpacity
						key={hand}
						style={[styles.cell, { backgroundColor: gridColors[i][j] }]}
						onTouchMove={(evt) => handleTouchMove(evt, rowIndex, colIndex)}
					>
						<Text style={styles.text}>{hand}</Text>
					</TouchableOpacity>
				);
			}
			rows.push(
				<View key={i} style={styles.row}>
					{cols}
				</View>
			);
		}
		return rows;
	};

	return <View style={styles.container}>{renderChart()}</View>;
};

export default RangesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
	},
	cell: {
		width: CELL_SIZE,
		height: CELL_SIZE,
		borderWidth: 1,
		borderColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: CELL_SIZE * 0.45,
		textAlign: "center",
	},
});
