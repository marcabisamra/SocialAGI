// AI Soul 3D Voice Character Application
// Integrates Three.js, SocialAGI, and Eleven Labs TTS

// Import map for browser compatibility.
const importMap = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
};

// Socket.IO connection
let socket = null;

// Configuration
let config = {
  elevenlabsApiKey: "",
  voiceId: "21m00Tcm4TlvDq8ikWAM", // Default Rachel voice
  soulName: "Samantha",
};

// Global state
let scene, camera, renderer, character, soulStep;
let isThinking = false;
let isSpeaking = false;
let audioContext;
let currentAudio = null;
let chatSystem;

// Three.js Scene Setup
class ThreeScene {
  constructor() {
    this.init();
    this.createCharacter();
    this.setupLighting();
    this.animate();
  }

  init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("three-canvas"),
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Handle resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  createCharacter() {
    // Create an abstract character - a floating geometric form
    const geometry = new THREE.IcosahedronGeometry(1, 2);

    // Create material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      emissive: 0x001122,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });

    character = new THREE.Mesh(geometry, material);
    character.position.set(0, 0, 0);
    character.castShadow = true;
    scene.add(character);

    // Add a subtle rotation
    character.rotation.x = Math.PI / 6;
    character.rotation.y = Math.PI / 4;

    // Create particle system around character
    this.createParticles();
  }

  createParticles() {
    const particleCount = 50;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random positions around character
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random colors
      colors[i3] = 0.2 + Math.random() * 0.8;
      colors[i3 + 1] = 0.4 + Math.random() * 0.6;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
    });

    this.particles = new THREE.Points(particles, particleMaterial);
    scene.add(this.particles);
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, 1, 1);
    scene.add(directionalLight);
  }

  animate() {
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate character
      character.rotation.x += 0.005;
      character.rotation.y += 0.01;

      // Animate particles
      if (this.particles) {
        this.particles.rotation.x += 0.001;
        this.particles.rotation.y += 0.002;
      }

      // Update glow based on state
      this.updateGlow();

      // No need to update positions for 2D chat system

      renderer.render(scene, camera);
    };
    animate();
  }

  updateGlow() {
    if (!character) return;

    const material = character.material;
    const time = Date.now() * 0.001;

    if (isSpeaking) {
      // Intense glow when speaking
      const intensity = 0.5 + Math.sin(time * 15) * 0.3;
      material.emissive.setHex(0xff4400);
      material.emissiveIntensity = intensity;
      material.opacity = 0.9 + Math.sin(time * 10) * 0.1;
    } else if (isThinking) {
      // Soft pulsing when thinking
      const intensity = 0.3 + Math.sin(time * 5) * 0.2;
      material.emissive.setHex(0xffaa00);
      material.emissiveIntensity = intensity;
      material.opacity = 0.7 + Math.sin(time * 3) * 0.1;
    } else {
      // Idle state
      const intensity = 0.1 + Math.sin(time * 2) * 0.05;
      material.emissive.setHex(0x001122);
      material.emissiveIntensity = intensity;
      material.opacity = 0.8;
    }
  }

  setThinking(thinking) {
    isThinking = thinking;
  }

  setSpeaking(speaking) {
    isSpeaking = speaking;
  }
}

// 2D Chat System
class ChatSystem {
  constructor() {
    this.container = document.getElementById("messages-list");
    this.messageId = 0;
  }

