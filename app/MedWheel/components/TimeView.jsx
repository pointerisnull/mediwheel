import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getMedication } from '../lib/appwrite';
import ApiClient from '../lib/wheelAPI';

import MedView from './MedView';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context/GlobalProvider'


import { icons, images } from "../constants/"

const TimeView = ({time, medications, meds_times, meds_doses, isCurrent, nextIndx}) => {
    const [meds, setMeds] = useState(null);


    var currentMedDoseIndx = 0;
    
    const setCurrentMedDoseIndx = (value) => {
        if (nextIndx) nextIndx();
        console.log(value);
        currentMedDoseIndx = value;
    }

    /*
    const getOrder = (value) => {
        try {
            return ({
                "Morning": 6,
                "Afternoon": 12,
                "Evening": 18,
                "Night": 20
            }[value]);
        }
        catch (e) {
            return Number(value);
        }
    }
    */

    useEffect(() => {
        const getMed = async (medID) => {
            try {
                return await getMedication(medID);
            }
            catch (e) {
                return null;
            }
        }
        
        const fetchMeds = async () => {
            var new_meds = [];

            for (let i = 0; i < medications.length; i++) {
                console.log("meds_times[i]: ", meds_times[i]);
                if (meds_times[i] === time || time === "Any") {
                    console.log("get med: ", medications[i]);
                    const new_med = await getMed(medications[i]);
                    new_meds.push(new_med);
                }
            }
            
            setMeds(new_meds);
            // console.log(new_meds);
        }

        fetchMeds();
    }, [medications]);

    const getIndx = () => {
        setCurrentMedDoseIndx(currentMedDoseIndx + 1);
        return currentMedDoseIndx - 1;
    }

    const client = new ApiClient("192.168.137.174", "8080")



    if (!meds) {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }

  return (
    <View className="bg-secondary rounded-lg min-w-[80%] p-2 my-1.5">
        <Text className="text-primary font-psemibold text-xl">
            { time === "Any" ? "Medication List" : time }
        </Text>
        {meds.map((item, index) => (
            <MedView key={index} med={item} mgs={meds_doses[getIndx()]}/>
        ))
        }
        {
            isCurrent ? (
                <View className="flex-row justify-center">
                    <CustomButton
                        textStyles={"text-background text-base"}
                        containerStyles={"px-2 mt-4 mb-2"}
                        title="Dispense Now"
                        handlePress={() => client.post("/", 4)}
                        rightImage={icons.dispense}
                    />
                </View>
            ) : null
        }
    </View>
  )
}

export default TimeView