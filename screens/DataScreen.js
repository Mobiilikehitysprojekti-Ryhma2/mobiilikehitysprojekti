import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts"

export default function DataScreen() {


  const lineData = [

    {value: 0, dataPointText: '0'},

    {value: 3, dataPointText: 'Ma'},

    {value: 16, dataPointText: 'Ti'},

    {value: 35, dataPointText: 'Ke'},

    {value: 49, dataPointText: 'To'},

    {value: 64, dataPointText: 'Pe'},

    {value: 74, dataPointText: 'La'},

    {value: 98, dataPointText: 'Su'},

  ];


  return (
    <View>
      <Text>Koko viikon liikkuminen</Text>
      <LineChart

          data={lineData}

          height={250}

          showVerticalLines

          spacing={44}

          initialSpacing={0}

          color1="skyblue"

          textColor1="green"

          dataPointsHeight={6}

          dataPointsWidth={6}

          dataPointsColor1="blue"

          textShiftY={-2}

          textShiftX={-5}

          textFontSize={13}

      />
    </View>
  );
}