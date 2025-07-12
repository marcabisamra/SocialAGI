const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

// Import SocialAGI components
const { Blueprints } = require("../core/dist/src");
const {
  CortexStep,
  ChatMessageRoleEnum,
  internalMonologue,
  externalDialog,
  decision,
  brainstorm,
} = require("../core/dist/src/next");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// AI Soul Class using SocialAGI components (similar to example4.ts)
class AISoulBackend {
  constructor(blueprint, socketId) {
    this.blueprint = blueprint;
    this.socketId = socketId;
    this.goal = "Making the user happy and engaged";
    this.intermediateThoughtProcess = ["considersResponse"];

    this.initialMemory = [
      {
        role: ChatMessageRoleEnum.System,
        content: `<CONTEXT>You are modeling the mind of ${blueprint.name}

${blueprint.personality}

${blueprint.name} has the following goal of: ${this.goal}

You exist as a 3D digital entity and can see and interact with humans through text and voice. 
Keep your responses concise but meaningful, usually 1-3 sentences.

</CONTEXT>`,
      },
    ];

    this.dialog = new CortexStep(blueprint.name);
    this.dialog = this.dialog.withMemory(this.initialMemory);

    console.log(`AI Soul initialized for ${blueprint.name}`);
  }

  async processMessage(userMessage) {
    const socket = io.to(this.socketId);

    try {
      // Add user message to dialog
      const newUserMemory = [
        {
          role: ChatMessageRoleEnum.User,
          content: userMessage,
        },
      ];
      this.dialog = this.dialog.withMemory(newUserMemory);

      // Process intermediate thoughts (like example4.ts)
      let thoughtProcess = this.dialog;

      for (const process of this.intermediateThoughtProcess) {
        socket.emit("thought", {
          type: "processing",
          text: `${process}...`,
          stage: "thinking",
        });

        thoughtProcess = await thoughtProcess.next(
          internalMonologue(
            `${this.blueprint.name} ${process} - thinks to themselves internally`
          )
        );

        const thoughtText = thoughtProcess.value;
        console.log(`\n${this.blueprint.name} ${process}:`, thoughtText);

        // Send real AI thought to frontend
        socket.emit("thought", {
          type: "thinking",
          text: thoughtText,
          stage: process,
        });

        // Small delay to show thought progression
        await this.delay(1);
      }

      // Generate response
      socket.emit("thought", {
        type: "processing",
        text: "Formulating response...",
        stage: "responding",
      });

      const says = await thoughtProcess.next(
        externalDialog(`what ${this.blueprint.name} says out loud next`)
      );

      const response = says.value;

      // Add AI response to dialog memory
      const newAssistantMemory = [
        {
          role: ChatMessageRoleEnum.Assistant,
          content: response,
        },
      ];
      this.dialog = this.dialog.withMemory(newAssistantMemory);

      // Start metacognitive processing in the background (don't await)
      this.processMetacognition(socket);

      return response;
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("error", { message: error.message });
      throw error;
    }
  }

  async processMetacognition(socket) {
    try {
      // Metacognitive decision making (like example4.ts) - runs in background
      const decisionStep = await this.dialog.next(
        decision(
          `Consider the prior dialog and the goal of ${this.goal}. ${this.blueprint.name} has the following INTERNAL METACOGNITION: [${this.intermediateThoughtProcess}]. Should the INTERNAL METACOGNITION change or stay the same?`,
          ["changeThoughtProcess", "keepProcessTheSame"]
        )
      );

      console.log(`${this.blueprint.name} decides:`, decisionStep.value);

      if (decisionStep.value === "changeThoughtProcess") {
        const newProcess = await decisionStep.next(
          brainstorm(
            `Previously, ${this.blueprint.name} used the following INTERNAL METACOGNITION to think to themselves before speaking: [${this.intermediateThoughtProcess}]. Now, REVISE the INTERNAL METACOGNITION, adding, deleting, or modifying the processes.
            
For example. Revise [process1, process2] to [process1', process4, process5]. The revised processes must be different than the prior ones.

MAKE SURE the new actions are all parts of one's INTERNAL thought process PRIOR to speaking to the user, directed at oneself. Actions like provoking are all more external and don't qualify.   
`.trim()
          )
        );

        this.intermediateThoughtProcess = newProcess.value;
        console.log(
          `${this.blueprint.name} concludes new thought process:`,
          this.intermediateThoughtProcess
        );

        socket.emit("thought", {
          type: "contemplating",
          text: `Adapting my thinking process: ${this.intermediateThoughtProcess.join(
            ", "
          )}`,
          stage: "metacognition",
        });
      }
    } catch (error) {
      console.error("Error in metacognitive processing:", error);
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Store active AI souls by socket ID
const activeSouls = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Initialize AI Soul for this connection
  const aiSoul = new AISoulBackend(Blueprints.SAMANTHA, socket.id);
  activeSouls.set(socket.id, aiSoul);

  socket.emit("connected", {
    message: "Connected to AI Soul backend",
    soulName: Blueprints.SAMANTHA.name,
  });

  // Handle incoming messages
  socket.on("message", async (data) => {
    try {
      const { message } = data;
      console.log("Received message:", message);

      const aiSoul = activeSouls.get(socket.id);
      if (!aiSoul) {
        socket.emit("error", { message: "AI Soul not found" });
        return;
      }

      // Process message and get response
      const response = await aiSoul.processMessage(message);

      // Send response back to client
      socket.emit("response", {
        message: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("error", { message: error.message });
    }
  });

  // Handle configuration updates
  socket.on("updateConfig", (config) => {
    console.log("Config updated:", config);
    // You can update AI soul configuration here if needed
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    activeSouls.delete(socket.id);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`AI Soul backend server running on port ${PORT}`);
  console.log(`Using blueprint: ${Blueprints.SAMANTHA.name}`);
});

module.exports = { app, server, io };
