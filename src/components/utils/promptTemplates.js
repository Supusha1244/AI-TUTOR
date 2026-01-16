export const summaryPrompt = (text) =>
  `Convert this into short revision notes:\n${text}`;

export const mcqPrompt = (text) =>
  `Create 5 MCQs with answers from:\n${text}`;
