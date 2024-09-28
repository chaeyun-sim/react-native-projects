import { useState } from 'react';

export const useCalculator = () => {
  const [input, setInput] = useState('0');
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [prevInput, setPrevInput] = useState<string | null>(null);
  const [prevOperator, setPrevOperator] = useState<string | null>(null);

  const onPressNum = (num: number | string) => {
    if (currentOperator && result !== null) {
      if (input === String(result)) {
        if (num === '.' && !input.includes('.')) {
          setInput(input + String(num));
        } else if (num !== '.') {
          setInput(String(num));
        }
      } else {
        if (num === '.' && !input.includes('.')) {
          setInput(input + String(num));
        } else if (num !== '.') {
          setInput(input + String(num));
        }
      }
    } else {
      if (input === '0' && num !== '.') {
        setInput(String(num));
      } else if (num === '.' && !input.includes('.')) {
        setInput(input + String(num));
      } else if (num !== '.') {
        setInput(input + String(num));
      }
    }
  };

  const formatResult = (value: number): string => {
    const stringValue = value.toString();
    if (stringValue.includes('.')) {
      const roundedValue = Number(value.toFixed(12));
      return roundedValue.toString().replace(/\.?0+$/, '');
    }
    return stringValue;
  };

  const calculateResult = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  const onPressOperator = (operator: string) => {
    if (operator !== '=') {
      if (result === null) {
        setResult(parseFloat(input));
      } else if (currentOperator) {
        const calcResult = calculateResult(result, parseFloat(input), currentOperator);
        setResult(calcResult);
        setInput(formatResult(calcResult));
      }
      setPrevOperator(currentOperator);
      setCurrentOperator(operator);
      setPrevInput(input);
    } else {
      let finalResult: number;
      if (currentOperator && result !== null) {
        finalResult = calculateResult(result, parseFloat(input), currentOperator);
        setPrevInput(input);
        setPrevOperator(currentOperator);
      } else if (prevInput !== null && prevOperator !== null) {
        finalResult = calculateResult(parseFloat(input), parseFloat(prevInput), prevOperator);
      } else {
        finalResult = parseFloat(input);
      }
      const formattedResult = formatResult(finalResult);
      setResult(parseFloat(formattedResult));
      setInput(formattedResult);
      setCurrentOperator(null);
    }
  };

  const onPressReset = () => {
    setInput('0');
    setCurrentOperator(null);
    setResult(null);
  };

  return {
    input,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
