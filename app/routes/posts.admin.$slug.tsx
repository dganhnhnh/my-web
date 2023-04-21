import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { createPost, deletePost, getPost, updatePost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.slug, `params.slug is required`);

    if (params.slug === 'new') {
        return json({});
    } else {
        const post = await getPost(params.slug!);
        invariant(post, `Post not found: ${params.slug}`);
        return json({ post })
    }

};

export const action = async ({ request, params }: ActionArgs) => {
    const formData = await request.formData();

    const intent=formData.get('intent')
    const title = formData.get("title");

    if(intent === 'delete'){
        await deletePost(params.slug)
        return redirect("/posts/admin")
    }

    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors = {
        title: title ? null : "Title is required",
        slug: slug ? null : "Slug is required",
        markdown: markdown ? null : "Markdown is required",
    }
    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    )
    if (hasErrors) {
        return json(errors);
    }

    invariant(
        typeof title === "string",
        "title must be a string"
    );
    invariant(
        typeof slug === "string",
        "slug must be a string"
    );
    invariant(
        typeof markdown === "string",
        "markdown must be a string"
    );

    if (params.slug === 'new') {
        await createPost({ title, slug, markdown });
    }
    else {
        await updatePost(params.slug, { title, slug, markdown });
    }

    return redirect("/posts/admin");
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
    const errors = useActionData<typeof action>()
    const data = useLoaderData<typeof loader>()
    const navigation = useNavigation();
    const isCreating = Boolean(navigation.state === "submitting");
    const isNewPost = !data.post

    return (
        <Form method="post"
            key={data.post?.slug ?? 'new'}
        >
            <p>
                <label>
                    Post Title:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.title}</em>
                    ) : null}

                    <input
                        type="text"
                        name="title"
                        className={inputClassName}
                        defaultValue={data.post?.title}
                    />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.slug}</em>
                    ) : null}
                    <input
                        type="text"
                        name="slug"
                        className={inputClassName}
                        defaultValue={data.post?.slug}
                    />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">
                    Markdown:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.markdown}</em>
                    ) : null}
                </label>
                <br />
                <textarea
                    id="markdown"
                    rows={20}
                    name="markdown"
                    className={`${inputClassName} font-mono`}
                    defaultValue={data.post?.markdown}
                />
            </p>
            <div className="text-right" id="">
                {isNewPost ? 
                null : (
                    <button
                    type="submit"
                    name="intent"
                    value="delete"
                    className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
                    // disabled={isCreating}
                >
                    Delete Post

                </button>
                )}
                
                <button
                    type="submit"
                    name="intent"
                    value={isNewPost?"create":"update"}
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                    disabled={isCreating}
                >
                    {isNewPost?(isCreating ? "Creating..." : "Create Post"):"Edit Post"}

                </button>
            </div>
        </Form>
    );
}
