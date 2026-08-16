const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// Simple JARVIS responses
const jarvisResponses = {
    "hello": "Hello sir. How may I assist you today?",
    "hi": "Greetings. System fully operational.",
    "how are you": "All systems running perfectly. Thank you for asking.",
    "your name": "I am J.A.R.V.I.S. — Just A Rather Very Intelligent System.",
    "time": () => `The current time is ${new Date().toLocaleTimeString()}`,
    "date": () => `Today is ${new Date().toLocaleDateString()}`,
    "who created you": "I was built by you — my creator.",
    "default": "Processing your request. I understand you said: "
};

// Add message to chat
function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isUser ? 'message user-message' : 'message jarvis-message';
    msgDiv.textContent = isUser ? `You: ${text}` : `JARVIS: ${text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

// Get JARVIS response
function getJarvisResponse(input) {
    const lowerInput = input.toLowerCase().trim();
    
    // Check for exact matches first
    if (jarvisResponses[lowerInput]) {
        return typeof jarvisResponses[lowerInput] === 'function' 
            ? jarvisResponses[lowerInput]() 
            : jarvisResponses[lowerInput];
    }
    
    // Check if input contains any key word
    for (const [key, value] of Object.entries(jarvisResponses)) {
        if (lowerInput.includes(key)) {
            return typeof value === 'function' ? value() : value;
        }
    }
    
    // Default response
    return jarvisResponses.default + input;
}

// Send message function
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    
    addMessage(text, true);
    userInput.value = '';
    
    // Small delay for natural feel
    setTimeout(() => {
        const response = getJarvisResponse(text);
        addMessage(response);
    }, 600);
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Welcome message on load
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage("System online. Welcome back sir. JARVIS is ready.");
    }, 800);
});
