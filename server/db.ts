import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

async function openDb() {
    return open({
        filename: "/tmp/database.db",
        driver: sqlite3.Database,
    });
}

export async function initialiseTable() {
    const db = await openDb();
    try {
        await db.run("DROP TABLE IF EXISTS url");
        await db.run(
            "CREATE TABLE IF NOT EXISTS url(shortened TEXT, original TEXT)"
        );
    } catch (e) {
        console.log(e);
    }
    return db;
}

export async function addShortenedUrl(
    db: Database,
    shortUrl: string,
    original: string
): Promise<boolean> {
    try {
        await db.run(`INSERT INTO url(shortened, original) VALUES(?, ?)`, [
            shortUrl,
            original,
        ]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getActualUrl(
    db: Database,
    shortUrl: string
): Promise<string> {
    try {
        const result = await db.get(
            `SELECT original from url WHERE shortened = ?`,
            [shortUrl]
        );
        return result.original;
    } catch (e) {
        console.log(e);
        return "";
    }
}
