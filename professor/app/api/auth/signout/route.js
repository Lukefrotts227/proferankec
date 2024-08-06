import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

async function signout(req) {
    const session = await getSession({ req });
    
    if (session) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect("/api/auth/signin");
    }
}
export {signout as POST}; 