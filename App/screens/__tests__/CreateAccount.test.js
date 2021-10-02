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
