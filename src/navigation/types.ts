import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type AuthStackNavigatorParamList = {
    Splash: undefined;
    Signin: undefined;
    SignUp: undefined;
    HomeTab: HomeBottomTabNavigatorParamList;
};

export type HomeStackNavigatorParamList = {
    Home: undefined;
    Details: {
        name: string;
        birthday: string;
    };
};

export type HomeBottomTabNavigatorParamList = {
    HomeStack: HomeStackNavigatorParamList;
    Feed: undefined;
    Settings: undefined;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackNavigatorParamList, "Details">,
    BottomTabNavigationProp<HomeBottomTabNavigatorParamList, "Feed">
>;

/** 
type
- describes shape of an object or function signature

native-stack
- provides a way of your app to transition between screens where each new screen is placed on top of stack
- uses native APIs Fragment on Android

Fragment
- represents a resuable portion of your app's UI
*/
