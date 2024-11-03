import { View, Text, ScrollView, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from "expo-router"

import { images, icons } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'

import { getCurrentUser, signIn } from '../../lib/appwrite'

const SignIn = () => {
  const { setUser, setIsLoggedIn, isLoading, isLoggedIn } = useGlobalContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [form, setForm] = useState({
      email: '',
      password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
      if (!form.email || !form.password)
      {
        Alert.alert('Error', 'please fill in all the fields');
      }
  
      setIsSubmitting(true);
  
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
  
        Alert.alert("Success", "User signed in successfully");
  
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

          <Text className="text-2xl text-text text-semibold mt-10 font-psemibold">Log in to MedWheel</Text>

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
            otherStyles="mt-5"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 w-[60%] self-center"
            isLoading={isSubmitting}
            rightImage={icons.login}
          />

          <View className="justify-center pt-5 flex-row gap-2 mt-2">
            <Text className="text-lg text-text font-pregular">
              Don't have account?
            </Text>
            <Link href="/create-account" className="text-lg font-psemibold text-primary">Create Account</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn