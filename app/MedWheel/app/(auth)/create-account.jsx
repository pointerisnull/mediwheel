import { StatusBar } from "expo-status-bar";
import { Text, Image, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React, { useState } from "react";

import { icons, images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { useGlobalContext } from "../../context/GlobalProvider";

const CreateAccount = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const [form, setForm] = useState({
      username: '',
      email: '',
      password: ''
    })
  
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const submit = () => {
      if (form.username === "" || form.email === "" || form.password === "")
      {
        Alert.alert('Error', 'please fill in all the fields');
      }
  
      setIsSubmitting(true);
  
      try {
        // set it to global state...
  
        router.replace("/schedule");
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  
    return (
      <SafeAreaView className="bg-background h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <Image source={images.logo_small} resizeMode='contain' className="w-[85px] h-[85px]"/>
  
            <Text className="text-2xl text-text text-semibold mt-10 font-psemibold">Create an Account</Text>
  
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e})}
              otherStyles="mt-10"
              keyboardType="email-address"
            />
  
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e})}
              otherStyles="mt-7"
            />

            <FormField
              title="Confirm Password"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e})}
              otherStyles="mt-7"
            />
  
            <CustomButton
              title="Create Account"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              rightImage={icons.account_circle}
            />
  
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-text font-pregular">
                Have an account already?
              </Text>
              <Link href="/login" className="text-lg font-psemibold text-primary">Log In</Link>
            </View>
  
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default CreateAccount