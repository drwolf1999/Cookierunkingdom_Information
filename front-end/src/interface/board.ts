export interface IBoard {
    id: number | null,
    username: string,
    password: string,
    content: string,
    title: string,
    date: string | null,
}

export interface IBoardForm {
    username: string,
    password: string,
    content: string,
    title: string,
}