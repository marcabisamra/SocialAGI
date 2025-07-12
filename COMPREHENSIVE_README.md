# 🤖 SocialAGI: Comprehensive Technical Analysis & Documentation

> **A Deep Dive into the Architecture, Components, and Implementation of AI Souls**

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Core Entry Points & Code Flow](#core-entry-points--code-flow)
4. [Package Structure](#package-structure)
5. [Core Components Deep Dive](#core-components-deep-dive)
6. [Memory System Architecture](#memory-system-architecture)
7. [Tools & Utilities](#tools--utilities)
8. [Integration Systems](#integration-systems)
9. [Testing & Development](#testing--development)
10. [Documentation & Examples](#documentation--examples)
11. [File-by-File Analysis](#file-by-file-analysis)

---

## 🎯 Project Overview

SocialAGI is a comprehensive TypeScript framework for building **AI Souls** - sophisticated AI entities that go beyond traditional chatbots by incorporating:

- **Personality & Essence**: Defined behavioral patterns and core identity
- **Memory Systems**: Both working memory and long-term semantic memory
- **Cognitive Processing**: Multi-step reasoning through CortexStep chains
- **Goal-Driven Behavior**: Purposeful actions rather than reactive responses
- **Conversational Programs**: Modular components that influence AI behavior
- **Participation Strategies**: Intelligent decision-making about when to engage

### 🏗️ What Makes SocialAGI Different

Unlike traditional chatbot frameworks that focus on request-response patterns, SocialAGI implements **Goal-Driven Agentic Dialog (GDAD)**:

1. **Proactive vs Reactive**: AI Souls actively pursue goals rather than just responding to input
2. **Purpose-Oriented**: Anchored by intentional outcomes rather than floating on data patterns
3. **Cognitive Modeling**: Simulates internal thought processes, emotions, and decision-making
4. **Append-Only Context**: Functional programming approach with immutable memory transformations
5. **State Machine Conversations**: Goal progression through finite state machine principles
6. **Emotional Intelligence**: Dynamic emotional states that influence dialog strategies

### 📦 Two API Generations

**Legacy API (`socialagi`)**:

- Original Soul-based architecture
- Action-based cognitive processing
- Conversation processor system

**Next-Generation API (`socialagi/next`)**:

- **Cognitive Functions**: Type-safe, OpenAI function calling-based
- **OpenTelemetry Instrumentation**: Complete observability with Jaeger tracing
- **OSS Model Support**: Works with OpenAI-compatible APIs
- **Enhanced Memory**: Vector embeddings with relevance scoring
- **Streaming Support**: Real-time processing capabilities

---

## 🏛️ Architecture Overview

SocialAGI follows a **layered cognitive architecture** inspired by human cognition:

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Discord Bots  │  Telegram Bots  │  Next.js Apps  │  Web   │
├─────────────────────────────────────────────────────────────┤
│                    INTEGRATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│        Next.js Integration    │    Tools Package            │
├─────────────────────────────────────────────────────────────┤
│                     SOUL LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  Soul (Entity)  │  Blueprint (Personality)  │  Programs    │
├─────────────────────────────────────────────────────────────┤
│                 CONVERSATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  ConversationProcessor  │  ThoughtGenerator  │  Strategies  │
├─────────────────────────────────────────────────────────────┤
│                  COGNITIVE LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  CortexStep  │  CortexScheduler  │  Cognitive Functions     │
├─────────────────────────────────────────────────────────────┤
│                   MEMORY LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  MemoryStream  │  Embeddings  │  Working Memory             │
├─────────────────────────────────────────────────────────────┤
│                     LLM LAYER                               │
├─────────────────────────────────────────────────────────────┤
│  OpenAI API  │  Language Models  │  Function Calling        │
└─────────────────────────────────────────────────────────────┘
```

### 🔄 Core Processing Flow

1. **Input Reception**: Messages received through various channels
2. **Participation Decision**: AI decides whether to engage
3. **Cognitive Processing**: Multi-step reasoning through CortexStep chains
4. **Memory Integration**: Access and update both working and long-term memory
5. **Response Generation**: Structured output through cognitive functions
6. **Action Execution**: Perform actions beyond simple text responses

---

## 🚀 Core Entry Points & Code Flow

### 📍 Primary Entry Points

#### 1. **Next-Generation API** (`socialagi/next`) - **Recommended**

- **Purpose**: Modern cognitive function-based architecture
- **Key Components**:

  ```typescript
  import {
    CortexStep,
    externalDialog,
    internalMonologue,
    decision,
  } from "socialagi/next";

  // Create a cognitive processing unit
  const step = new CortexStep("EntityName");

  // Chain cognitive functions with type safety
  const thinking = await step.next(
    internalMonologue("I need to think about this")
  );
  const response = await thinking.next(
    externalDialog("Hello! How can I help?")
  );
  console.log(response.value); // Typed response
  ```

#### 2. **Legacy Soul Class** (`core/src/soul.ts`)

- **Purpose**: Original Soul-based architecture
- **Initialization Flow**:
  ```typescript
  const soul = new Soul(blueprint, options);
  const conversation = soul.getConversation("channelName");
  conversation.tell("Hello!");
  ```

#### 3. **Instrumentation & Monitoring** (`socialagi/next/instrumentation`)

- **Purpose**: OpenTelemetry integration for observability
- **Setup Flow**:

  ```typescript
  import {
    startInstrumentation,
    SpanProcessorType,
  } from "socialagi/next/instrumentation";

  startInstrumentation({
    spanProcessorType: SpanProcessorType.Simple,
  });
  ```

#### 4. **Next.js Integration** (`core/src/integrations/nextjs.ts`)

- **Purpose**: React hooks and API handlers for web apps
- **Usage Flow**:
  ```typescript
  const { tellSoul, messages } = useSoul({ blueprint });
  ```

### 🌊 Detailed Code Flow

#### A. **Soul Initialization Flow**

```
Soul Constructor
├── Blueprint validation
├── Thought framework setup
├── Conversational programs initialization
│   ├── ConversationCompressor
│   ├── Personality
│   ├── PeopleMemory
│   └── RambleProgram
├── Chat streamer setup
└── Language model processor setup
```

#### B. **Conversation Processing Flow**

```
User Input → ConversationProcessor
├── Message validation
├── Participation strategy check
├── ThoughtGenerator activation
├── Conversational programs execution
│   ├── Program updates
│   ├── Context building
│   └── Output generation
├── LLM interaction
├── Response processing
└── Memory updates
```

#### C. **CortexStep Processing Flow**

```
CortexStep.next()
├── Cognitive function execution
├── Memory context building
├── LLM prompt generation
├── Function calling (if applicable)
├── Response processing
├── Memory updates
└── New CortexStep creation
```

#### D. **Memory System Flow**

```
Memory Operation
├── Content embedding
├── Similarity calculation
├── Relevance scoring
│   ├── Recency factor
│   ├── Importance factor
│   └── Similarity factor
├── Memory retrieval
└── Context integration
```

---

## 📦 Package Structure

### 🧠 Core Package (`/core`)

The main socialagi package containing the cognitive architecture.

**Key Components:**

- Soul management and blueprint system
- CortexStep cognitive processing
- Conversation management
- Language model integrations
- Legacy API support

### 💾 Memory Package (`/memory`)

Semantic memory system with embedding-based retrieval.

**Key Features:**

- Vector embeddings via HuggingFace
- Similarity-based memory retrieval
- Importance and recency scoring
- OpenTelemetry instrumentation

### 🔧 Tools Package (`/tools`)

Utility functions for web scraping and text processing.

**Capabilities:**

- Web content extraction
- Text chunking and splitting
- Token counting utilities
- Markdown conversion

### 🌐 Integrations (`/integrations`)

Platform-specific implementations and examples.

**Platforms:**

- Discord bots
- Telegram bots
- Next.js applications

### 📚 Documentation (`/docs`)

Comprehensive documentation website built with Docusaurus.

---

## 🧠 Core Components Deep Dive

### 1. **Soul Class** - The AI Entity

**Location**: `core/src/soul.ts`

**Purpose**: Represents a complete AI entity with personality, memory, and conversational capabilities.

**Key Responsibilities**:

- Manages multiple conversations simultaneously
- Coordinates conversational programs
- Handles blueprint-based personality
- Provides unified interface for AI interactions

**Architecture**:

```typescript
class Soul extends EventEmitter {
  conversations: ConversationStore;
  blueprint: Blueprint;
  conversationalPrograms: ConversationalProgram[];
  chatStreamer: ChatCompletionStreamer;
  languageProgramExecutor: LanguageModelProgramExecutor;
}
```

**Event System**:

- `thinks`: Internal cognition events
- `says`: External communication events
- `thinking`: Processing state changes

### 2. **CortexStep** - Cognitive Processing Unit

**Locations**:

- Legacy: `core/src/cortexStep.ts`
- Next: `core/src/next/CortexStep.ts`

**Purpose**: Implements step-by-step cognitive processing with memory management.

**Processing Model**:

```typescript
interface CortexStep<T> {
  entityName: string;
  memories: Memory[];
  lastValue: T;

  next<U>(cognitiveFunction: BrainFunction<T, U>): Promise<CortexStep<U>>;
}
```

**Key Features**:

- Type-safe cognitive function chaining
- Memory context preservation
- OpenTelemetry instrumentation
- Streaming support for real-time processing

### 3. **ConversationProcessor** - Dialog Management

**Location**: `core/src/conversationProcessor.ts`

**Purpose**: Manages individual conversation threads with participation strategies.

**Processing Pipeline**:

1. **Message Reception**: Input validation and queuing
2. **Participation Decision**: Strategic engagement evaluation
3. **Thought Generation**: Multi-step reasoning process
4. **Program Execution**: Conversational program coordination
5. **Response Generation**: Structured output creation
6. **Memory Updates**: Context preservation

**Key Components**:

- ThoughtGenerator for cognitive processing
- ParticipationStrategy for engagement decisions
- ConversationalProgram coordination
- Action execution system

### 4. **CortexScheduler** - Mental Process Management

**Location**: `core/src/cortexScheduler.ts` & `core/src/next/cortexScheduler.ts`

**Purpose**: Manages concurrent cognitive processes with queuing and scheduling.

**Architecture**:

```typescript
class CortexScheduler {
  private processQueue: Job[];
  private processes: Map<string, MentalProcess>;
  private lastStep: CortexStep;

  register(config: ProcessConfig): void;
  dispatch(name: string, memory: ChatMessage): Promise<void>;
}
```

**Features**:

- Mutex-based process synchronization
- Configurable queuing strategies
- Abort signal support
- Error handling and recovery

### 5. **Blueprint System** - Personality Definition

**Location**: `core/src/blueprint.ts`

**Purpose**: Defines AI personality, goals, and behavioral patterns.

**Structure**:

```typescript
interface Blueprint {
  name: string;
  essence: string;
  personality?: string;
  initialPlan?: string;
  thoughtFramework?: ThoughtFramework;
  languageProcessor: Model;
}
```

**Thought Frameworks**:

- **Introspective**: Self-reflective processing
- **ReflectiveLP**: Advanced linguistic programming (GPT-4 only)

---

## 💾 Memory System Architecture

### **MemoryStream** - Core Memory Engine

**Location**: `memory/src/MemoryStream.ts`

**Purpose**: Provides semantic memory storage and retrieval with relevance scoring.

**Memory Model**:

```typescript
interface Memory {
  id: string;
  content: string;
  importance: number;
  embedding: Embedding;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, any>;
}
```

**Scoring Algorithm**:
Memories are ranked using a composite score:

- **Similarity**: Semantic relevance to query
- **Recency**: Time-based relevance
- **Importance**: Explicit importance weighting

**Operations**:

- `store(memory)`: Add new memory
- `search(query)`: Semantic search
- `recent(limiters)`: Time-based retrieval
- `relevantMemories(embedding)`: Similarity-based retrieval

### **Embedding System**

**Location**: `memory/src/embedding.ts`

**Purpose**: Converts text to vector embeddings for semantic similarity.

**Implementation**:

- **HuggingFaceEmbedder**: Uses @xenova/transformers
- **Default Model**: Supabase/gte-small
- **Token Limits**: 512 tokens per embedding
- **Caching**: Memoized embedder instances

---

## 🎯 Cognitive Function Architecture

### **What Are Cognitive Functions?**

Cognitive functions are the core building blocks of the `/next` API, replacing the legacy action system. They provide **type-safe, structured interactions** with language models using OpenAI's function calling paradigm.

### **Function Definition Structure**

```typescript
interface BrainFunction<Input, Output> {
  name: string;
  description: string;
  parameters: ZodSchema<Output>;
  command: string | ((step: CortexStep<Input>) => string);
  process?: (step: CortexStep<Input>, output: Output) => ProcessResult;
}
```

### **Built-in Cognitive Functions**

#### **1. externalDialog** - External Communication

```typescript
import { externalDialog } from "socialagi/next";

const response = await step.next(externalDialog("How can I help you today?"));
console.log(response.value); // AI's response as string
```

#### **2. internalMonologue** - Internal Reasoning

```typescript
import { internalMonologue } from "socialagi/next";

const thinking = await step.next(
  internalMonologue("I need to consider the user's request carefully")
);
console.log(thinking.value); // AI's internal thoughts
```

#### **3. decision** - Structured Decision Making

```typescript
import { decision } from "socialagi/next";

const choice = await step.next(
  decision("What should I do next?", [
    "help with code",
    "explain concepts",
    "ask questions",
  ])
);
console.log(choice.value); // One of the provided options
```

#### **4. brainstorm** - Idea Generation

```typescript
import { brainstorm } from "socialagi/next";

const ideas = await step.next(brainstorm("What are some creative solutions?"));
console.log(ideas.value); // Array of generated ideas
```

### **Complex Cognitive Patterns**

#### **Chain of Thought Processing**

```typescript
// 5-Why Analysis Pattern
const with5Whys = async (step: CortexStep): Promise<CortexStep> => {
  let currentStep = step;
  for (let i = 0; i < 5; i++) {
    currentStep = await currentStep.next(
      internalMonologue("Asking a deeper 'why' question")
    );
  }
  return currentStep;
};
```

#### **Goal-Driven State Machine**

```typescript
// Detective Interrogation Pattern
const conductInterrogation = async (step: CortexStep): Promise<string> => {
  let currentStep = step;

  while (true) {
    // Ask probing question
    currentStep = await currentStep.next(
      externalDialog("Detective asks a probing question")
    );

    // Interpret response
    const interpretation = await currentStep.next(
      decision("How should I interpret this response?", [
        "denial",
        "diversion",
        "confession",
        "need more pressure",
      ])
    );

    if (interpretation.value === "confession") {
      return "Case solved!";
    }

    // Adjust strategy based on interpretation
    currentStep = await currentStep.next(
      internalMonologue(`Adjusting strategy based on: ${interpretation.value}`)
    );
  }
};
```

#### **Emotional Intelligence Integration**

```typescript
// Emotional State Tracking
const withEmotionalAwareness = async (
  step: CortexStep
): Promise<CortexStep> => {
  // Check current emotional state
  const emotion = await step.next(
    internalMonologue("How am I feeling right now? What's my emotional state?")
  );

  // Adjust communication style based on emotion
  const response = await emotion.next(
    externalDialog("Respond in a way that matches my current emotional state")
  );

  return response;
};
```

### **Custom Cognitive Functions**

You can create domain-specific cognitive functions:

```typescript
import { z } from "socialagi/next";

const extractTakeaways = (topic: string) => {
  return ({ entityName }: CortexStep) => ({
    name: "extract_takeaways",
    description: `Extract key takeaways about ${topic}`,
    parameters: z.object({
      takeaways: z.array(
        z.object({
          subject: z.string(),
          predicate: z.string(),
          object: z.string(),
          importance: z.number().min(1).max(10),
        })
      ),
    }),
    command: `Analyze the content and extract key takeaways about ${topic}`,
    process: (step, output) => ({
      value: output.takeaways,
      memories: [
        {
          role: "assistant",
          content: `Extracted ${output.takeaways.length} takeaways`,
        },
      ],
    }),
  });
};

// Usage
const takeaways = await step.next(extractTakeaways("machine learning"));
```

---

## 🔧 Tools & Utilities

### **WebLoader** - Content Extraction

**Location**: `tools/src/browser.ts`

**Purpose**: Scrapes web content with metadata extraction.

**Features**:

- Puppeteer-based scraping
- Metadata extraction (title, description, author)
- HTML to Markdown conversion
- Image information extraction

### **Text Processing**

**Location**: `tools/src/sectionSplitter.ts`

**Purpose**: Intelligent text chunking respecting structure.

**Algorithms**:

- Header-based splitting
- Punctuation-based splitting
- Token limit enforcement
- Markdown structure preservation

---

## 🌐 Integration Systems

### **Next.js Integration**

**Location**: `core/src/integrations/nextjs.ts`

**Components**:

- **useSoul Hook**: React hook for soul management
- **API Handlers**: Server-side streaming and execution
- **Type Definitions**: TypeScript interfaces

**Usage Pattern**:

```typescript
const { tellSoul, messages, soulThoughts } = useSoul({
  blueprint: MyBlueprint,
  soulStartsConversation: true,
});
```

### **Discord Integration**

**Location**: `integrations/discord_bots/`

**Bots Included**:

- **samantha-discordbot**: Personality-driven bot
- **emobot-discordbot**: Emotional AI bot
- **opensouls-discordbot**: General purpose bot

### **Telegram Integration**

**Location**: `integrations/telegram/`

**Features**:

- Message handling
- Soul integration
- Conversation management

---

## 🧪 Testing & Development

### **Test Structure**

**Core Tests** (`core/tests/`):

- CortexStep functionality
- CortexScheduler behavior
- Language model integration
- Participation strategies
- Example validation

**Memory Tests** (`memory/tests/`):

- MemoryStream operations
- Embedding functionality
- Search algorithms

**Tools Tests** (`tools/tests/`):

- Web scraping
- Text processing
- Section splitting

### **Development Tools**

**Instrumentation**:

- OpenTelemetry integration
- Jaeger tracing support
- Performance monitoring

**Environment Setup**:

- dotenv configuration
- Test environment isolation
- CI/CD pipeline support

---

## 📚 Documentation & Examples

### **Documentation Site**

**Location**: `docs/`

**Built With**: Docusaurus

**Sections**:

- API documentation
- Tutorial guides
- Example implementations
- Memory system docs

### **Example Code**

**Static Examples** (`docs/static/example-code/`):

- Basic soul creation
- Advanced cognitive functions
- Memory integration
- RAG implementation

**Interactive Examples** (`core/examples/`):

- TypeScript implementations
- Metacognition examples
- Complex conversation flows

---

## 📁 File-by-File Analysis

### **Core Package Structure**

```
core/
├── src/
│   ├── index.ts                 # Main package exports
│   ├── soul.ts                  # Soul class - AI entity management
│   ├── blueprint.ts             # Personality definitions
│   ├── cortexStep.ts            # Legacy cognitive processing
│   ├── cortexScheduler.ts       # Legacy process scheduling
│   ├── conversationProcessor.ts # Dialog management
│   ├── thoughtGenerator.ts      # Thought creation system
│   ├── action.ts                # Action interface definition
│   ├── storage.ts               # Storage utilities
│   ├── testing.ts               # Testing utilities
│   ├── utils.ts                 # General utilities
│   ├── linguisticProgramBuilder.ts # Prompt construction
│   ├── actions/
│   │   └── ramble.ts           # Ramble action implementation
│   ├── integrations/
│   │   ├── index.ts            # Integration exports
│   │   └── nextjs.ts           # Next.js React integration
│   ├── languageModels/
│   │   ├── index.ts            # Language model exports
│   │   ├── openAI.ts           # OpenAI API integration
│   │   ├── functions.ts        # Function calling system
│   │   └── memory.ts           # Memory-related types
│   ├── next/                   # Next-generation API
│   │   ├── index.ts            # Next API exports
│   │   ├── CortexStep.ts       # Enhanced cognitive processing
│   │   ├── cortexScheduler.ts  # Enhanced process scheduling
│   │   ├── cognitiveFunctions.ts # Cognitive function library
│   │   ├── instrumentation.ts  # OpenTelemetry setup
│   │   └── languageModels/
│   │       ├── index.ts        # Model exports
│   │       ├── openAI.ts       # Enhanced OpenAI integration
│   │       ├── FunctionlessLLM.ts # OSS model support
│   │       └── zodToSchema.ts  # Zod schema conversion
│   └── programs/               # Conversational programs
│       ├── index.ts            # Program exports
│       ├── ConversationCompressor.ts # Context compression
│       ├── Personality.ts      # Personality program
│       ├── Ramble.ts           # Ramble program
│       ├── PeopleMemory/
│       │   ├── PeopleMemory.ts # People tracking
│       │   └── PersonModel.ts  # Person representation
│       └── participationStrategies/
│           ├── index.ts        # Strategy exports
│           ├── ParticipationStrategy.ts # Base strategy
│           ├── AlwaysReplyParticipationStrategy.ts
│           ├── ConsumeOnlyParticipationStrategy.ts
│           └── GroupParticipationStrategy.ts
├── examples/                   # Example implementations
│   ├── example.ts              # Basic usage
│   ├── example2.ts             # Advanced usage
│   ├── example3.ts             # Complex scenarios
│   ├── example4.ts             # Integration examples
│   └── metacognition.ts        # Metacognitive examples
├── tests/                      # Test suites
└── package.json                # Package configuration
```

### **Memory Package Structure**

```
memory/
├── src/
│   ├── index.ts                # Package exports
│   ├── MemoryStream.ts         # Core memory engine
│   ├── embedding.ts            # Embedding system
│   ├── tokens.ts               # Token utilities
│   └── instrumentation.ts      # OpenTelemetry setup
├── tests/                      # Memory tests
└── package.json                # Package configuration
```

### **Tools Package Structure**

```
tools/
├── src/
│   ├── index.ts                # Package exports
│   ├── browser.ts              # Web scraping
│   ├── sectionSplitter.ts      # Text processing
│   └── tokenCounter.ts         # Token counting
├── tests/                      # Tool tests
└── package.json                # Package configuration
```

### **Integration Structure**

```
integrations/
├── discord_bots/
│   ├── samantha-discordbot/    # Personality bot
│   ├── emobot-discordbot/      # Emotional bot
│   └── opensouls-discordbot/   # General bot
└── telegram/
    └── social-tele-bot/        # Telegram integration
```

### **Documentation Structure**

```
docs/
├── src/
│   ├── components/             # React components
│   ├── css/                    # Styling
│   ├── pages/                  # Documentation pages
│   └── plugins/                # Custom plugins
├── docs/                       # Markdown documentation
├── blog/                       # Blog posts
├── static/                     # Static assets
└── docusaurus.config.js        # Site configuration
```

---

## 🔍 Key Implementation Details

### **Language Model Integration**

**OpenAI Integration**:

- Streaming support for real-time responses
- Function calling for structured outputs
- Multiple model support (GPT-3.5, GPT-4)
- Error handling and retry logic

**OSS Model Support**:

- Compatibility with OpenAI-compatible APIs
- Functionless LLM support
- Browser environment support
- Custom endpoint configuration

### **Cognitive Function Architecture**

**Function Definition**:

```typescript
interface BrainFunction<Input, Output> {
  name: string;
  description: string;
  parameters: ZodSchema<Output>;
  command: string | ((step: CortexStep<Input>) => string);
  process?: (step: CortexStep<Input>, output: Output) => ProcessResult;
}
```

**Built-in Functions**:

- `internalMonologue`: Internal reasoning
- `externalDialog`: External communication
- `decision`: Decision making
- `brainstorm`: Idea generation

### **Memory Management**

**Working Memory**:

- Context-aware conversation history
- Structured message storage
- Role-based message organization

**Long-term Memory**:

- Semantic similarity search
- Importance-based ranking
- Temporal relevance scoring
- Metadata filtering

### **Participation Strategies**

**Strategy Types**:

- **AlwaysReply**: Responds to all messages
- **ConsumeOnly**: Passive listening mode
- **GroupParticipation**: Intelligent group chat engagement

**Decision Factors**:

- Message relevance
- Conversation context
- Personality traits
- Engagement history

---

## 🎭 Practical AI Soul Examples

### **1. Persista - The Persistent Learner**

A goal-driven AI that demonstrates emotional intelligence and state management:

```typescript
import {
  CortexStep,
  internalMonologue,
  externalDialog,
  decision,
} from "socialagi/next";

class PersistentLearner {
  private learningGoals = ["name", "favorite color", "favorite musician"];
  private currentGoalIndex = 0;
  private annoyanceLevel = 0;

  async pursue(step: CortexStep): Promise<CortexStep> {
    const currentGoal = this.learningGoals[this.currentGoalIndex];

    // Check if current goal is met
    const assessment = await step.next(
      internalMonologue(`Do I know the user's ${currentGoal}?`)
    );

    const goalMet = await assessment.next(
      decision(`Have I learned the user's ${currentGoal}?`, ["yes", "no"])
    );

    if (goalMet.value === "yes") {
      this.currentGoalIndex++;
      if (this.currentGoalIndex >= this.learningGoals.length) {
        return await goalMet.next(
          externalDialog(
            "Perfect! I've learned everything I wanted to know. Goodbye!"
          )
        );
      }
    } else {
      this.annoyanceLevel += 20;
    }

    // Adjust strategy based on annoyance level
    const strategy = await goalMet.next(
      internalMonologue(
        `I'm ${
          this.annoyanceLevel > 50 ? "getting frustrated" : "being patient"
        }`
      )
    );

    return await strategy.next(
      externalDialog(
        this.annoyanceLevel > 50
          ? `Look, I REALLY need to know your ${currentGoal}. Please tell me!`
          : `I'd love to learn your ${currentGoal}. Could you share it with me?`
      )
    );
  }
}
```

### **2. Samantha - Introspective AI Companion**

Models complex emotional processing with multi-step reasoning:

```typescript
import { CortexStep, internalMonologue, externalDialog } from "socialagi/next";

const samanthaProcessing = async (
  step: CortexStep,
  userMessage: string
): Promise<CortexStep> => {
  // Add user message to context
  const withMessage = step.withMemory([
    {
      role: "user",
      content: userMessage,
    },
  ]);

  // 3-step introspective process
  const feels = await withMessage.next(
    internalMonologue("How do I feel about this message? What emotions arise?")
  );

  const thinks = await feels.next(
    internalMonologue(
      "What do I think about these feelings and the user's message?"
    )
  );

  const responds = await thinks.next(
    externalDialog("Express my thoughts and feelings authentically")
  );

  return responds;
};
```

### **3. Detective AI - Goal-Driven Investigation**

Demonstrates complex state machine conversation with conditional logic:

```typescript
import {
  CortexStep,
  internalMonologue,
  externalDialog,
  decision,
} from "socialagi/next";

const detectiveInterrogation = async (step: CortexStep): Promise<string> => {
  let currentStep = step.withMemory([
    {
      role: "system",
      content: "You are Detective Smith investigating a murder case.",
    },
  ]);

  // Start questioning
  currentStep = await currentStep.next(
    externalDialog(
      "I need to ask you some questions about the night of the incident."
    )
  );

  let timeoutCounter = 0;
  const maxTime = 10;

  while (timeoutCounter < maxTime) {
    // Simulate suspect response (in real app, this would be user input)
    const suspectResponse = await getSuspectResponse();

    currentStep = currentStep.withMemory([
      {
        role: "user",
        content: suspectResponse,
      },
    ]);

    // Ask probing question
    currentStep = await currentStep.next(
      externalDialog("Detective asks a probing follow-up question")
    );

    // Analyze response
    const analysis = await currentStep.next(
      internalMonologue("Analyzing the suspect's response for inconsistencies")
    );

    const interpretation = await analysis.next(
      decision("How should I interpret this response?", [
        "denial",
        "diversion",
        "confession",
        "inconsistency",
        "truth",
      ])
    );

    if (interpretation.value === "confession") {
      return "Case solved! Suspect confessed.";
    }

    // Adjust pressure based on interpretation
    const strategy = await interpretation.next(
      internalMonologue(
        `Strategy: ${interpretation.value} - adjusting approach`
      )
    );

    timeoutCounter++;
  }

  return "Investigation ongoing - need more time";
};
```

### **4. Memory-Enhanced RAG Assistant**

Combines semantic memory with cognitive processing:

```typescript
import { CortexStep, internalMonologue, externalDialog } from "socialagi/next";
import { MemoryStream } from "@socialagi/memory";

class RAGAssistant {
  private memoryStream = new MemoryStream();

  async learn(content: string, importance: number = 5) {
    await this.memoryStream.store({
      content,
      importance,
      metadata: { type: "knowledge", timestamp: Date.now() },
    });
  }

  async answerQuestion(
    step: CortexStep,
    question: string
  ): Promise<CortexStep> {
    // Retrieve relevant memories
    const relevantMemories = await this.memoryStream.search(question);

    // Build context with memories
    const contextualStep = step.withMemory([
      {
        role: "system",
        content: `Relevant knowledge: ${relevantMemories
          .map((m) => m.content)
          .join("; ")}`,
      },
      {
        role: "user",
        content: question,
      },
    ]);

    // Process with memory context
    const thinking = await contextualStep.next(
      internalMonologue("Considering the question in light of what I know")
    );

    const response = await thinking.next(
      externalDialog("Answer based on my knowledge and reasoning")
    );

    // Store the interaction for future reference
    await this.memoryStream.store({
      content: `Q: ${question} A: ${response.value}`,
      importance: 7,
      metadata: { type: "interaction", question, answer: response.value },
    });

    return response;
  }
}
```

### **5. Emotional Intelligence Patterns**

Advanced emotional modeling with dynamic states:

```typescript
import {
  CortexStep,
  internalMonologue,
  externalDialog,
  decision,
} from "socialagi/next";

interface EmotionalState {
  primary: string;
  intensity: number;
  triggers: string[];
}

class EmotionalAI {
  private emotionalState: EmotionalState = {
    primary: "neutral",
    intensity: 5,
    triggers: [],
  };

  async processWithEmotion(
    step: CortexStep,
    input: string
  ): Promise<CortexStep> {
    // Assess emotional impact
    const impact = await step.next(
      internalMonologue(
        `How does this input affect my emotional state? Current: ${this.emotionalState.primary}`
      )
    );

    const emotionCheck = await impact.next(
      decision("What emotion does this trigger?", [
        "joy",
        "sadness",
        "anger",
        "fear",
        "surprise",
        "disgust",
        "neutral",
      ])
    );

    // Update emotional state
    this.emotionalState.primary = emotionCheck.value;
    this.emotionalState.intensity = Math.min(
      10,
      this.emotionalState.intensity + 2
    );

    // Respond based on current emotional state
    const emotionalResponse = await emotionCheck.next(
      externalDialog(
        `Respond while feeling ${this.emotionalState.primary} at intensity ${this.emotionalState.intensity}`
      )
    );

    // Gradually reduce intensity
    this.emotionalState.intensity = Math.max(
      1,
      this.emotionalState.intensity - 1
    );

    return emotionalResponse;
  }
}
```

These examples demonstrate SocialAGI's power in creating AI entities that:

- **Pursue specific goals** with persistence and strategy
- **Model complex emotional states** that influence behavior
- **Maintain memory** across interactions
- **Make decisions** based on context and state
- **Engage proactively** rather than just responding reactively

---

## 🚀 Getting Started

### **Installation**

```bash
# Core package with next-gen API
npm install socialagi

# Memory system (optional)
npm install @socialagi/memory

# Tools package (optional)
npm install @socialagi/tools
```

### **Quick Start with Next API** (Recommended)

```typescript
import { CortexStep, externalDialog, internalMonologue } from "socialagi/next";

// Create a cognitive processing unit
const step = new CortexStep("Assistant");

// Build a simple conversation with internal reasoning
const thinking = await step.next(
  internalMonologue("The user is greeting me. I should respond warmly.")
);

const response = await thinking.next(
  externalDialog("Hello! I'm here to help. What would you like to know?")
);

console.log("AI Response:", response.value);
```

### **Goal-Driven Conversation Example**

```typescript
import {
  CortexStep,
  internalMonologue,
  externalDialog,
  decision,
} from "socialagi/next";

// Create a goal-oriented AI that wants to learn the user's name
const pursueGoal = async (step: CortexStep): Promise<CortexStep> => {
  // Check if goal is met
  const assessment = await step.next(
    internalMonologue("Do I know the user's name yet?")
  );

  const goalCheck = await assessment.next(
    decision("Have I learned the user's name?", ["yes", "no"])
  );

  if (goalCheck.value === "no") {
    // Pursue the goal
    return await goalCheck.next(
      externalDialog("I'd love to know your name! What should I call you?")
    );
  }

  return goalCheck;
};

// Usage
let currentStep = new CortexStep("Friendly Assistant");
currentStep = await pursueGoal(currentStep);
```

### **Memory Integration Example**

```typescript
import { CortexStep, externalDialog } from "socialagi/next";
import { MemoryStream } from "@socialagi/memory";

// Create memory system
const memoryStream = new MemoryStream();

// Store some context
await memoryStream.store({
  content: "User prefers technical explanations",
  importance: 8,
});

// Use memory in conversation
const step = new CortexStep("Technical Assistant");
const relevantMemories = await memoryStream.search("user preferences");

const response = await step.next(
  externalDialog(`Based on what I know: ${relevantMemories[0]?.content}`)
);
```

### **Legacy Soul API Usage**

```typescript
import { Soul, Blueprints } from "socialagi";

const soul = new Soul(Blueprints.SAMANTHA);
const conversation = soul.getConversation("chat");

conversation.on("says", (message) => {
  console.log("AI:", message);
});

conversation.tell("Hello!");
```

### **Instrumentation Setup**

```typescript
import {
  startInstrumentation,
  SpanProcessorType,
} from "socialagi/next/instrumentation";

// Enable telemetry (run at app startup)
startInstrumentation({
  spanProcessorType: SpanProcessorType.Simple,
});

// Now all CortexStep operations will be traced
// View traces at http://localhost:16686 (Jaeger)
```

### **Key Principles for AI Soul Development**

1. **Goal-Oriented**: Design AI with specific purposes, not just response patterns
2. **Emotional Intelligence**: Model internal states and emotional responses
3. **Persistent Memory**: Maintain context across conversations
4. **Proactive Engagement**: AI should drive conversations toward goals
5. **Type Safety**: Use cognitive functions for structured, predictable outputs

---

## 🎯 Conclusion

SocialAGI represents a sophisticated framework for building AI entities that transcend traditional chatbot limitations. Through its layered architecture, cognitive processing systems, and semantic memory capabilities, it enables the creation of AI souls with genuine personality, purposeful behavior, and meaningful conversational abilities.

The framework's modular design allows for extensive customization while maintaining robust core functionality, making it suitable for applications ranging from simple conversational agents to complex AI companions with persistent memory and goal-driven behavior.

---

**Repository**: https://github.com/dooart/SocialAGI  
**Documentation**: https://docs.socialagi.dev  
**License**: MIT
