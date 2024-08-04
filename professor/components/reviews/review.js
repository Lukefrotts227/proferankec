"use client"

import { useSession } from "next-auth/client"; 

const Review = ({ professor }) => {
    const [session, loading] = useSession();
    

}

export default Review;