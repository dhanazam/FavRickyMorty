import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Text } from "@components/index";
import { COLORS } from "@constants/index";

type TextFieldProps = TextInputProps & {
    label: String;
    inputRef?: React.Ref<TextInput>;
    errorMessage?: string;
    onFocus?: () => void;
    onBlur?: () => void;
};

export const TextField = ({
    label,
    onFocus,
    onBlur,
    inputRef,
    errorMessage,
    ...props
}: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(true);

    const _onFocus = () => {};

    const _onBlur = () => {};

    return (
        <View>
            <Text type="label">{label}</Text>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: isFocused ? COLORS.ACTIVE : COLORS.INPUT,
                    },
                ]}>
                <TextInput
                    ref={inputRef}
                    selectionColor={COLORS.ACTIVE}
                    style={styles.input}
                    {...props}
                />
                <Text style={styles.error}>{errorMessage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 38,
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
    },
    input: {
        height: "100%",
    },
    error: { color: COLORS.ACTIVE, marginTop: 4, marginBottom: 16, height: 16 },
});