  // Add a message to the chat
  addMessage(text, type = "thinking", sender = "ai") {
    const messageId = this.messageId++;
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${type}`;
    messageElement.textContent = text;
    messageElement.id = `message-${messageId}`;

    this.container.appendChild(messageElement);

    // Auto-scroll to bottom
    this.scrollToBottom();

    return messageId;
  }

  // Add a user message
  addUserMessage(text) {
    return this.addMessage(text, "user", "user");
  }

  // Add an AI message
  addAIMessage(text) {
    return this.addMessage(text, "ai", "ai");
  }

  // Add a thinking message
  addThinkingMessage(text) {
    return this.addMessage(text, "thinking", "ai");
  }

  // Add a processing message
  addProcessingMessage(text) {
    return this.addMessage(text, "processing", "ai");
  }

  // Add a contemplating message
  addContemplatingMessage(text) {
    return this.addMessage(text, "contemplating", "ai");
  }

  // Add a system message
  addSystemMessage(text) {
    return this.addMessage(text, "system", "system");
  }

  // Scroll to bottom
  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  // Clear all messages
  clearMessages() {
    this.container.innerHTML = "";
  }

  // No update needed for 2D system
  updateMessages() {
    // No-op for 2D system
  }
}

// SocialAGI Integration via Socket.IO
class AISoul {
  constructor() {
    this.initializeConnection();
  }

  async initializeConnection() {
    try {
      // Connect to backend server
      socket = io("http://localhost:3001");

      // Set up event listeners
      socket.on("connected", (data) => {
        console.log("Connected to AI Soul backend:", data.message);
        config.soulName = data.soulName;
        updateStatus("Connected");
      });

      socket.on("thought", (data) => {
        this.handleThought(data);
      });

      socket.on("response", (data) => {
        this.handleResponse(data);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
        updateStatus("Error");
        if (chatSystem) {
          chatSystem.addSystemMessage(`Error: ${error.message}`);
        }
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from backend");
        updateStatus("Disconnected");
      });

      console.log("AI Soul connection initialized");
    } catch (error) {
      console.error("Failed to initialize AI Soul connection:", error);
    }
  }

  handleThought(data) {
    if (chatSystem) {
      // Add thought message to chat
      const thoughtType = this.mapThoughtType(data.type);

      if (thoughtType === "thinking") {
        chatSystem.addThinkingMessage(data.text);
      } else if (thoughtType === "processing") {
        chatSystem.addProcessingMessage(data.text);
      } else if (thoughtType === "contemplating") {
        chatSystem.addContemplatingMessage(data.text);
      } else {
        chatSystem.addThinkingMessage(data.text);
      }

      console.log(`AI Thought [${data.stage}]:`, data.text);
    }
  }

  mapThoughtType(type) {
    const typeMap = {
      processing: "processing",
      thinking: "thinking",
      contemplating: "contemplating",
    };
    return typeMap[type] || "thinking";
  }

  handleResponse(data) {
    // Response handled in UI manager
    console.log("AI Response:", data.message);
  }

  async processMessage(userMessage) {
    if (!socket || !socket.connected) {
      throw new Error("Not connected to AI Soul backend");
    }

    // Send message to backend
    socket.emit("message", { message: userMessage });

    // Return a promise that resolves when we get a response
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Response timeout"));
      }, 30000); // 30 second timeout

      socket.once("response", (data) => {
        clearTimeout(timeout);
        resolve(data.message);
      });

      socket.once("error", (error) => {
        clearTimeout(timeout);
        reject(new Error(error.message));
      });
    });
  }

  updateConfig(newConfig) {
    if (socket && socket.connected) {
      socket.emit("updateConfig", newConfig);
    }
  }
}

// Eleven Labs TTS Integration
class VoiceSystem {
  constructor() {
    this.initializeAudio();
  }

  async initializeAudio() {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log("Audio context initialized");
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  async speak(text) {
    if (!config.elevenlabsApiKey) {
      console.warn("ElevenLabs API key not configured, skipping TTS");
      return;
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": config.elevenlabsApiKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // Set up audio event listeners
      audio.addEventListener("play", () => {
        threeScene.setSpeaking(true);
        updateStatus("Speaking");
      });

      audio.addEventListener("ended", () => {
        threeScene.setSpeaking(false);
        updateStatus("Idle");
        URL.revokeObjectURL(audioUrl);
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        threeScene.setSpeaking(false);
        updateStatus("Error");
      });

      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      currentAudio = audio;
      await audio.play();
    } catch (error) {
      console.error("Error with text-to-speech:", error);
      threeScene.setSpeaking(false);
      updateStatus("TTS Error");
    }
  }
}

// UI Management
class UIManager {
  constructor() {
    this.initializeUI();
  }

  initializeUI() {
    // Load saved configuration
    this.loadConfig();

    // Set up event listeners for floating chat
    document
      .getElementById("floating-send")
      .addEventListener("click", () => this.sendMessage());
    document
      .getElementById("floating-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });
    document
      .getElementById("save-config")
      .addEventListener("click", () => this.saveConfig());
    document.getElementById("hide-config").addEventListener("click", () => {
      console.log("Hide config clicked");
      this.hideConfigPanel();
    });
    document.getElementById("config-toggle").addEventListener("click", () => {
      console.log("Show config clicked");
      this.showConfigPanel();
    });

    // Auto-save config on input change
    const configInputs = document.querySelectorAll("#config-panel input");
    configInputs.forEach((input) => {
      input.addEventListener("change", () => this.saveConfig());
    });

    // Add config toggle button event listener
    document
      .getElementById("floating-config-toggle")
      .addEventListener("click", () => {
        this.showConfigPanel();
      });

    // Check if we should hide config panel based on API keys
    this.updateConfigVisibility();
  }

  loadConfig() {
    const savedConfig = localStorage.getItem("aiSoulConfig");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      Object.assign(config, parsed);

      // Update UI
      document.getElementById("elevenlabs-key").value = config.elevenlabsApiKey;
      document.getElementById("voice-id").value = config.voiceId;
      document.getElementById("soul-name").value = config.soulName;
    }
  }

  saveConfig() {
    config.elevenlabsApiKey = document.getElementById("elevenlabs-key").value;
    config.voiceId = document.getElementById("voice-id").value;
    config.soulName = document.getElementById("soul-name").value;

    localStorage.setItem("aiSoulConfig", JSON.stringify(config));

    // Update soul configuration
    if (aiSoul) {
      aiSoul.updateConfig(config);
    }

    console.log("Configuration saved");

    // Update config visibility after saving
    this.updateConfigVisibility();
  }

  hideConfigPanel() {
    console.log("Hiding config panel");
    const panel = document.getElementById("config-panel");
    const toggle = document.getElementById("config-toggle");

    if (panel) {
      panel.classList.add("hidden");
      console.log("Added hidden class to config panel");
    } else {
      console.error("Config panel element not found");
    }

    if (toggle) {
      toggle.classList.remove("hidden");
      console.log("Removed hidden class from toggle button");
    } else {
      console.error("Config toggle element not found");
    }
  }

  showConfigPanel() {
    console.log("Showing config panel");
    const panel = document.getElementById("config-panel");
    const toggle = document.getElementById("config-toggle");

    if (panel) {
      panel.classList.remove("hidden");
      console.log("Removed hidden class from config panel");
    } else {
      console.error("Config panel element not found");
    }

    if (toggle) {
      toggle.classList.add("hidden");
      console.log("Added hidden class to toggle button");
    } else {
      console.error("Config toggle element not found");
    }
  }

  updateConfigVisibility() {
    // Always hide config panel initially since backend handles AI processing
    // Users can still access it via the toggle button if needed
    console.log("Hiding config panel - backend handles AI processing");
    this.hideConfigPanel();
  }

  async sendMessage() {
    const input = document.getElementById("floating-input");
    const message = input.value.trim();

    if (!message) return;

    // Clear input
    input.value = "";

    // Show user message in chat
    if (chatSystem) {
      chatSystem.addUserMessage(message);
    }

    // Disable send button
    const sendBtn = document.getElementById("floating-send");
    sendBtn.disabled = true;

    try {
      // Set thinking state
      threeScene.setThinking(true);
      updateStatus("Thinking");

      // Process message through AI Soul
      const response = await aiSoul.processMessage(message);

      // Show AI response in chat
      if (chatSystem) {
        chatSystem.addAIMessage(response);
      }

      // Set thinking state off
      threeScene.setThinking(false);

      // Speak the response
      await voiceSystem.speak(response);
    } catch (error) {
      console.error("Error processing message:", error);
      if (chatSystem) {
        chatSystem.addSystemMessage(`Error: ${error.message}`);
      }
      threeScene.setThinking(false);
      updateStatus("Error");
    } finally {
      // Re-enable send button
      sendBtn.disabled = false;
    }
  }

  // Using 2D floating chat interface
}

// Status Updates
function updateStatus(status) {
  document.getElementById("soul-state").textContent = status;
}

// Initialize Application
let threeScene, aiSoul, voiceSystem, uiManager;

async function initializeApp() {
  try {
    console.log("Initializing AI Soul 3D Voice Character...");

    // Initialize Three.js scene
    threeScene = new ThreeScene();
    console.log("Three.js scene initialized");

    // Initialize Chat System
    chatSystem = new ChatSystem();
    console.log("Chat system initialized");

    // Initialize AI Soul
    aiSoul = new AISoul();
    console.log("AI Soul initialized");

    // Initialize Voice System
    voiceSystem = new VoiceSystem();
    console.log("Voice system initialized");

    // Initialize UI Manager
    uiManager = new UIManager();
    console.log("UI manager initialized");

    // Hide loading screen and show floating UI
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("floating-status").classList.remove("hidden");
    document.getElementById("floating-chat").classList.remove("hidden");
    document
      .getElementById("floating-config-toggle")
      .classList.remove("hidden");

    // Add welcome message
    if (chatSystem) {
      chatSystem.addSystemMessage(
        `${config.soulName} is now online and ready to chat!`
      );
    }
    updateStatus("Ready");

    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    document.getElementById("loading").innerHTML = `
            <div class="spinner"></div>
            <div>Initialization failed: ${error.message}</div>
        `;
  }
}

// Start the application
document.addEventListener("DOMContentLoaded", initializeApp);

// Export for debugging
window.aiSoulApp = {
  threeScene,
  aiSoul,
  voiceSystem,
  uiManager,
  chatSystem,
  config,
};
