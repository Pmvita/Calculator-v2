import { useState } from 'react';
import { Switch, TouchableOpacity, useColorScheme, View, Text, StyleSheet } from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [lastEquation, setLastEquation] = useState('');

  const handleNumberPress = (num: string) => {
    if (currentNumber === '0') {
      setCurrentNumber(num);
    } else {
      setCurrentNumber(currentNumber + num);
    }
  };

  const handleOperationPress = (op: string) => {
    if (currentNumber !== '0') {
      setOperation(op);
      setPreviousNumber(currentNumber);
      setCurrentNumber('0');
    }
  };

  const handleClear = () => {
    setCurrentNumber('0');
    setPreviousNumber('');
    setOperation('');
  };

  const handleClearAll = () => {
    handleClear();
    setLastEquation('');
  };

  const handleToggleSign = () => {
    setCurrentNumber((parseFloat(currentNumber) * -1).toString());
  };

  const handlePercent = () => {
    setCurrentNumber((parseFloat(currentNumber) / 100).toString());
  };

  const handleDelete = () => {
    if (currentNumber.length > 1) {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else {
      setCurrentNumber('0');
    }
  };

  const calculate = () => {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    setLastEquation(`${previousNumber} ${operation} ${currentNumber} = ${result}`);
    setCurrentNumber(result.toString());
    setPreviousNumber('');
    setOperation('');
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
    ]}>
      <View style={styles.themeSwitch}>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.calculator}>
        <Text style={[
          styles.lastEquation,
          { color: isDarkMode ? '#888' : '#666' }
        ]}>{lastEquation}</Text>
        <Text style={[
          styles.display,
          { color: isDarkMode ? '#fff' : '#000' }
        ]}>{currentNumber}</Text>
        
        <View style={styles.buttonRow}>
          {['C', '+/-', '%', '÷'].map(btn => (
            <TouchableOpacity 
              key={btn}
              style={[
                styles.button,
                { backgroundColor: btn === '÷' ? '#007AFF' : isDarkMode ? '#333' : '#e0e0e0' }
              ]}
              onPress={() => {
                if (btn === 'C') handleClear();
                else if (btn === '+/-') handleToggleSign();
                else if (btn === '%') handlePercent();
                else handleOperationPress(btn);
              }}
              onLongPress={() => {
                if (btn === 'C') handleClearAll();
              }}
            >
              <Text style={[
                styles.buttonText,
                { color: btn === '÷' ? '#fff' : isDarkMode ? '#fff' : '#000' }
              ]}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {['7', '8', '9', '×'].map(btn => (
            <TouchableOpacity 
              key={btn}
              style={[
                styles.button,
                { backgroundColor: btn === '×' ? '#007AFF' : isDarkMode ? '#333' : '#e0e0e0' }
              ]}
              onPress={() => {
                if ('÷×+-'.includes(btn)) {
                  handleOperationPress(btn);
                } else {
                  handleNumberPress(btn);
                }
              }}
            >
              <Text style={[
                styles.buttonText,
                { color: btn === '×' ? '#fff' : isDarkMode ? '#fff' : '#000' }
              ]}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {['4', '5', '6', '-'].map(btn => (
            <TouchableOpacity 
              key={btn}
              style={[
                styles.button,
                { backgroundColor: btn === '-' ? '#007AFF' : isDarkMode ? '#333' : '#e0e0e0' }
              ]}
              onPress={() => {
                if ('÷×+-'.includes(btn)) {
                  handleOperationPress(btn);
                } else {
                  handleNumberPress(btn);
                }
              }}
            >
              <Text style={[
                styles.buttonText,
                { color: btn === '-' ? '#fff' : isDarkMode ? '#fff' : '#000' }
              ]}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {['1', '2', '3', '+'].map(btn => (
            <TouchableOpacity 
              key={btn}
              style={[
                styles.button,
                { backgroundColor: btn === '+' ? '#007AFF' : isDarkMode ? '#333' : '#e0e0e0' }
              ]}
              onPress={() => {
                if ('÷×+-'.includes(btn)) {
                  handleOperationPress(btn);
                } else {
                  handleNumberPress(btn);
                }
              }}
            >
              <Text style={[
                styles.buttonText,
                { color: btn === '+' ? '#fff' : isDarkMode ? '#fff' : '#000' }
              ]}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {['0', '.', 'DEL', '='].map(btn => (
            <TouchableOpacity 
              key={btn}
              style={[
                styles.button,
                { backgroundColor: btn === '=' ? '#007AFF' : isDarkMode ? '#333' : '#e0e0e0' }
              ]}
              onPress={() => {
                if (btn === '=') {
                  calculate();
                } else if (btn === 'DEL') {
                  handleDelete();
                } else {
                  handleNumberPress(btn);
                }
              }}
            >
              <Text style={[
                styles.buttonText,
                { color: btn === '=' ? '#fff' : isDarkMode ? '#fff' : '#000' }
              ]}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeSwitch: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  calculator: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  lastEquation: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  display: {
    fontSize: 70,
    textAlign: 'right',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  }
});
