import { Text, TouchableOpacity, View } from 'react-native';

export default ({
  text,
  color,
  onPress,
  disabled,
  isSelected,
  hasTodo,
}: {
  text: string;
  color: string;
  onPress?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  hasTodo?: boolean;
}) => {
  const COLUMN_SIZE = 28;
  const dotSize = 5;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 42,
      }}
    >
      <View
        style={{
          width: COLUMN_SIZE,
          height: COLUMN_SIZE,
          borderRadius: COLUMN_SIZE / 2,
          backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
          position: 'absolute',
          top: 0.5,
        }}
      />
      <Text style={{ color, textAlign: 'center' }}>{text}</Text>
      <View>
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize,
            backgroundColor: hasTodo ? '#54C392' : 'transparent',
            marginTop: 7,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

// import { Text, TouchableOpacity, View } from 'react-native';

// const COLUMN_SIZE = 35;

// export default ({
//   text,
//   color,
//   onPress,
//   disabled,
//   isSelected,
//   hasTodo,
// }: {
//   text: string;
//   color: string;
//   onPress?: () => void;
//   disabled?: boolean;
//   isSelected?: boolean;
//   hasTodo?: boolean;
// }) => {
//   const dotSize = 4;

//   return (
//     <TouchableOpacity
//       disabled={disabled}
//       onPress={onPress}
//       style={{
//         width: COLUMN_SIZE,
//         height: COLUMN_SIZE,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
//       }}
//     >
//       <Text style={{ color, marginTop: hasTodo ? 7 : 0 }}>{text}</Text>
//       {hasTodo && (
//         <View
//           style={{
//             width: dotSize,
//             height: dotSize,
//             borderRadius: dotSize,
//             backgroundColor: '#54C392',
//             marginTop: 3,
//           }}
//         />
//       )}
//     </TouchableOpacity>
//   );
// };
