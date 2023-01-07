import React from "react";
import { StyleProp, ViewStyle, Pressable, Platform } from "react-native";

type Props = {
    onPress(): void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactElement;
    hitSlop?: number;
    accessibilityLabel?: string;
};

const SearchButton: React.FC<Props> = ({
    onPress,
    style,
    accessibilityLabel,
    hitSlop,
    children,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={style}
            accessibilityLabel={accessibilityLabel}
            accessibilityComponentType="button"
            accessibilityRole="button"
            accessibilityTraits="button"
            hitSlop={hitSlop}
            android_ripple={{
                color: "#888",
                borderless: true,
            }}>
            {children}
        </Pressable>
    );
};

export default SearchButton;
