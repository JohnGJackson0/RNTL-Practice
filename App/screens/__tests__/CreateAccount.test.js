import React from "react";

/*
Make a note that those who use "react-native-testing-library" import
are using a previous version of RNTL
*/
import { render, fireEvent } from "@testing-library/react-native";

import CreateAccount from "../CreateAccount";

test("it renders all inputs as expected", () => {
  const { toJSON } = render(<CreateAccount />);

  //to has to be exactly to match snapshot
  //update component, run test,
  //see it fails, make sure it is as expected
  //then if it is right: npm run test -u
  //to update all snapshots

  //setup snapshot tests when done writing the component
  //stops accidently changing something minor in component
  //without realizing it
  expect(toJSON()).toMatchSnapshot();
});

test("displays error message if all fields are not completed", () => {
  const { getByTestId, getByText } = render(<CreateAccount />);

  expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();

  fireEvent.press(getByText("Submit"));
  expect(
    getByTestId("CreateAccount.errorMessage").props.children
  ).not.toBeNull();

  fireEvent.changeText(getByTestId("CreateAccount.email"), "test@example.com");
  expect(
    getByTestId("CreateAccount.errorMessage").props.children
  ).not.toBeNull();
});

test("doesn't display an error message if all fields are complete", () => {
  const { getByTestId, getByText } = render(<CreateAccount />);

  expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();

  fireEvent.press(getByText("Submit"));
  expect(
    getByTestId("CreateAccount.errorMessage").props.children
  ).not.toBeNull();

  fireEvent(
    getByTestId("CreateAccount.email"),
    "onChangeText",
    "test@example.com"
  );
  fireEvent(getByTestId("CreateAccount.fName"), "onChangeText", "spencer");
  fireEvent(getByTestId("CreateAccount.lName"), "onChangeText", "carli");
  fireEvent(getByTestId("CreateAccount.password"), "onChangeText", "password");
  fireEvent(getByTestId("CreateAccount.cPassword"), "onChangeText", "password");

  fireEvent.press(getByText("Submit"));
  expect(getByTestId("CreateAccount.errorMessage").props.children).toBeNull();

  //should just use getByPlaceholderText instead
  //cannot use fireEvent.ChangeText on these because they are not direct
  //text inputs in the form, but we can call the prop from the child with
  //fireEvent(getByTestID("CreateAccount.email"),"onChangeText", "test@example.com");
});
