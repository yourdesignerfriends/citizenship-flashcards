/*
I define the shape of one flashcard here so the repository, service, and
controller can work with the same type safe data. The application stores
flashcards in Question[] lists, which fulfills the list requirement.
*/
export interface Question {
    id: number;
    category: string;
    question: string;
    answer: string;
}