import { View, Text, Image } from 'react-native'
import React from 'react'

import { icons } from "../constants/"

const MedView = ({med, mgs}) => {
  return (
    <View className="flex-row">
        <Image className="w-8 h-8 " source={
            (med.type === "pill" ? icons.medication : 
            (med.type === "capsule" ? icons.capsule :
            icons.injection))
        }
        tintColor={"#443dff"}/>
        <Text className="text-lg font-pmedium mt-1">{mgs}mgs {med.name}</Text>
    </View>
  )
}

export default MedView