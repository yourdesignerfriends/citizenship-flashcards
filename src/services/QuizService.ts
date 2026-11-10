/*
I use this service class for quiz-related data operations, keeping them
separate from terminal input/output and file access. It works with a
Question[] list supplied by the repository and can return that list as-is
or filter it by category without changing the order of the flashcards.
*/
import type { IQuestionRepository } from "../repositories/IQuestionRepository.js";
import type { Question } from "../types/Question.js";

export class QuizService {
    /*
    I receive the repository through the constructor so this service can
    request flashcards without knowing whether they come from JSON or another
    data source. This keeps the service class focused on quiz operations.
    */
    constructor(private readonly repository: IQuestionRepository) {}

    /*
    I return the complete Question[] list from the repository when the user
    chooses to study all questions. The Promise return type communicates that
    retrieving the data is asynchronous, and I preserve its original order.
    */
    getAllQuestions(): Promise<Question[]> {
        return this.repository.getQuestions();
    }

    /*
    I use this method after the user selects a category. I await the
    repository's asynchronous result, then create a filtered Question[] list
    containing only matching flashcards; filter preserves their input order.
    */
    async getQuestionsByCategory(category: string): Promise<Question[]> {
        const questions = await this.repository.getQuestions();
        return questions.filter(
            /*
            I compare each flashcard's category with the user's selection.
            This callback returns true only for cards that should stay in
            the filtered list.
            */
            (question) => question.category === category,
        );
    }
}
