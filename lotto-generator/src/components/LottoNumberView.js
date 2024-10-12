import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { getNumberBackgroundColor } from '../utils/getNumberBackgroundColor';
import Typography from './common/Typography';

const NUMBER_HEIGHT = 40;
const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);
const ANIMATION_DURATION = 1000;
const MIN_ROTATIONS = 2;

export default ({ numbers, isHistory }) => {
  const animatedValues = useRef(numbers.map(() => new Animated.Value(0))).current;
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setAnimationComplete(false);
    const animations = animatedValues.map((value, index) => {
      value.setValue(0);
      const finalNumber = numbers[index];
      const rotations = MIN_ROTATIONS + Math.floor(Math.random() * 3);
      const totalNumbers = LOTTO_NUMBERS.length * rotations + (finalNumber - 1);

      return Animated.timing(value, {
        toValue: totalNumbers,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
    });

    Animated.parallel(animations).start();

    setTimeout(() => setAnimationComplete(true), 800);
  }, [numbers]);

  const getAnimatedStyle = (animatedValue, finalNumber) => {
    return {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, LOTTO_NUMBERS.length],
            outputRange: [0, -NUMBER_HEIGHT * LOTTO_NUMBERS.length],
          }),
        },
      ],
    };
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {isHistory
        ? numbers.map((num, i) => (
            <View
              key={num}
              style={{
                backgroundColor: getNumberBackgroundColor(),
                width: NUMBER_HEIGHT,
                height: NUMBER_HEIGHT,
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              <View>
                <Typography
                  fontSize={20}
                  color='white'
                  style={{
                    height: NUMBER_HEIGHT,
                    lineHeight: NUMBER_HEIGHT,
                    textAlign: 'center',
                  }}
                >
                  {num}
                </Typography>
              </View>
            </View>
          ))
        : numbers.map((finalNumber, index) => (
            <View
              key={index}
              style={{
                backgroundColor: animationComplete ? getNumberBackgroundColor() : 'gray',
                width: NUMBER_HEIGHT,
                height: NUMBER_HEIGHT,
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              <Animated.View style={getAnimatedStyle(animatedValues[index], finalNumber)}>
                {[...Array(5)]
                  .flatMap(() => LOTTO_NUMBERS)
                  .map((num, i) => (
                    <Typography
                      key={i}
                      fontSize={20}
                      color='white'
                      style={{
                        height: NUMBER_HEIGHT,
                        lineHeight: NUMBER_HEIGHT,
                        textAlign: 'center',
                      }}
                    >
                      {num}
                    </Typography>
                  ))}
              </Animated.View>
            </View>
          ))}
    </View>
  );
};
