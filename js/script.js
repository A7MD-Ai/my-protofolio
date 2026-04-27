const trigger = document.getElementById('chat-trigger');
const windowBox = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-chat');

trigger.addEventListener('click', () => {
    windowBox.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
    windowBox.classList.add('hidden');
});






const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

async function sendMessage() {
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user-msg");
    input.value = "";

    const loadingMsg = addMessage("...", "bot-msg");

    try {
        const response = await fetch("https://chatbot-0j8y.onrender.com/api/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: question }),
        });

        const data = await response.json();

        loadingMsg.remove();

        addMessage(data.answer, "bot-msg");

    } catch (error) {
        loadingMsg.remove();
        addMessage("Error connecting to server ❌", "bot-msg");
        console.error(error);
    }
}

function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = `message ${className}`;
    
    if (typeof marked !== 'undefined') {
        message.innerHTML = marked.parse(text);
    } else {
        message.textContent = text;
    }
    
    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
