const state = { history: [] };

function handleCalculation() {
    const el1 = document.getElementById('num1');
    const el2 = document.getElementById('num2');
    const errorLog = document.getElementById('error-log');
    
    el1.classList.remove('input-error');
    el2.classList.remove('input-error');
    errorLog.textContent = '';

    const val1 = el1.value.replace(',', '.').trim();
    const val2 = el2.value.replace(',', '.').trim();
    const op = document.getElementById('operator').value;

    let hasError = false;

    if (!val1) { el1.classList.add('input-error'); hasError = true; }
    if (!val2) { el2.classList.add('input-error'); hasError = true; }
    
    if (hasError) {
        errorLog.textContent = 'Заполните поля';
        return;
    }

    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);

    if (isNaN(n1)) { el1.classList.add('input-error'); hasError = true; }
    if (isNaN(n2)) { el2.classList.add('input-error'); hasError = true; }

    if (op === '/' && n2 === 0) {
        el2.classList.add('input-error');
        errorLog.textContent = 'Деление на 0 невозможно';
        return;
    }

    if (hasError) {
        errorLog.textContent = 'Некорректные числа';
        return;
    }

    let res;
    switch (op) {
        case '+': res = n1 + n2; break;
        case '-': res = n1 - n2; break;
        case '*': res = n1 * n2; break;
        case '/': res = n1 / n2; break;
    }

    const formattedRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(4));
    state.history.push(`${val1} ${op} ${val2} = ${formattedRes}`);
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('history');
    container.innerHTML = '';

    state.history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        const isLatest = (index === state.history.length - 1);
        div.classList.add(isLatest ? 'latest' : 'old');
        div.textContent = item;
        container.appendChild(div);
    });
    container.scrollTop = container.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = [document.getElementById('num1'), document.getElementById('num2')];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9.-]/g, '');
            input.classList.remove('input-error');
        });
    });

    document.getElementById('calculate-btn').addEventListener('click', handleCalculation);
});