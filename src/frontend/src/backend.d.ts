import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    createdAt: bigint;
    excerpt: string;
    category: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    createPost(title: string, content: string, excerpt: string, category: string): Promise<bigint>;
    deletePost(id: bigint): Promise<boolean>;
    getAllMessages(): Promise<Array<ContactMessage>>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getPostById(id: bigint): Promise<BlogPost | null>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
}
