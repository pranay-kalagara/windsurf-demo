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

// Race condition and memory leak demo
function startDataProcessing() {
    let dataCache = [];
    
    // Memory leak: event listener is never removed
    document.addEventListener('data-received', function processData(event) {
        dataCache.push(event.data);
    });

    // Race condition: multiple concurrent requests without synchronization
    setInterval(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                // Race condition: shared resource access without locks
                dataCache = data;
                document.dispatchEvent(new CustomEvent('data-received', { detail: data }));
            });
    }, 1000);
}

// Timing attack vulnerability
function compareSecretToken(userToken) {
    const secretToken = "abc123xyz789";
    let isMatch = true;
    
    for (let i = 0; i < userToken.length; i++) {
        if (userToken[i] !== secretToken[i]) {
            isMatch = false;
            break;
        }
        // Artificial delay making timing attack possible
        for (let j = 0; j < 10000; j++) { }
    }
    
    return isMatch;
}
