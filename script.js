
function checkExpression() {

    const input = document.getElementById("expression").value.trim();
    const result = document.getElementById("result");
    const tbody = document.querySelector("#traceTable tbody");

    tbody.innerHTML = "";

    let stack = [];
    let valid = true;

    for (let ch of input) {

        if (ch === '(' || ch === '[' || ch === '{') {

            stack.push(ch);

            addRow(ch, "Push", stack.join(" "));
        }

        else if (ch === ')' || ch === ']' || ch === '}') {

            if (stack.length === 0) {

                addRow(ch, "Mismatch", stack.join(" "));
                valid = false;
                break;
            }

            let top = stack[stack.length - 1];
            stack.pop();

            if (
                (ch === ')' && top !== '(') ||
                (ch === ']' && top !== '[') ||
                (ch === '}' && top !== '{')
            ) {

                addRow(ch, "Mismatch", stack.join(" "));
                valid = false;
                break;
            }

            addRow(ch, "Pop", stack.join(" "));
        }
    }

    if (stack.length !== 0) {
        valid = false;
    }

    if (valid) {

        result.innerHTML = "✓ Expression Accepted (Balanced)";
        result.className = "accept";
    }
    else {

        result.innerHTML = "✗ Expression Rejected (Not Balanced)";
        result.className = "reject";
    }
}

function addRow(symbol, action, stackContent) {

    const tbody = document.querySelector("#traceTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${symbol}</td>
        <td>${action}</td>
        <td>${stackContent || "Empty"}</td>
    `;

    tbody.appendChild(row);
}
