import React, { useEffect } from "react";
import { FlatList, ListRenderItem, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Button } from "@components/buttons";
import { SearchBar } from "@components/searchbar";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { getCharacters, selectCharacters } from "@state/slices/characterSlice";
import { Character } from "@model/index";

const HomeScreen = (): JSX.Element => {
    const { characters, page } = useAppSelector(selectCharacters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getCharacters({ page: 0 }));
    }, []);

    // const loadItems = () => {
    //     dispatch(getCharacters({ page }));
    // };

    const renderItem: ListRenderItem<Character> = ({ item, index }) => {
        return (
            <View>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
            </View>
        );
    };

    return (
        <View>
            <Icon name="filter" />
            <SearchBar value="hei" onChangeText={() => console.log("heei")} />
            <FlatList
                data={characters}
                renderItem={renderItem}
                // onEndReached={loadItems}
            />
        </View>
    );
};

export { HomeScreen };
