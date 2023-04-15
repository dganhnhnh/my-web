import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { useOptionalUser } from "~/utils";
import { logInOrSignUp, logOut } from "./_index";

export const loader = async () => {
  return json({
    posts: await getPosts()
  });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  // console.log(posts);
  return (
    <div>
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Posts</Link>
        </h1>
        {user ? (
          logOut
        ) : (
          // logInOrSignUp
          ""
        )}
      </header>
      <main >
        <ul className="justify-center bg-white px-4 py-3 font-medium shadow-sm sm:px-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className="text-blue-600 underline"
              >
                {post.title}
              </Link>
              <div className="font-small ">{post.createdAt}</div>
            </li>
          ))}
        </ul>
        
      </main>
    </div>
      
  );
}
