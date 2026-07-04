export const SUGGESTED_QUESTIONS = [
  "Tell me about your projects",
  "Show your experience",
  "What is your tech stack?",
  "Have you won any hackathons?"
];

export const WELCOME_MESSAGE = {
  title: "Agent Noir",
  subtitle: "I'm Vedant's AI Assistant.",
  description: "Ask me anything about Projects, Experience, Education, Hackathons, Tech Stack, Skills, Achievements, or Contact info."
};

export const CHAT_LIMITS = {
  /** Max user messages per browser session before the chatbot is silenced */
  MAX_MESSAGES_PER_SESSION: 20,
  /** How many past turns (user+assistant pairs) to send to the LLM as history */
  MAX_HISTORY_TURNS: 3,
  /** sessionStorage key for persisting count across SPA navigations */
  SESSION_KEY: 'vp_chat_count',
};
