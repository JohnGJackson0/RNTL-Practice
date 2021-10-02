import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { TextField } from "../Form";

test("renders the passed label", () => {
  const { getByText, queryByText } = render(<TextField label="Test Label" />);

  //getByText will fail immediatly if text is not found
  //queryByText will not fail if not found, it will return null
  //technically getByText("Test Label") will fail before expect statement is called
  // so just do getByText("Test Label") realistically
  // however its an example of how to use jest matchers

  expect(getByText("Test Label")).not.toBeNull();
  expect(queryByText("ASDF")).toBeNull();
});

/*
another example

<SubComponent testID = "ex" foo="bar" />

expect(getByTestId("ex").props.foo).toBe('bar');


*/

/*
  RNTL is a wrapper that works on top of test renderer

  Using the test renderer alone is not as effective because
  RNTL render has specific matchers i.e. render function
  with getTextById

  documentation https://reactjs.org/docs/test-renderer
  applies to RN in this case because RNTL is still
  returning a test instance object so those are the 
  methods possible after selection with render

*/

test("forwards remaining props to the underlying TextInput", () => {
  const { getByTestId } = render(
    <TextField label="Test Label" passedProp="yes" />
  );

  /*
  getByTestId("Form.TextInput").props
  

  This is the log statement 

  {
        allowFontScaling: true,
        rejectResponderTermination: true,
        underlineColorAndroid: 'transparent',
        testID: 'Form.TextInput',
        style: {
          fontSize: 18,
          fontWeight: '400',
          color: '#828282',
          marginBottom: 4
        },
        placeholderTextColor: '#828282',
        passedProp: 'yes',
        children: undefined
      }
  
  */

  expect(getByTestId("Form.TextInput").props).toEqual(
    expect.objectContaining({
      passedProp: "yes",
    })
  );
});

test("User input is changed correctly", () => {
  //jest.fn()
  /*
  Good for testing a function is being called, how many times it is called, 
  what it was called with, make fake return values, ect. 

  We can even use it on public libs 
  common use case is:

  import axios from 'axios';
  jest.mock('axios');

  ...
  axios.get.mockResolvedValue(resp);

  Anytime axios.get called in the test underneath the code 
  it will return the resp given in args and bypass the actual
  call

  Users.all() uses axios, but now when it calls axios.get it returns the
  resp and the call is actually not made

  faster tests and your tests no longer use outside sources which
  can make them fragile

  return Users.all().then(data => expect(data).toEqual(users));
  */

  const onChangeTextMock = jest.fn();

  const { getByTestId } = render(
    <TextField
      label="Test Label"
      passedProp="yes"
      onChangeText={onChangeTextMock}
    />
  );

  //fire event
  /*
    RNTL does not test implementation details. It is black box testing
    so to make sure the app works we use FireEvent for anything that a
    user can/would do on a screen and then expect certain things/flow
    to happen.

    When the text is changed we expect the prop is called
  */

  fireEvent.changeText(getByTestId("Form.TextInput"), "testing!");
  expect(onChangeTextMock).toHaveBeenCalled();
  //toHaveBeenCalledWith the param it recieved
  expect(onChangeTextMock).toHaveBeenCalledWith("testing!");
  expect(onChangeTextMock).not.toHaveBeenCalledWith("no!");
});
