import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE = "app1kSSMQMY81N2t7";
const AIRTABLE_TABLE = "tbl6lz67jSVJbVk7q";

export async function POST(req: Request) {
  try {
    const { email, score, total, weakestLayer } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email je obvezen." }, { status: 400 });
    }

    await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: email,
              Score: `${score}/${total}`,
              "Najšibkejša plast": weakestLayer || "-",
              Datum: new Date().toISOString(),
            },
          },
        ],
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Napaka." }, { status: 500 });
  }
}
