import {StyleSheet, Modal, TouchableOpacity, Animated} from 'react-native';
import React, {
    useState,
    useRef,
    useImperativeHandle,
    ForwardRefRenderFunction,
} from 'react';
import {BottomSheetProps, BottomSheetRef} from './types';

const BottomSheet: ForwardRefRenderFunction<
    BottomSheetRef,
    BottomSheetProps
> = (props, ref) => {
    const {children, bottomSheetStyle} = props;

    const [modalVisible, setModalVisible] = useState(false);

    const onCloseCallback = useRef<() => void>();
    const onOpenCallback = useRef<() => void>();

    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    const close = (callback?: () => void) => {
        onCloseCallback.current = callback;
        setModalVisible(false);
    };

    const open = (callback?: () => void) => {
        onOpenCallback.current = callback;
        setModalVisible(true);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(52,52,52,0.3)',
        },
        modalStyle: {
            margin: 0,
        },
        children: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
    });

    return (
        <Modal
            visible={modalVisible}
            animationType={'slide'}
            style={[styles.modalStyle, bottomSheetStyle]}
            transparent={true}>
            <TouchableOpacity style={styles.container} onPress={close}>
                <Animated.View style={styles.children}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

export default React.forwardRef(BottomSheet);

/*
useMemo
- lets you cache the result of calculation between re-renders
*/
