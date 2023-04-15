import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    Form,
    isRouteErrorResponse,
    Link,
    useActionData,
    useLoaderData,
    useNavigation,
    useRouteError,
} from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { deletePost, getPost, updatePost } from "~/models/post.server";
import { ErrorBoundary } from "./posts.$slug";

export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.slug, `params.slug is required`);

    const post = await getPost(params.slug!);
    invariant(post, `Post not found: ${params.slug}`);

    const html = marked(post.markdown);
    return json({ html, post });
};


const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;


export default function PostSlug() {
    const { html, post } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {post!.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            {/* preview */}
            <Link to="./edit">Edit</Link>

        </main>
    );
}

ErrorBoundary