import html from "./index.html";

interface Post {
    title: string;
    content: string;
    created_at: number;
}

export async function handleRequest(_: Request) {
    const db = new Database("blog.sql");
    const posts: Post[] = db.query("SELECT * FROM post ORDER BY created_at DESC");

    const body = html.replace("<!-- POSTS -->", generatePostsHTML(posts));

    return new Response(body, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
    });
}

function generatePostsHTML(posts: Post[]) {
    return posts
        .map(
            (post) => /*html*/ `
            <article>
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>
                    Posted on ${new Date(post.created_at * 1000).toLocaleString()}
                </p>
            </article>
            `,
        )
        .join("");
}
