/*
I keep the quiz's question-retrieval logic in this class. I return the
ordered Question[] list or filter it by category, and I use async/await
when category filtering needs the repository's asynchronous result.
*/
import type { IQuestionRepository } from "../repositories/IQuestionRepository.js";
import type { Question } from "../types/Question.js";

export class QuizService {
    constructor(private readonly repository: IQuestionRepository) {}

    getAllQuestions(): Promise<Question[]> {
        return this.repository.getQuestions();
    }

    async getQuestionsByCategory(category: string): Promise<Question[]> {
        const questions = await this.repository.getQuestions();
        return questions.filter((question) => question.category === category);
    }
}
