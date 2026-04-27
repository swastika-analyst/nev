// ─── ChainMind Predictor — OpenRouter API Integration ───
import { OPENAPIKEY } from './config.js';

let conversationHistory = [];
let isLoading = false;

const SYSTEM_PROMPT = `You are ChainMind AI, an expert supply chain and market predictor for the New Energy Vehicle (NEV) sector in India.
You specialize in:
- Predicting battery raw material prices (Lithium, Cobalt, Nickel, Graphite)
- Analyzing competitor moves (CATL, LG, Tesla, Ola Electric, etc.)
- Market scenario analysis ("What if" predictions)
- Identifying supplier disputes and geopolitical risks affecting the Indian market

Respond professionally, using data-driven insights. Format answers with clear headings and bold highlights. When asked about "what if" scenarios, provide a detailed impact assessment and mitigation strategy.`;

const SUGGESTED_PROMPTS = [
  'Forecast lithium carbonate prices for the next 90 days.',
  'What happens if China restricts graphite exports to India?',
  'Analyze CATL\'s current strategy and impact on Indian startups.',
  'What are the upcoming trends in Sodium-ion battery pricing?'
];

export function initPredictor() {
  const chatInput = document.getElementById('predictor-input');
  const sendBtn = document.getElementById('predictor-send');
  if (!chatInput || !sendBtn) return;

  const send = () => { const msg = chatInput.value.trim(); if (msg && !isLoading) { sendMessage(msg); chatInput.value = ''; } };
  sendBtn.addEventListener('click', send);
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

  const sugEl = document.getElementById('predictor-prompts');
  if (sugEl) {
    SUGGESTED_PROMPTS.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'suggested-prompt';
      btn.style.borderColor = 'rgba(255,107,53,0.3)';
      btn.style.color = 'var(--text-secondary)';
      btn.textContent = p;
      btn.addEventListener('click', () => { chatInput.value = p; send(); });
      sugEl.appendChild(btn);
    });
  }

  addMessage('assistant', "👋 Welcome to **ChainMind Predictor**.\n\nAsk me to predict battery market prices, identify supplier disputes, forecast future trends, or analyze competitors.");
}

function addMessage(role, content) {
  const messagesEl = document.getElementById('predictor-messages');
  if (!messagesEl) return;
  const div = document.createElement('div');
  div.className = `message ${role} predictor-msg`;
  div.innerHTML = formatMarkdown(content);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const messagesEl = document.getElementById('predictor-messages');
  const div = document.createElement('div');
  div.className = 'typing-indicator predictor-msg';
  div.id = 'predictor-typing';
  div.innerHTML = '<div class="typing-dot" style="background:var(--accent-orange)"></div><div class="typing-dot" style="background:var(--accent-orange)"></div><div class="typing-dot" style="background:var(--accent-orange)"></div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() { const el = document.getElementById('predictor-typing'); if (el) el.remove(); }

async function sendMessage(userMsg) {
  addMessage('user', userMsg);
  conversationHistory.push({ role: 'user', content: userMsg });

  if (!OPENAPIKEY || OPENAPIKEY.includes('YOUR_API_KEY')) {
    addMessage('assistant', "⚠️ Please set your **OPENAPIKEY** in the config or .env file.");
    return;
  }

  isLoading = true;
  document.getElementById('predictor-send').disabled = true;
  showTyping();

  try {
    const payload = {
      model: "openai/gpt-4o-mini",
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
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
    document.getElementById('predictor-send').disabled = false;
  }
}

function formatMarkdown(text) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/#{4}\s(.+)/g, '<h4>$1</h4>')
    .replace(/#{3}\s(.+)/g, '<h3>$1</h3>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-orange)">$1</a>')
    .replace(/^\s*[-•]\s(.+)/gm, '<li>$1</li>')
    .replace(/^\s*(\d+)\.\s(.+)/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
