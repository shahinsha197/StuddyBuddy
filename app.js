// --- 1. CONFIGURATION ---
const API_KEY = "AIzaSyCQ6---BYyM7PtnKnXqTQ8mMWEq6r8Lk34"; // Put your key inside the quotes
const MODEL_NAME = "gemini-1.5-flash";

const chatForm = document.getElementById('chatForm');
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');

// --- 2. AI FETCH FUNCTION ---
async function getAIResponse(userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }]
        })
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        
        // Extracting the text from Gemini's response structure
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("AI Error:", error);
        return "I'm having trouble connecting to my brain right now. Please check your API key!";
    }
}

// --- 3. CHAT LOGIC ---
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // Show User Message
    addMessage(message, 'user-message');
    userInput.value = '';

    // Show "Thinking..." Placeholder
    const thinkingId = "thinking-" + Date.now();
    addMessage("Studying your question...", 'ai-message', thinkingId);

    // Get Real AI Response
    const aiText = await getAIResponse(message);

    // Replace Placeholder with Real Answer
    const placeholder = document.getElementById(thinkingId);
    if (placeholder) {
        placeholder.innerText = aiText;
    }
});

function addMessage(text, className, id = null) {
    const div = document.createElement('div');
    div.className = `message ${className}`;
    if (id) div.id = id;
    div.innerText = text;
    chatWindow.appendChild(div);
    
    // Auto-scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});