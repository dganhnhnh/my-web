import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { loader } from "./posts.admin.$slug";
import invariant from "tiny-invariant";
import { getPost, updatePost } from "~/models/post.server";
import { marked } from "marked";
import { ErrorBoundary } from "./notes.$noteId";

// export async function action({ request, params }: ActionArgs) {
//     const { html, post } = useLoaderData<typeof loader>();
//     const formData = await request.formData();
//     const title = formData.get("title");
//     const slug = formData.get("slug");
//     const markdown = formData.get("markdown");
//     console.info(title)

//     const errors = {
//         title: title ? null : "Title is required",
//         slug: slug ? null : "Slug is required",
//         markdown: markdown ? null : "Markdown is required",
//     }
//     const hasErrors = Object.values(errors).some(
//         (errorMessage) => errorMessage
//     )
//     if (hasErrors) {
//         return json(errors);
//     }

//     invariant(
//         typeof title === "string",
//         "title must be a string"
//     );
//     invariant(
//         typeof slug === "string",
//         "slug must be a string"
//     );
//     invariant(
//         typeof markdown === "string",
//         "markdown must be a string"
//     );
//     const postData = {
//         slug: post.slug,
//         title: post.title,
//         markdown: post.markdown
//       };
//     await updatePost(postData);
//     return redirect("/posts/admin");
// }

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;


export default function EditPost() {
    const { html, post } = useLoaderData<typeof loader>();

    // const errors = useActionData<typeof action>()

    const navigation = useNavigation();
    const isCreating = Boolean(
        navigation.state === "submitting"
    );

    return (
        <main className="mx-auto max-w-4xl">
            <div>where are you</div>
            {/* edit post */}
            <div>
                <hr className="my-4" />
                {/* <Form method="post">
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
                                defaultValue={post.title}
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
                                defaultValue={post.slug}
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
                            defaultValue={post.markdown}
                        />
                    </p>
                    <p className="text-right">
                        <button
                            type="submit"
                            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                            disabled={isCreating}
                        >
                            {isCreating ? "Saving..." : "Save edit"}

                        </button>
                    </p>
                </Form> */}
            </div>

        </main>
    );
}

ErrorBoundary