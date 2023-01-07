import type {
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";

export type SearchBarProps = TextInputProps & {
    value: string;
    onChangeText(text: string): void;
    cancelTextStyle?: StyleProp<TextStyle>;
    cancelAccessibilityLabel?: string;
    iconColor?: string;
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    children?: React.ReactElement;
    onCancel?(): void;
    onClear?(): void;
    clearAccessibilityLabel?: string;
}