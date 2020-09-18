export interface Diary {
    id?: string,
    userId?:string, 
    title?: string,
    category: 'public' | 'private',
    entryIds: [],  
    updatedAt?: string, 
    createdAt?: string 
}