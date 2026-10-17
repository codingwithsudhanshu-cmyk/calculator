const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors()); // Allows frontend to communicate with backend
app.post('/calculate', (req, res) => {
    const { num1, num2, operator } = req.body;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    let result;
    switch (operator) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            if (n2 === 0) return res.status(400).json({ error: 'Division by zero is not allowed' });
            result = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operator' });
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});