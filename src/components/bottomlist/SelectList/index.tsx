import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import BottomSheet from '../BottomSheet';
import {BottomSheetRef} from '../BottomSheet/types';
import {SelectListTypes, BottomListTypes} from './types';

const BottomFlatList = ({data, renderItem}: BottomListTypes) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
        />
    );
};

const SelectList = (props: SelectListTypes) => {
    const {style, placeHolder, value, data, onSelect} = props;
    const sheetRef = useRef<BottomSheetRef>(null);

    const close = () => {
        sheetRef.current?.close();
    };

    const open = () => {
        sheetRef.current?.open();
    };

    const onSelection = (data, index) => {
        close();
        onSelect(data, index);
    };

    const renderDefaultItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => onSelection(item, index)}
                style={styles.sectionItemStyle}>
                <Text style={styles.sectionItemTextStyle}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <TouchableOpacity onPress={open} style={[styles.inputStyle, style]}>
                <Text style={styles.inputValueStyle}>
                    {value || placeHolder || 'Select'}
                </Text>
            </TouchableOpacity>
            <BottomSheet ref={sheetRef}>
                <BottomFlatList
                    data={data || []}
                    renderItem={data => renderDefaultItem(data)}
                />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        borderColor: '#DEDEDE',
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    inputValueStyle: {
        fontWeight: '400',
        flex: 1,
    },
    sectionItemStyle: {
        borderBottomWidth: 1.5,
        borderColor: '#F4F4F4',
        padding: 12,
    },
    sectionItemTextStyle: {
        fontWeight: '400',
    },
    sectionHeaderStyle: {
        padding: 12,
        borderColor: '#DEDEDE',
        borderBottomWidth: 1,
        fontWeight: '600',
    },
    sectionHeaderTextStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export {SelectList};
