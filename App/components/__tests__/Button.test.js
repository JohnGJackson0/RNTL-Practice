import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { Button } from "../Button";
import { mockComponent } from "../../../testing-config/mockComponent";

//lets mock touchable opacity to get the disable function more
//like production
jest.mock(
  "react-native/Libraries/Components/Touchable/TouchableOpacity",
  () => {
    return mockComponent(
      "react-native/Libraries/Components/Touchable/TouchableOpacity",
      (props) => {
        return {
          onPress: props.disabled ? () => {} : props.onPress,
        };
      }
    );
  }
);

test("can press the button", () => {
  const onPressMock = jest.fn();

  const { getByText } = render(<Button text="Testing" onPress={onPressMock} />);

  fireEvent.press(getByText("Testing"));
  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock.mock.calls.length).toBe(1);

  fireEvent.press(getByText("Testing"));
  expect(onPressMock.mock.calls.length).toBe(2);
});

test("onPress is not called when button is disabled", () => {
  const onPressMock = jest.fn();

  //jest and RNTL does not actually figure things out 100%
  //In this case disabled does not work
  //we could change the implementation of our component to satisfy
  //our tests but it is not recommended to do so.
  //disabled works on production, so there should be no reason
  //to change the implementation details to satisfy the tests
  //jest is instead broken and it should be fixed.

  //there is other ways to do it but it is a good idea to learn
  //how to fix the implementation ourselves, because it will
  //need to be done in various other circumstances

  /**
    const { getByText } = render(
      <Button text="Testing" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText("Testing"));
    expect(onPressMock).not.toHaveBeenCalled(); 
   
   */

  const { getByText } = render(
    <Button text="Testing" onPress={onPressMock} disabled />
  );

  fireEvent.press(getByText("Testing"));
  expect(onPressMock).not.toHaveBeenCalled();
});
