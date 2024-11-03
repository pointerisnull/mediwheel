import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '../../context/GlobalProvider'

import TimeView from '../../components/TimeView'

const Schedule = () => {
  const { user } = useGlobalContext()

  var currentMedDoseIndx = 0;

  const incCurrentMedDoseIndx = () => {
    console.log(value);
    currentMedDoseIndx+=1;
  }


  return (
    <SafeAreaView className="bg-background h-full w-full">
      <ScrollView>
        <View className="items-center">

          <Text className="text-3xl text-primary font-psemibold mt-4 self-center">
            Schedule
          </Text>

          <Text className="text-xl text-primary font-psemibold mt-4 self-center">
            Today
          </Text>

          <View className="flex justify-center mt-1">
            <TimeView time="Morning" medications={user.prescriptions} meds_times={user.presciptions_times} meds_doses={user.prescriptions_dosages_mg} isCurrent={false} nextIndx={incCurrentMedDoseIndx}/>

            <TimeView time="Afternoon" medications={user.prescriptions} meds_times={user.presciptions_times} meds_doses={user.prescriptions_dosages_mg} isCurrent={false} nextIndx={incCurrentMedDoseIndx}/>

            <TimeView time="Evening" medications={user.prescriptions} meds_times={user.presciptions_times} meds_doses={user.prescriptions_dosages_mg} isCurrent={true} nextIndx={incCurrentMedDoseIndx}/>

            <TimeView time="Night" medications={user.prescriptions} meds_times={user.presciptions_times} meds_doses={user.prescriptions_dosages_mg} isCurrent={false} nextIndx={incCurrentMedDoseIndx}/>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Schedule