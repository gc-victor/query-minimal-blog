import html from "./index.html";

export async function handleRequest(_: Request) {
    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
    });
}
