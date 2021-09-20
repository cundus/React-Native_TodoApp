import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Layout, Text, Icon } from "@ui-kitten/components";

import { HomeScreen } from "./src/screens/home";
import { DetailsScreen } from "./src/screens/details";
import { Undone } from "./src/screens/undone";

const Stack = createStackNavigator();

const TopTab = createMaterialTopTabNavigator();

const TodoIcon = (props) => <Icon {...props} name="clipboard-outline" />;
const DoneIcon = (props) => (
  <Icon {...props} name="checkmark-square-2-outline" />
);

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="TODO" icon={TodoIcon} />
    <Tab title="DONE" icon={DoneIcon} />
  </TabBar>
);

const TabNavigator = () => (
  <TopTab.Navigator
    tabBar={(props) => <TopTabBar {...props} />}
    screenOptions={{
      tabBarActiveTintColor: "#84A9FF",
    }}
  >
    <TopTab.Screen name="Todo" component={HomeScreen} />
    <TopTab.Screen name="Undone" component={Undone} />
  </TopTab.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={TabNavigator}
      options={{
        headerTitle: "Todo List",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#84A9FF",
        },
      }}
    />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
