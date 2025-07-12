# 🤖+👱 SocialAGI

> **Subroutines for AI Souls**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/socialagi.svg?style=social&label=Follow%20%40socialagi)](https://twitter.com/socialagi) [![Discord](https://dcbadge.vercel.app/api/server/FCPcCUbw3p?compact=true&style=flat)](https://discord.gg/FCPcCUbw3p)

SocialAGI is a comprehensive TypeScript framework for building **AI Souls** — agentic AI entities with personality, memory, goals, and sophisticated cognitive processes. Unlike traditional chatbots, AI Souls have drive, ego, will, and the ability to engage in complex, goal-driven conversations.

## 📖 Table of Contents

- [🤔 What is SocialAGI?](#-what-is-socialagi)
- [💫 AI Souls](#-ai-souls)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🚀 Quick Start](#-quick-start)
- [📦 Core Components](#-core-components)
- [🔧 Tools & Memory](#-tools--memory)
- [🌐 Integrations](#-integrations)
- [📚 Examples](#-examples)
- [📖 Documentation](#-documentation)
- [🗂️ Repository Structure](#️-repository-structure)
- [🔄 Evolution & Recent Updates](#-evolution--recent-updates)
- [👥 Contributing](#-contributing)

## 🤔 What is SocialAGI?

SocialAGI provides developers with clean, simple, and extensible abstractions for directing the cognitive processes of large language models (LLMs). The framework focuses on streamlining the management of complex prompt engineering, freeing developers to create more effective and engaging AI experiences.

### Key Value Propositions

1. **Streamlined Context Management** with `CortexStep` - Facilitates ordered construction of context with LLMs through functional transformations
2. **Efficient Mental Process Scheduling** with `CortexScheduler` - Orchestrates mental processes and ensures synchronous flow of memory transformations
3. **Relevant Memory Retrieval** with `MemoryStream` - Provides vector-based memory storage and retrieval with recency and importance scoring
4. **Goal-Driven Agentic Dialog** - Enables proactive, goal-oriented conversations rather than reactive responses

## 💫 AI Souls

AI Souls are the core concept of SocialAGI — embodied conversational agents that transcend traditional chatbots by possessing:

- **Personality**: Rich, nuanced behavioral patterns defined through blueprints
- **Memory**: Persistent knowledge about people, conversations, and experiences
- **Goals**: Proactive objectives that drive conversation and behavior
- **Cognitive Processes**: Internal thought patterns and decision-making mechanisms
- **Emotional Intelligence**: Ability to understand and respond to emotional context

```javascript
import { Soul, Blueprints } from "socialagi";

const samantha = new Soul(Blueprints.SAMANTHA);

samantha.on("says", (text) => {
  console.log("Samantha says:", text);
});

samantha.on("thinks", (text) => {
  console.log("Samantha thinks:", text);
});

samantha.tell("Hi Samantha!");
```

## 🏗️ Architecture Overview

SocialAGI follows a modular architecture with several key components:

### Core Framework (`/core`)

The main `socialagi` npm package containing:

- **CortexStep**: Functional approach to building LLM context
- **CortexScheduler**: Event-driven mental process orchestration
- **Blueprints**: Personality definitions and configurations
- **Cognitive Functions**: Reusable LLM interaction patterns
- **Language Models**: OpenAI integration and custom model support

### Memory System (`/memory`)

The `@socialagi/memory` package providing:

- **MemoryStream**: Vector-based memory storage and retrieval
- **Embeddings**: HuggingFace transformers for semantic similarity
- **Scoring**: Relevance calculation based on recency, importance, and similarity

### Tools (`/tools`)

The `@socialagi/tools` package offering:

- **WebLoader**: Web scraping with Puppeteer
- **Section Splitter**: Intelligent text chunking for RAG applications
- **Token Counter**: GPT tokenization utilities

## 🚀 Quick Start

### Installation

```bash
npm install socialagi
```

### Basic Usage (Legacy API)

```javascript
import { Soul, Blueprints } from "socialagi";

const soul = new Soul(Blueprints.SAMANTHA);
const conversation = soul.getConversation("example");

conversation.on("says", (text) => {
  console.log("🤖", text);
});

conversation.tell("Hello!");
```

### Advanced Usage (Next API)

```javascript
import { CortexStep, externalDialog, internalMonologue } from "socialagi/next";

let step = new CortexStep("Samantha");
step = step.withMemory([
  {
    role: "system",
    content: "You are Samantha, a helpful AI assistant",
  },
]);

// Internal thought process
step = await step.next(
  internalMonologue("How should I respond to this greeting?")
);
console.log("Thinks:", step.value);

// External response
step = await step.next(externalDialog("Keep it friendly and engaging"));
console.log("Says:", step.value);
```

## 📦 Core Components

### CortexStep

The fundamental building block for AI cognition. CortexStep represents a single step in the thought process, using functional programming principles for predictable, immutable state management.

```typescript
const step = new CortexStep("EntityName");
const nextStep = await step.next(cognitiveFunction);
```

**Key Features:**

- Immutable state management
- Functional composition
- OpenTelemetry instrumentation
- Strongly typed cognitive functions

### CortexScheduler

Orchestrates mental processes in response to events, converting event-driven interactions into synchronous, predictable workflows.

```typescript
const scheduler = new CortexScheduler(initialStep);
scheduler.register({
  name: "ProcessName",
  process: async (signal, memory, lastStep) => {
    // Process logic here
    return newStep;
  },
});

scheduler.dispatch("ProcessName", { role: "user", content: "Hello" });
```

### Cognitive Functions

Pre-built and customizable functions for common AI operations:

- **`externalDialog()`**: Generate spoken responses
- **`internalMonologue()`**: Create internal thoughts
- **`decision()`**: Make choices between options
- **`brainstorm()`**: Generate creative ideas
- **Custom functions**: Build domain-specific cognitive patterns

### Blueprints

Personality definitions that shape AI behavior:

```typescript
const blueprint = {
  name: "Samantha",
  essence: "an AI Kindred Spirit",
  personality: "Detailed personality description...",
  initialPlan: "Start with a friendly greeting",
  languageProcessor: Model.GPT_3_5_turbo,
  thoughtFramework: ThoughtFramework.Introspective,
};
```

## 🔧 Tools & Memory

### MemoryStream

Vector-based memory system with intelligent retrieval:

```typescript
import { MemoryStream } from "@socialagi/memory";

const memory = new MemoryStream();
await memory.store({
  id: "user-preference",
  content: "User likes coffee in the morning",
  importance: 80,
});

const relevantMemories = await memory.search(
  "What does the user like to drink?"
);
```

### WebLoader

Intelligent web scraping for RAG applications:

```typescript
import { WebLoader, createBrowser } from "@socialagi/tools";

const browser = await createBrowser();
const loader = new WebLoader({ browser, url: "https://example.com" });
const { pageContent, metadata } = await loader.load();
```

### Section Splitter

Smart text chunking that respects document structure:

```typescript
import { splitSections } from "@socialagi/tools";

const sections = splitSections(longText, 400); // 400 tokens per section
```

## 🌐 Integrations

### Discord Bots

- **samantha-discordbot**: Advanced conversational bot with personality
- **emobot-discordbot**: Emotion-focused interaction bot
- **opensouls-discordbot**: Community-focused bot

### Telegram Bots

- **social-tele-bot**: Telegram integration example

### Next.js Integration

Built-in React hooks and API handlers for web applications:

```typescript
import { useSoul } from "socialagi/integrations/nextjs";

const { tellSoul, messages, soulThoughts } = useSoul({
  blueprint: Blueprints.SAMANTHA,
  optionalOnNewMessage: (message) => console.log("New message:", message),
  optionalOnNewThought: (thought) => console.log("New thought:", thought),
});
```

## 📚 Examples

### Basic Examples

- **`example.ts`**: Simple conversation with Samantha
- **`example2.ts`**: Therapist persona with ReflectiveLP framework
- **`example3.ts`**: Custom blueprint creation
- **`example4.ts`**: Goal-driven behavior with metacognition

### Interactive Examples (Playground)

- **Angel & Devil**: Dual AI personas offering competing advice
- **Persista**: Persistent information-gathering bot
- **Samantha Variants**: Different emotional states and behaviors
- **Elon AI**: Job interview simulation
- **RAG Bot**: Retrieval-augmented generation example

### Key Example Patterns

**Goal-Driven Dialog:**

```javascript
const learningGoals = ["name", "favorite color", "favorite musician"];
// AI persists until all goals are achieved
```

**Emotional Intelligence:**

```javascript
step = await step.next(internalMonologue("How do I feel about this response?"));
const decision = await step.next(
  decision("Should I escalate or stay calm?", ["escalate", "stay_calm"])
);
```

**RAG Integration:**

```javascript
const relevantMemories = await memoryStream.search(userQuestion);
const response = await step.next(questionAnswer(source, relevantMemories));
```

## 📖 Documentation

Comprehensive documentation available at [socialagi.dev](https://socialagi.dev):

### Core Documentation

- **CortexStep**: API reference, examples, and advanced patterns
- **CortexScheduler**: Process management and event handling
- **Memory**: MemoryStream usage and embedding strategies
- **Language Models**: OpenAI integration and custom model support

### Guides & Tutorials

- **Getting Started**: Quick setup and basic usage
- **Building Cognitive Functions**: Custom function development
- **Goal-Driven Dialog**: Advanced conversation patterns
- **RAG Applications**: Memory-enhanced AI responses

## 🗂️ Repository Structure

```
SocialAGI/
├── core/                          # Main framework (socialagi package)
│   ├── src/                       # Source code
│   │   ├── blueprint.ts          # Personality definitions
│   │   ├── soul.ts               # Main Soul class
│   │   ├── cortexStep.ts         # Legacy CortexStep implementation
│   │   ├── cortexScheduler.ts    # Mental process orchestration
│   │   ├── conversationProcessor.ts # Conversation management
│   │   ├── languageModels/       # OpenAI and custom model support
│   │   ├── programs/             # Linguistic programs (personality, memory, etc.)
│   │   ├── integrations/         # Next.js and other integrations
│   │   └── next/                 # Next-generation API
│   │       ├── CortexStep.ts     # New CortexStep implementation
│   │       ├── cognitiveFunctions.ts # Built-in cognitive functions
│   │       ├── cortexScheduler.ts # Updated scheduler
│   │       └── languageModels/   # Enhanced language model support
│   ├── examples/                 # Example applications
│   ├── tests/                    # Comprehensive test suite
│   └── package.json             # Package configuration
├── memory/                       # Memory management (@socialagi/memory)
│   ├── src/
│   │   ├── MemoryStream.ts      # Core memory functionality
│   │   ├── embedding.ts         # HuggingFace embedding integration
│   │   ├── tokens.ts            # Tokenization utilities
│   │   └── instrumentation.ts   # OpenTelemetry setup
│   └── tests/                   # Memory system tests
├── tools/                       # Web scraping and text processing (@socialagi/tools)
│   ├── src/
│   │   ├── browser.ts           # Puppeteer web scraping
│   │   ├── sectionSplitter.ts   # Intelligent text chunking
│   │   └── tokenCounter.ts      # Token counting utilities
│   └── tests/                   # Tools tests
├── docs/                        # Documentation website (socialagi.dev)
│   ├── docs/                    # Documentation content
│   ├── blog/                    # Blog posts and articles
│   ├── src/                     # Docusaurus website source
│   └── static/                  # Static assets and example code
├── integrations/                # Platform integrations
│   ├── discord_bots/           # Discord bot examples
│   └── telegram/               # Telegram bot examples
└── example-webapp/             # Example web application
```

### Key Files and Their Roles

#### Core Framework Files

- **`core/src/soul.ts`**: Main Soul class, event emitter for AI interactions
- **`core/src/blueprint.ts`**: Personality definitions (Samantha, Confidante, etc.)
- **`core/src/cortexStep.ts`**: Legacy functional approach to LLM context building
- **`core/src/next/CortexStep.ts`**: Enhanced version with OpenAI function calling
- **`core/src/cortexScheduler.ts`**: Event-driven mental process orchestration
- **`core/src/conversationProcessor.ts`**: Conversation state management
- **`core/src/languageModels/openAI.ts`**: OpenAI API integration
- **`core/src/programs/`**: Modular linguistic programs for personality, memory, etc.

#### Memory System Files

- **`memory/src/MemoryStream.ts`**: Vector-based memory storage and retrieval
- **`memory/src/embedding.ts`**: HuggingFace transformers integration
- **`memory/src/tokens.ts`**: GPT tokenization utilities

#### Tools Files

- **`tools/src/browser.ts`**: Web scraping with Puppeteer
- **`tools/src/sectionSplitter.ts`**: Smart text chunking for RAG
- **`tools/src/tokenCounter.ts`**: Token counting and validation

#### Example Files

- **`core/examples/`**: Basic usage examples
- **`docs/static/example-code/`**: Interactive playground examples
- **`integrations/`**: Platform-specific bot implementations

## 🔄 Evolution & Recent Updates

SocialAGI has undergone significant evolution, with several major architectural improvements:

### Major Updates ([PR #98](https://github.com/dooart/SocialAGI/pull/98))

- **`/next` API**: New export with enhanced cognitive functions
- **OpenAI Function Calling**: Native integration with OpenAI's function calling
- **Strongly Typed Responses**: Zod-based type validation
- **OpenTelemetry Integration**: Comprehensive observability and tracing
- **OSS Model Support**: Support for OpenAI-compatible APIs

### Memory System ([PR #106](https://github.com/dooart/SocialAGI/pull/106))

- **`@socialagi/memory`**: Dedicated memory management package
- **Vector Embeddings**: HuggingFace transformers integration
- **RAG Support**: Retrieval-augmented generation capabilities

### Tools Package ([PR #87](https://github.com/dooart/SocialAGI/pull/87))

- **`@socialagi/tools`**: Web scraping and text processing utilities
- **Intelligent Chunking**: Respect for document structure in text splitting
- **Browser Automation**: Puppeteer-based web scraping

### Quality Improvements

- **Repetitiveness Detection**: Prevents repetitive dialog patterns
- **Enhanced Error Handling**: Better retry mechanisms and error recovery
- **Improved Documentation**: Comprehensive guides and examples
- **Test Coverage**: Extensive test suites for all components

## 👥 Contributing

We welcome contributions! Here's how to get involved:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/opensouls/SocialAGI.git
cd SocialAGI

# Install dependencies for core package
cd core
npm install

# Install dependencies for memory package
cd ../memory
npm install

# Install dependencies for tools package
cd ../tools
npm install
```

### Running Examples

```bash
# Run basic example
cd core
npm run test-example

# Run advanced examples
npm run test-example2
npm run test-example3
```

### Building Documentation

```bash
cd docs
npm install
npm run build
```

### Areas for Contribution

- **New Cognitive Functions**: Develop reusable patterns for AI behavior
- **Platform Integrations**: Add support for new platforms (Slack, WhatsApp, etc.)
- **Memory Enhancements**: Improve memory retrieval and storage mechanisms
- **Documentation**: Improve guides, examples, and API documentation
- **Testing**: Expand test coverage and add integration tests
- **Performance**: Optimize LLM interactions and memory usage

### Community

- **Discord**: Join our [Discord community](https://discord.gg/FCPcCUbw3p) for discussions
- **Twitter**: Follow [@socialagi](https://twitter.com/socialagi) for updates
- **GitHub Issues**: Report bugs and request features
- **Blog**: Read our thoughts on AI cognition at [socialagi.dev/blog](https://socialagi.dev/blog)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

SocialAGI builds upon the work of many in the AI community. Special thanks to:

- OpenAI for providing the foundational language models
- The open-source community for tools and libraries
- Contributors who have helped shape the framework
- The community of developers building AI Souls

---

**Ready to build your first AI Soul?** Start with our [quick start guide](https://socialagi.dev) or explore the [examples](./core/examples) to see SocialAGI in action!
