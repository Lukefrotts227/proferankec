"use client"

import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { StarRating } from "./rating";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 


const Review = ({ professor, session }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState(0);    
    const [workload, setWorkload] = useState(0);
    const [lecture , setLecture] = useState(0);
    const [learning, setLearning] = useState(0); 
    const [course, setCourse] = useState(''); 
    const [comment, setComment] = useState("");
    

    const buttonClick = () => {
        setIsOpen(true); 
        if(session == null){
            setIsOpen(false);
            alert("You must be signed in to leave a review");
            return; 
        }
    }
    

    const handleSubmit = async (e) => {
        console.log(session)
        if(session == null){
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
            <button onClick={buttonClick} className="bg-blue-500 text-white px-4 py-2 rounded">Leave a review</button>

            <Dialog open= {isOpen} onClose= {() => setIsOpen(false)}>
                <div className = "fixed inset-0 bg-black bg-opacity-50" />
                <div className = "fixed inset-0 flex items-center justify-center">

                    <DialogPanel className="bg-white p-4 rounded">
                        <DialogTitle>Leave a review for {professor.Prefix} {professor.Firstname} {professor.Lastname} </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Menu>
                                    
                                </Menu>
                            </div>
                        </form>
                    </DialogPanel>
                    
                </div>
            </Dialog>
        
        </>
    )


}


export default Review;