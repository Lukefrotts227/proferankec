"use client"

import { useSession } from "next-auth/client"; 
import { Dialog } from "@headlessui/react";
import { StarRating } from "./rating";
import useSWR, { mutate } from "swr";
import { useState } from "react";


const Review = ({ professor, course }) => {
    const [session, loading] = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState(0);    
    const [workload, setWorkload] = useState(0);
    const [lecture , setLecture] = useState(0);
    const [learning, setLearning] = useState(0); 
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        if(!session){
            alert("You must be signed in to leave a review");
            return;
        }

        e.preventDefault();
        const review = {
            professor: professor.id,
            course: course.id,
            rating,
            difficulty,
            workload,
            lecture,
            learning,
            comment
        }

        const res = await fetch("api/review", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        if(res.ok){
            setIsOpen(false);
            mutate(); 
            setRating(0);
            setDifficulty(0);
            setWorkload(0);
            setLecture(0);
            setLearning(0);
            setComment("");
        } else{
            console.error("failed to submit review");
            alert("Failed to submit review");
        }


    
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Leave a review</button>


        
        </>
    )


}


export default Review;