import React from "react";
import { render } from "@testing-library/react-native";

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
