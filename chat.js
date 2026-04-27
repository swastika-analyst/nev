// ─── AssemblyGPT Chat — OpenRouter API Integration ───
import { ASSEMBLYGPT_SYSTEM_PROMPT, SUGGESTED_PROMPTS } from './data.js';
import { OPENAPIKEY } from './config.js';

let conversationHistory = [];
let isLoading = false;

export function initChat() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messagesEl = document.getElementById('chat-messages');

  const send = () => { const msg = chatInput.value.trim(); if (msg && !isLoading) { sendMessage(msg); chatInput.value = ''; } };
  sendBtn.addEventListener('click', send);
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

  // Suggested prompts
  const sugEl = document.getElementById('suggested-prompts');
  SUGGESTED_PROMPTS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'suggested-prompt';
    btn.textContent = p;
    btn.addEventListener('click', () => { chatInput.value = p; send(); });
    sugEl.appendChild(btn);
  });

  // Welcome message
  addMessage('assistant', "👋 Welcome! I'm **AssemblyGPT** — your AI mentor for New Energy Vehicle assembly.\n\nAsk me about:\n- 🔋 Battery pack assembly\n- ⚙️ Motor & inverter integration\n- 💧 Hydrogen fuel cell stacks\n- 🛡️ High-voltage safety protocols\n- 🔍 Fault code diagnosis");
}

function addMessage(role, content) {
  const messagesEl = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerHTML = formatMarkdown(content);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const messagesEl = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'typing-indicator';
  div.id = 'typing';
  div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() { const el = document.getElementById('typing'); if (el) el.remove(); }

async function sendMessage(userMsg) {
  addMessage('user', userMsg);
  conversationHistory.push({ role: 'user', content: userMsg });

  if (!OPENAPIKEY || OPENAPIKEY === 'YOUR_API_KEY_HERE') {
    addMessage('assistant', "⚠️ Please set your **OPENAPIKEY** in the .env file.");
    return;
  }

  isLoading = true;
  document.getElementById('chat-send').disabled = true;
  showTyping();

  try {
    const payload = {
      model: "openai/gpt-4o-mini",
      messages: [
        { role: 'system', content: ASSEMBLYGPT_SYSTEM_PROMPT },
        ...conversationHistory
      ],
      temperature: 0.7,
      max_tokens: 2048
    };

    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAPIKEY}`
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error?.message || `API Error ${resp.status}`);
    }

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated.';
    conversationHistory.push({ role: 'assistant', content: reply });
    hideTyping();
    addMessage('assistant', reply);
  } catch (err) {
    hideTyping();
    addMessage('assistant', `❌ **Error:** ${err.message}\n\nPlease check your API key and try again.`);
  } finally {
    isLoading = false;
    document.getElementById('chat-send').disabled = false;
  }
}

function formatMarkdown(text) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/#{4}\s(.+)/g, '<h4>$1</h4>')
    .replace(/#{3}\s(.+)/g, '<h3>$1</h3>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-blue)">$1</a>')
    .replace(/^\s*[-•]\s(.+)/gm, '<li>$1</li>')
    .replace(/^\s*(\d+)\.\s(.+)/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
