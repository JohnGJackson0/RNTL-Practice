export const mockComponent = (moduleName, propOverrideFn = () => {}) => {
  const RealComponent = require.requireActual(moduleName);

  //real component is now the component at
  //react-native/Libraries/Components/Touchable/TouchableOpacity

  const React = require("react");
  const CustomizedComponent = (props) => {
    return React.createElement(
      "CustomizedComponent",
      {
        ...props,
        //override with paramater which is onPress: props.disabled ? () => {} : props.onPress,
        ...propOverrideFn(props),
      },
      props.children
    );
  };

  //change the props of the real component with the override onPress press being customized
  CustomizedComponent.propTypes = RealComponent.propTypes;
  return CustomizedComponent;
};
