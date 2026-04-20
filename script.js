const trigger = document.getElementById('chat-trigger');
const windowBox = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-chat');

trigger.addEventListener('click', () => {
    windowBox.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    windowBox.classList.add('hidden');
});