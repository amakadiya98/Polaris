import moment from "moment";

export function formatCurrency(amount = 0) {
    if (typeof amount !== 'number') {
        return amount
    }
    if (amount >= 1e9) {
        return `${(amount / 1e9).toFixed(2).replace('.00', '')}b`;
    } else if (amount >= 1e6) {
        return `${(amount / 1e6).toFixed(2).replace('.00', '')}m`;
    } else if (amount >= 1e3) {
        return `${(amount / 1e3).toFixed(2).replace('.00', '')}k`;
    } else {
        return `${amount.toFixed(2).replace('.00', '')}`;
    }
}

export function formatNumbers(number = 0) {
    // Check if the input is a valid number
    if (isNaN(number)) return "Invalid number";

    // Round the number to two decimal places
    const roundedNumber = Number(number).toFixed(2);

    // Format the number with commas every three digits
    return roundedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDateRange(fromDateStr, toDateStr) {
    // Parse input dates using Moment.js
    const fromDate = moment(fromDateStr);
    const toDate = moment(toDateStr);

    // Check if the input dates are valid
    if (!fromDate.isValid() || !toDate.isValid() || fromDate.isAfter(toDate)) {
        return "Invalid date range";
    }

    // Check if the date range is within the same year
    if (fromDate.year() === toDate.year()) {
        // Check if the date range is within the same month
        if (fromDate.month() === toDate.month()) {
            if (fromDate.format('DD/MM/YYYY') === toDate.format('DD/MM/YYYY')) {
                return fromDate.format('D MMM YYYY');
            }
            return fromDate.format('MMM D') + '–' + toDate.format('MMM D, YYYY');
        } else {
            return fromDate.format('MMM D') + '–' + toDate.format('MMM D, YYYY');
        }
    } else {
        return fromDate.format('D MMM YYYY') + '–' + toDate.format('D MMM YYYY');
    }
}

