import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { SearchIcon, ClearIcon } from "./icons";
import type { SearchBarProps } from "./SearchBarProps.types";
import SearchButton from "./SearchButton";

const placeholderTextColor = "#777777";

const SearchBar = forwardRef<TextInput, SearchBarProps>(
    (
        {
            value,
            clearAccessibilityLabel,
            style,
            inputStyle,
            children,
            onChangeText,
            onClear,
            ...props
        },
        ref,
    ) => {
        const inputRef = useRef<TextInput>(null);
        useImperativeHandle(ref, () => inputRef.current!);

        const handleClear = () => {
            if (onClear) {
                onClear();
            }
            onChangeText("");
        };

        return (
            <View style={[styles.wrapper, style]}>
                <TextInput
                    ref={inputRef}
                    value={value}
                    selectionColor={placeholderTextColor}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    clearButtonMode="never"
                    autoCorrect={false}
                    accessibilityRole="search"
                    accessibilityTraits="search"
                    {...props}
                    style={[styles.input, inputStyle]}
                />
                <View pointerEvents="box-none" style={styles.children}>
                    <SearchIcon
                        color={placeholderTextColor}
                        style={styles.leftIcon}
                    />
                    {children}
                    {value ? (
                        <SearchButton
                            onPress={handleClear}
                            hitSlop={8}
                            accessibilityLabel={clearAccessibilityLabel}
                            style={styles.clearButton}>
                            <ClearIcon
                                color={placeholderTextColor}
                                style={styles.clearIcon}
                            />
                        </SearchButton>
                    ) : undefined}
                </View>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 4,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    children: {
        position: "absolute",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        alignItems: "center",
        elevation: 3,
    },
    leftIcon: {
        height: "40%",
        aspectRatio: 1,
        marginLeft: 10,
        marginRight: "auto",
    },
    clearButton: {
        marginRight: 10,
    },
    clearIcon: {
        height: "40%",
        aspectRatio: 1,
    },
});

export { SearchBar };

/**
forwardRef
- is a technique for automatically passing a ref through a component to one of its children
useImperativeHandle
- customizes the instance value that is exposed to parent components when using ref
 */
