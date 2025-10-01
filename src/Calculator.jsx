import React, { useState } from 'react';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  // Функция для добавления символа (числа или операции) в выражение
  const handleButtonClick = (value) => {
    setExpression(prev => prev + value);
  };

  // Функция для вычисления результата
  const calculateResult = () => {
    try {
      // Используем eval для простого калькулятора, будьте аккуратны с eval в продакшене!
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch {
      setResult('Ошибка');
    }
  };

  // Очистка выражения
  const handleClear = () => {
    setExpression('');
    setResult(null);
  };

  const buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    '0', '.', '=', '/',
  ];

  return (
    <div style={{ maxWidth: '200px', margin: '20px auto', textAlign: 'center' }}>
      <h2>Калькулятор</h2>
      <div
        style={{
          border: '1px solid #000',
          padding: '10px',
          minHeight: '40px',
          marginBottom: '10px',
          fontSize: '18px',
          wordWrap: 'break-word'
        }}
      >
        {expression || '0'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => {
              if (btn === '=') {
                calculateResult();
              } else {
                handleButtonClick(btn);
              }
            }}
            style={{ padding: '10px', fontSize: '16px' }}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleClear}
          style={{ gridColumn: 'span 4', padding: '10px', fontSize: '16px', backgroundColor: '#f88' }}
        >
          Очистить
        </button>
      </div>
      {result !== null && (
        <div style={{ marginTop: '10px', fontSize: '18px' }}>
          Результат: {result}
        </div>
      )}
    </div>
  );
};

export default Calculator;