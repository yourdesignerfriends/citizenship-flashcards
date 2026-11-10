/*
I define the structure of one flashcard so every application layer uses
the same type-safe fields. A Question represents one item; Question[] is
the list type used to store and pass multiple flashcards through the app.
*/
export interface Question {
    id: number;
    category: string;
    question: string;
    answer: string;
}