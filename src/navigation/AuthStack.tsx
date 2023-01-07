import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackNavigatorParamList } from "./types";

import { SigninScreen, SignupScreen } from "@screens/index";
import { useAppSelector } from "@hooks/redux";
import { selectAuth } from "@state/slices/authSlice";
import { BottomTabs } from "./Tabs";

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackkNavigator = () => {
    const { user, loading } = useAppSelector(selectAuth);
    return (
        <AuthStack.Navigator>
            {!user ? (
                <AuthStack.Screen name="Signin" component={SigninScreen} />
            ) : (
                <AuthStack.Screen name="HomeTab" component={BottomTabs} />
            )}
        </AuthStack.Navigator>
    );
};

export { AuthStackkNavigator };
