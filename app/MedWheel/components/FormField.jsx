import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-primary font-psemibold ml-2">{title}</Text>
    
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-accent items-center flex-row">
            <TextInput
                className="flex-1  text-text font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#050316"
                onChangeText={handleChangeText}
                cursorColor={"#050316"}
                secureTextEntry={title.endsWith('Password') && !showPassword}
            />

            {title.endsWith('Password') && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image source={!showPassword ? icons.visible : icons.non_visible} className="w-6 h-6" tintColor={"#050316"} resizeMethod='contain'/>
                </TouchableOpacity>
            )}
        </View>
    
    </View>
  )
}

export default FormField