// analytics.js
export const calculateTotals = (expenses) => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthly = expenses
    .filter(exp => {
      const d = new Date(exp.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const weekly = expenses
    .filter(exp => {
      const d = new Date(exp.date);
      const diff = now - d;
      return diff <= 7 * 24 * 60 * 60 * 1000;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  return { monthly, weekly };
};

export const getCategoryBreakdown = (expenses) => {
  const breakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return Object.entries(breakdown)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const getTopCategory = (expenses) => {
  const breakdown = getCategoryBreakdown(expenses);
  return breakdown[0]?.category || '—';
};

export const getDailyTrend = (expenses) => {
  const last30Days = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayTotal = expenses
      .filter(exp => exp.date === dateStr)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    last30Days.push({ date: dateStr, amount: dayTotal });
  }
  
  return last30Days;
};