reactors-test
===

# Usage

```javascript

// A simple stateless component

function Greetings(props) {
  return <Text>{props.name}</Text>;
}

<Test
  component={Greetings}
  props={{name: 'John'}}
  >
  <Test.Cycle>
    <Test.Assert children="John" />
  </Test.Cycle>
</Test>

// Test user interactions

function Counter(props) {
  return <Button onPress={props.handler}>{props.counter}</Button>;
}

let counter = 0;

<Test
  component={Counter}
  props={{counter, handler: () => counter++}}
  >
  {Array(3).map(() => (
    <Test.Cycle>
      <Test.Assert children={counter.toString()} />
      <Test.Tap />
    </Test.Cycle>
  ))}
</Test>
}
```
