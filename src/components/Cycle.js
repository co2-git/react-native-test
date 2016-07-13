import React, {Component} from 'react';
import {View, Text} from 'react-native';

type PROPS = {
  label?: string,
};

export default function Cycle (props: PROPS) {
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      {props.children}
    </View>
  )
}
