import { useState, useMemo } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	PanResponder,
	Animated,
} from "react-native";
import { POKER_CHART } from "../constants/constants";
const { width } = Dimensions.get("window");
const CELL_SIZE = width / 13;

const calculateIndicesFromCoordinates = (x, y) => {
	// Assuming the grid starts at position (0, 0) and the top-left corner of the first cell is at (0, 0)
	const rowIndex = Math.floor(y / CELL_SIZE);
	const colIndex = Math.floor(x / CELL_SIZE);

	if (rowIndex >= 0 && rowIndex < 13 && colIndex >= 0 && colIndex < 13) {
		return { rowIndex, colIndex };
	} else {
		return null;
	}
};

const RangesScreen = () => {
	const [gridColors, setGridColors] = useState(
		Array(13).fill(Array(13).fill("blue"))
	);

	const panResponder = useMemo(() =>
		PanResponder.create(
			{
				onStartShouldSetPanResponder: () => true,
				onPanResponderMove: (_, gestureState) => {
					const { moveX, moveY } = gestureState;
					const touchedIndices = calculateIndicesFromCoordinates(moveX, moveY);

					if (touchedIndices) {
						const { rowIndex, colIndex } = touchedIndices;
						const updatedColors = gridColors.map((row) => [...row]);
						console.log(updatedColors.flat().filter((elem) => elem == "red"));
						updatedColors[rowIndex][colIndex] = "red";
						setGridColors(updatedColors);
					}
				},
				onPanResponderRelease: () => {
					// handle release event if needed
				},
			},
			[gridColors]
		)
	).current;
	const renderChart = () => {
		const rows = [];
		for (let i = 0; i < 13; i++) {
			const cols = [];
			for (let j = 0; j < 13; j++) {
				const hand = POKER_CHART[i][j];
				cols.push(
					<Animated.View
						key={hand}
						style={[styles.cell, { backgroundColor: gridColors[i][j] }]}
						{...panResponder.panHandlers}
					>
						<TouchableOpacity>
							<Text style={styles.text}>{hand}</Text>
						</TouchableOpacity>
					</Animated.View>
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
