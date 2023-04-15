import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { deletePost, getPost } from "~/models/post.server";
import {marked} from "marked";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug!);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json({ html, post });
};

export default function PostSlug() {
  const { html, post } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {post!.title}
      </h1>
      <div dangerouslySetInnerHTML={{__html:html}}></div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}