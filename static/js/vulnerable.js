// Vulnerable JavaScript code for demonstration purposes

// XSS Vulnerability - directly inserting user input into DOM
function displayUserMessage(userInput) {
    document.getElementById('message').innerHTML = userInput;  // Vulnerable to XSS
}

// Insecure data storage
function saveUserCredentials(username, password) {
    localStorage.setItem('user_credentials', JSON.stringify({
        username: username,
        password: password  // Storing passwords in plaintext
    }));
}

// IDOR Vulnerability
function fetchUserData(userId) {
    fetch(`/api/users/${userId}/data`)  // No authentication check
        .then(response => response.json())
        .then(data => {
            displayUserMessage(data.message);
        });
}

// Insecure eval usage
function calculateUserInput(mathExpression) {
    return eval(mathExpression);  // Dangerous eval usage
}

// Exposed API Key
const API_KEY = "sk_test_12345abcdef";  // Hardcoded API key

// Prototype pollution vulnerability
function mergeObjects(target, source) {
    for (let key in source) {
        if (typeof source[key] === 'object') {
            target[key] = mergeObjects(target[key] || {}, source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
