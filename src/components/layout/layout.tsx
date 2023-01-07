import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type LProps = {
    children?: ReactNode;
    style?: ViewStyle;
};

export const Container = ({
    children,
    style,
    ...props
}: LProps): JSX.Element => (
    <View
        style={[
            { flex: 1, alignItems: "center", justifyContent: "center" },
            style,
        ]}
        {...props}
    >
        {children}
    </View>
);
