// app/api/cart/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "cart.json");

export async function GET() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const cart = JSON.parse(data);
        return NextResponse.json(cart);
    } catch (error) {
        // If the file doesn’t exist, return an empty cart array
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(request: Request) {
    try {
        const cartData = await request.json();
        await fs.writeFile(filePath, JSON.stringify(cartData, null, 2), "utf-8");
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to write cart data" },
            { status: 500 }
        );
    }
}
