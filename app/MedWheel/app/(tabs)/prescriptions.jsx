import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'

import TimeView from '../../components/TimeView'

const Prescriptions = () => {
  const { user } = useGlobalContext()

  return (
    <SafeAreaView className="bg-background h-full w-full">
      <ScrollView>
        <View className="items-center">
          <View className="flex justify-center">
            <Text className="text-3xl mb-5 text-primary font-psemibold mt-4 self-center">
              Prescriptions
            </Text>
            <TimeView time="Any" medications={user.prescriptions} meds_times={user.presciptions_times} meds_doses={user.prescriptions_dosages_mg} isCurrent={false}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Prescriptions