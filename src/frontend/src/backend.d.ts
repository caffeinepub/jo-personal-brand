import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Post {
    id: bigint;
    title: string;
    content: string;
    createdAt: bigint;
    excerpt: string;
    category: string;
}
export interface Testimonial {
    id: bigint;
    clientName: string;
    createdAt: bigint;
    reviewText: string;
    rating: bigint;
    clientTitle: string;
}
export interface backendInterface {
    createPost(title: string, content: string, category: string, excerpt: string): Promise<bigint>;
    createTestimonial(clientName: string, clientTitle: string, reviewText: string, rating: bigint): Promise<bigint>;
    deletePost(id: bigint): Promise<boolean>;
    deleteTestimonial(id: bigint): Promise<boolean>;
    getAllLeads(): Promise<Array<Lead>>;
    getAllPosts(): Promise<Array<Post>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getPostById(id: bigint): Promise<Post | null>;
    submitLead(name: string, email: string, message: string): Promise<bigint>;
}
