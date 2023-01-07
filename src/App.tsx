import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@state/store/configureStore";
import { AuthStackkNavigator } from "@navigation/AuthStack";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <AuthStackkNavigator />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
