export type CommentType = { id: number; username: string; content: string };

export type QuestionType = {
  id: number;
  content: string;
  choiceA: string;
  choiceB: string;
  choiceAResult: number;
  choiceBResult: number;
};
