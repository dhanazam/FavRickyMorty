import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import { HomeBottomTabNavigatorParamList } from "./types";
import { HomeStackNavigator } from "./HomeStack";
import { FeedScreen, SettingScreen } from "../screens";

const Tab = createBottomTabNavigator<HomeBottomTabNavigatorParamList>();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
};

export { BottomTabs };
