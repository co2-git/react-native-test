import React, {Component} from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';
import Cycle from './Cycle';
import Assert from './Assert';

type PROPS = {
  component: Component,
  props: Object,
  label?: string,
};

function shallow(component, props) {
  let result;
  if (typeof component === 'function') {
    try {
      result = component(props);
    } catch (error) {
      result = new component(props);
      result = result.render();
    }
  }
  return result;
}

export default function Test (props: PROPS) {
  const component = shallow(props.component, props.props);
  console.log({component});
  const children = Array.isArray(props.children) ?
    props.children : [props.children];
  const cycles = children
    .filter(child => child.type === Cycle)
    .map(child => {
      const {children} = child.props;
      const _children = Array.isArray(children) ? children : [children];
      const assertions = _children
        .filter(child => child.type === Assert)
        .map(child => _.pick(child.props, [
          'children',
          'platform',
          'state',
          'props',
        ]));
      return {
        label: child.label,
        assertions,
      };
    });
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      {cycles.map((cycle, cycleIndex) => {
        return (
          <View key={cycleIndex}>
            {cycle.assertions.map((assertion, assertionIndex) => {
              let result = false;
              if (('children') in assertion) {
                result = component.props.children === assertion.children;
              }
              return <Text key={assertionIndex}>√{result.toString()}</Text>;
            })}
          </View>
        );
      })}
    </View>
  )
}
