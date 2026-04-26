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

    // عرض رسالة المستخدم
    addMessage(question, "user-msg");
    input.value = "";

    // رسالة loading
    const loadingMsg = addMessage("...", "bot-msg");

    try {
        const response = await fetch("http://localhost:8000/api/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: question }),
        });

        const data = await response.json();

        // حذف loading
        loadingMsg.remove();

        // عرض الرد
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
    
    // Parse markdown using marked.js if available
    if (typeof marked !== 'undefined') {
        // Only parse as markdown if it's a bot message or we want user messages parsed too
        // Usually, we want both parsed or just the bot. Let's parse all, or just let marked handle it.
        message.innerHTML = marked.parse(text);
    } else {
        message.textContent = text;
    }
    
    chatMessages.appendChild(message);

    // scroll لأسفل
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
}

// زر الإرسال
sendBtn.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
