import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from "../../constants"

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-8 h-8"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sx`} style={{color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#2f27ce',
          tabBarInactiveTintColor: '#050316',
          tabBarStyle: {
            backgroundColor: "#dddbff",
            borderTopWidth: 0,
            borderTopColor: "#443dff",
            height: 78
          },
          tabBarHideOnKeyboard: true
        }}
      >
        <Tabs.Screen
          name = "schedule"
          options={{
            title: 'Schedule',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.schedule}
                color={color}
                name="Schedule"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name = "prescriptions"
          options={{
            title: 'Prescriptions',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.prescriptions}
                color={color}
                name="Prescriptions"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name = "account"
          options={{
            title: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.account_circle}
                color={color}
                name="Account"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout