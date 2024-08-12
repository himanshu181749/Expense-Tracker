import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [savings, setSavings] = useState(0);

  const addExpense = () => {
    const newExpense = { description, amount: parseFloat(amount), id: Math.random(), type: 'exp' };
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const addIncome = () => {
    const newIncome = { description, amount: parseFloat(amount), id: Math.random(), type: 'inc' };
    setExpenses([...expenses, newIncome]);
    setDescription('');
    setAmount('');
  };

  useEffect(() => {
    const totalIncome = expenses.filter((item) => item.type === 'inc') .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.filter((item) => item.type === 'exp').reduce((acc, curr) => acc + curr.amount, 0);

    setSavings(totalIncome - totalExpense);
  }, [expenses]);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-zinc-800 rounded-lg shadow-md self-center">
      <h1 className="text-2xl font-bold mb-5 text-center">Expense Tracker</h1>
      <h3 className="text-xl font-bold mb-5 text-center">Savings: ₹ {savings}</h3>
      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <button
          onClick={addExpense}
          className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
        >
          Add Expense
        </button>
        <button
          onClick={addIncome}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-2"
        >
          Add Income
        </button>
      </div>
      <ul className="list-disc pl-5">
        {expenses.map(
          (expense) =>
            expense.amount > 0 &&
            expense.description.length > 0 && (
              <li
                key={expense.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>
                  {expense.description}: ₹ {expense.amount}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
