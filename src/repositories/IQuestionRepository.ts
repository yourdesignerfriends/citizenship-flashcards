/*
I define a shared repository contract so services can request a Question[]
list without depending on a specific storage format. The Promise return
type allows implementations to load data asynchronously, such as from a file.
*/

import type { Question } from "../types/Question.js";

export interface IQuestionRepository {
    /*
    I require each repository implementation to provide this asynchronous
    operation and return its flashcards as a typed list.
    */
    getQuestions(): Promise<Question[]>;
}