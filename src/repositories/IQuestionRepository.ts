/*
I define the contract for loading the Question[] list here. The Promise
return type lets the rest of the app retrieve questions asynchronously,
regardless of where a repository gets its data.
*/

import type { Question } from "../types/Question.js";

export interface IQuestionRepository {
    getQuestions(): Promise<Question[]>;
}