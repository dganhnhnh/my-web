import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPosts() {
    return prisma.post.findMany();
}

export async function getPost(slug: string) {
    return prisma.post.findUnique({ where: { slug } })
}

export async function createPost(
    post: Pick<Post, "slug" | "title" | "markdown">
) {
    return prisma.post.create({ data: post });
}

export function updatePost(
    post: Pick<Post, "slug" | "title" |"markdown">) {
    return prisma.post.update({
        where: post,
        data: post
    });
}

export function deletePost(
    post: Pick<Post, "title">) {
    return prisma.post.deleteMany({
        where: post,
    });
}