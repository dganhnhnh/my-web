import { redirect, V2_MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const logInOrSignUp = (
  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
    <Link
      to="/join"
      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
    >
      Sign up
    </Link>
    <Link
      to="/login"
      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
    >
      Log In
    </Link>
  </div>
)

export const logOut = (
  <Form action="/logout" method="post">
    <button
      type="submit"
      className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
    >
      Logout
    </button>
  </Form>
)

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
            
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
                {user ? (
                  logOut
                ) : (
                  logInOrSignUp
                )}
                {user?.isAdmin ? (
                  <Link
                    to="/posts/admin"
                    className="text-xl text-blue-600 underline"
                  >
                    Blog admin
                  </Link>
                ) : (
                  ""
                )}

            </div>

        <div className="mx-auto mt-16 max-w-7xl text-center">
          <Link
            to="/posts"
            className="text-xl text-blue-600 underline"
          >
            Blog posts
          </Link>
        </div>

      </div>
    </main>
  );
}
