// utils/calculations.js

export function calculateFutureValue(amount, frequency, period, data, startOfMonthData) {
    if (frequency === 'one-time') {
        const currentDate = new Date(data[data.length - 1].date);
        const investmentDate = new Date(currentDate);
        investmentDate.setFullYear(currentDate.getFullYear() - period);

        const investmentEntry = data.find((entry) => {
            const entryDate = new Date(entry.date);
            return entryDate >= investmentDate;
        });

        if (investmentEntry) {
            const strategyValue = parseFloat(investmentEntry.total_portfolio_nav);
            const shares = amount / strategyValue;
            const currentPrice = parseFloat(data[data.length - 1].total_portfolio_nav);
            return (shares * currentPrice).toFixed(1);
        }
        return '0.00';
    } else {
        const months = frequency === 'monthly' ? period * 12 : period;
        let totalShares = 0;
        for (let i = 0; i < months && i < startOfMonthData.length; i++) {
            const strategyValue = startOfMonthData[i].total_portfolio_nav;
            const shares = amount / strategyValue;
            totalShares += shares;
        }
        const finalPrice = totalShares * data[data.length - 1].total_portfolio_nav;
        return finalPrice.toFixed(1);
    }
}

export function calculateTotalInvestment(amount, frequency, period) {
    let periods = 0;
    if (frequency === 'monthly') {
        periods = period * 12;
    } else if (frequency === 'yearly') {
        periods = period;
    } else if (frequency === 'one-time') {
        periods = 1;
    }
    return amount * periods;
}