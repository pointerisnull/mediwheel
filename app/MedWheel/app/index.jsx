import { StatusBar } from "expo-status-bar";
import { Text, Image, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import React, { useState } from "react";

import { useGlobalContext } from '../context/GlobalProvider'
import { CustomButton } from "../components/CustomButton";

import { icons, images } from "../constants";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/schedule"/>


    const LogIn = () => {
        router.replace('/login');
    }

    const createAccount = () => {
        router.replace('/create-account');
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="flex-1 items-center justify-center bg-background h-[100%] w-full">
                    <Image
                        source={images.logo_small}
                        className="w-[120px] h-[120px]"
                        resizeMode='contain'
                    />

                    <Text className="text-text text-3xl font-psemibold mt-10">
                        Welcome to {''}
                        <Text className="text-primary">
                            MedWheel
                        </Text>
                    </Text>

                    <Text className="text-text text-base font-psemibold mt-[50px] max-w-[80%] ml-[-20%]">
                        The modern persciption management app, designed for the elderly, disabled and visually impaired.
                    </Text>
                    
                    <Text className="text-text text-base font-psemibold mt-[200px]">
                        Please log in or create account to continue
                    </Text>

                    <CustomButton
                        title="Log In"
                        textStyles=""
                        handlePress={LogIn}
                        containerStyles="px-[58px] mt-5"
                        isLoading={isLoading}
                        rightImage={icons.login}
                    />

                    <CustomButton
                        title="Create Account"
                        textStyles=""
                        handlePress={createAccount}
                        containerStyles="px-[20px] mt-[15px]"
                        isLoading={isLoading}
                        rightImage={icons.account_circle}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

