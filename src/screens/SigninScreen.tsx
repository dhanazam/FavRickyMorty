import React, { useRef } from "react";
import {
    View,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Platform,
    StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField, Container, Text, Button } from "@components/index";
import { login, selectAuth } from "@state/slices/authSlice";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

export type FormValues = {
    email: string;
    password: string;
};

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

const SigninScreen = (): JSX.Element => {
    const inputRefs = useRef({});
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (values: FormValues) => {
        const result = await dispatch(login(values));
    };

    return (
        <Container>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={46}
                    style={styles.container}>
                    <View style={styles.header}>
                        <Text type="title">WELCOME!</Text>
                        <Text>Login/signup to save your </Text>
                        <Text>favorite atrwork in the cloud.</Text>
                    </View>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                label="Email"
                                placeholder="Enter your email address"
                                placeholderTextColor="gray"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                onSubmitEditing={() =>
                                    inputRefs.current["password"]?.focus()
                                }
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                errorMessage={errors.email?.message}
                            />
                        )}
                        name="email"
                    />
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                inputRef={ref => {
                                    inputRefs.current["password"] = ref;
                                }}
                                label="Password"
                                placeholder="Enter a secure password"
                                placeholderTextColor="gray"
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                                returnKeyType="done"
                                secureTextEntry
                                errorMessage={errors.password?.message}
                            />
                        )}
                        name="password"
                    />
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title={"Continue with Email"}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 26,
    },
    container: {
        width: "100%",
        paddingHorizontal: 16,
    },
});

export { SigninScreen };

/*
yup
- schema builder for runtime value parsing and validation

async await
- enable asynchronous, promise-based behavior to be written in a cleaner style

asynchronous
- enable your program to start a running task and other events still able to be responsive
while that task runs, rather than having to waitl that task has finished
**/
