import { Database } from "query:database";

export async function handleRequest(req: Request) {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const db = new Database("blog.sql");
    db.query("INSERT INTO post (title, content) VALUES (?, ?)", [title, content]);

    const url = new URL(req.url);

    return Response.redirect(`${url.origin}/`, 303);
}
