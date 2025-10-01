
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  test('вводит и вычисляет выражение', () => {
    render(<Calculator />);

    // Изначально отображается '0'
    expect(screen.getByText('0')).toBeInTheDocument();

    // Нажимаем "2"
    fireEvent.click(screen.getByText('2'));
    // В выражении теперь '2'
    expect(screen.getByText('2')).toBeInTheDocument();

    // Нажимаем "+"
    fireEvent.click(screen.getByText('+'));
    // В выражении '2+'
    expect(screen.getByText('2+')).toBeInTheDocument();

    // Нажимаем "3"
    fireEvent.click(screen.getByText('3'));
    // В выражении '2+3'
    expect(screen.getByText('2+3')).toBeInTheDocument();

    // Нажимаем "="
    fireEvent.click(screen.getByText('='));
    
    // Проверяем отображение результата
    expect(screen.getByText(/Результат:/)).toHaveTextContent('Результат: 5');

    // Проверяем, что результат отображается
    expect(screen.getByText('Результат: 5')).toBeInTheDocument();
  });

  test('очистка выражения и результата', () => {
    render(<Calculator />);

    // Вводим "1+2"
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));

    // Нажимаем "Очистить"
    fireEvent.click(screen.getByText('Очистить'));

    // После очистки выражение должно быть '0'
    expect(screen.getByText('0')).toBeInTheDocument();

    // Блок с результатом исчезает
    expect(screen.queryByText(/Результат:/)).toBeNull();
  });
});