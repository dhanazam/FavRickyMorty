import React from 'react';
import {View, Modal} from 'react-native';

const Dropdown = () => {
    // const renderDropdown = () => ();
    const renderModal = () => {
        return (
            <Modal>
                <TouchableWithoutFeedback>
                    <View></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    return <View>{renderModal()}</View>;
};

export {Dropdown};
