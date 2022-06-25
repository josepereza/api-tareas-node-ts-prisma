export interface ITask {
    id: number,
    name: string,
    description?: string,
    completed: boolean,
    created_at: string,
    updated_at: string
}