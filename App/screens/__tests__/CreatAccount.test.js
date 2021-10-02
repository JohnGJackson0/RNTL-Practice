import React from "react";
import { render } from "@testing-library/react-native";

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
