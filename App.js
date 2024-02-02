import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RangesScreen from "./src/screens/RangesScreen";
import PracticeScreen from "./src/screens/PracticeScreen";

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						headerShown: false,
						tabBarStyle: {
							borderTopWidth: 0,
						},
						tabBarShowLabel: false,
					})}
				>
					<Tab.Screen name="Practice" component={PracticeScreen} />
					<Tab.Screen name="Ranges" component={RangesScreen} />
				</Tab.Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
};

export default () => {
	return <App />;
};
