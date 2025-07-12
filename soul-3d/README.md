# AI Soul 3D Voice Character Web App

A 3D interactive web application that integrates **real SocialAGI components** with Three.js and voice synthesis, featuring authentic AI thoughts and metacognitive processes.

## ✨ What Makes This Special

Unlike typical chatbots with fake loading messages, this app shows **real AI thoughts** using actual SocialAGI components:

- **Real internal monologue** from the AI's cognitive processes
- **Actual decision-making** about whether to change thinking patterns
- **Genuine metacognitive adaptation** based on conversation context
- **Dynamic thought processes** that evolve with each interaction

The thought bubbles display actual output from SocialAGI's `internalMonologue()` function, giving you a window into the AI's real cognitive processes.

## 🚀 Features

- **Real SocialAGI Integration**: Uses actual CortexStep, internalMonologue, externalDialog, decision, and brainstorm cognitive functions
- **3D Character**: Interactive 3D character with visual state changes
- **Real AI Thoughts**: Displays actual AI internal monologue in floating thought bubbles
- **Metacognitive Adaptation**: AI dynamically changes its thinking processes based on conversations (like example4.ts)
- **Voice Synthesis**: Optional ElevenLabs integration for AI voice
- **Real-time Communication**: WebSocket-based real-time AI processing

## 🏗️ Architecture

- **Frontend**: 3D visualization with Three.js, real-time thought display
- **Backend**: Node.js server running actual SocialAGI components
- **Communication**: Socket.IO for real-time AI thought streaming

## 📦 Setup

### 1. Install Dependencies

```bash
cd example-webapp
npm install
```

### 2. Configure Environment

Copy the environment template:

```bash
cp env.example .env
```

Edit `.env` and add your API keys:

```
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here  # Optional
PORT=3001
```

### 3. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 4. Open the Web App

Navigate to `http://localhost:3001` in your browser.

## 🧠 How It Works

1. **Real SocialAGI Processing**: The backend uses the actual SocialAGI library with CortexStep
2. **Intermediate Thought Processes**: Like example4.ts, the AI has configurable internal thought processes
3. **Real Thoughts Display**: The frontend displays actual AI internal monologue, not fake simulated thoughts
4. **Metacognitive Adaptation**: The AI can decide to change its thinking processes based on conversations
5. **3D Visualization**: The character's appearance changes based on thinking/speaking states

## 🎭 Character States

The 3D character has distinct visual states:

- **🔵 Idle**: Subtle blue glow with gentle pulsing
- **🟡 Thinking**: Amber glow with medium pulsing when processing real thoughts
- **🟠 Speaking**: Intense orange glow with rapid flashing during speech

## 💭 Real AI Thoughts

The app shows authentic AI cognitive processes:

- **Internal Monologue**: Real thoughts from `internalMonologue()` functions
- **Decision Making**: Actual decisions about changing thought patterns
- **Metacognitive Reflection**: AI evaluating its own thinking processes
- **Dynamic Adaptation**: Thought patterns that evolve based on conversation

Example real thoughts you might see:

- "I sense some frustration in their message, I should acknowledge that"
- "This reminds me of our earlier conversation about creativity"
- "I'm going to change my approach to be more direct"

## 🔧 Files

- `server.js` - Backend server with SocialAGI integration
- `app.js` - Frontend application with 3D visualization
- `index.html` - Main HTML file with 3D canvas
- `package.json` - Node.js dependencies
- `env.example` - Environment configuration template

## 🎨 Customization

### Personality Modification

Edit the system message in `server.js` to change the AI's personality:

```javascript
content: `<CONTEXT>You are modeling the mind of ${blueprint.name}

${blueprint.personality}

You exist as a 3D digital entity and can see and interact with humans...
</CONTEXT>`;
```

### Thought Process Customization

Modify the initial thought processes in `server.js`:

```javascript
this.intermediateThoughtProcess = ["feelsToThemself", "wondersAboutIntention"];
```

### Visual Customization

Modify the character's appearance in `app.js`:

```javascript
// Change geometry
const geometry = new THREE.IcosahedronGeometry(1, 2);

// Change materials and colors
const material = new THREE.MeshPhongMaterial({
  color: 0x4a90e2,
  emissive: 0x001122,
  // ... other properties
});
```

## 🛠️ API Keys

### OpenAI (Required)

- Get your API key: https://platform.openai.com/api-keys
- Add to `.env` file: `OPENAI_API_KEY=your_key_here`

### ElevenLabs (Optional)

- Get your API key: https://elevenlabs.io/app/settings/api-keys
- Add to `.env` file: `ELEVENLABS_API_KEY=your_key_here`
- Browse voices: https://elevenlabs.io/voices

## 🔍 Troubleshooting

### Common Issues

1. **Backend not starting**: Check if port 3001 is available
2. **OpenAI errors**: Verify your API key is valid and has credits
3. **No voice**: ElevenLabs API key is optional but needed for voice
4. **Thoughts not showing**: Check browser console for WebSocket connection errors

### Debug Information

Check browser developer tools and server logs to see:

- WebSocket connection status
- Real AI thought outputs
- API response times
- Error messages

## 🎯 What's Different

This implementation differs from typical chatbots by:

1. **Using real SocialAGI components** instead of direct API calls
2. **Showing authentic AI thoughts** instead of fake loading messages
3. **Demonstrating metacognitive adaptation** like example4.ts
4. **Streaming real-time cognitive processes** via WebSocket
5. **Providing genuine insight** into AI decision-making

Experience the difference between simulated and authentic AI cognition!
