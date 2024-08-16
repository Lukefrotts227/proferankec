"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Combobox, ComboboxButton, ComboboxOptions, ComboboxOption, ComboboxInput, Field, Label, Textarea } from "@headlessui/react";
import StarRating from "./rating";
import { FiChevronDown } from 'react-icons/fi';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CoursesCombobox = ({ courses, setCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [query, setQuery] = useState("");

  const filteredCourses = query
    ? courses.filter((course) => {
        const courseName = course.name ? course.name.toString().toLowerCase() : "";
        const queryString = query ? query.toString().toLowerCase() : "";
        return courseName.includes(queryString);
      })
    : courses;

  const handleSelect = (course) => {
    setSelectedCourse(course);
    setCourse(course);
  };

  return (
    <>
      <Combobox value={selectedCourse} onChange={handleSelect}>
      <div className="relative">
        <ComboboxInput
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          displayValue={(course) => (course ? course.name : "")}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a course..."
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
          <FiChevronDown className="w-5 h-5 text-gray-400" />
        </ComboboxButton>
      </div>
      <ComboboxOptions className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
        {filteredCourses.length === 0 ? (
          <div className="p-2 text-gray-500">No courses found</div>
        ) : (
          filteredCourses.map((course) => (
            <ComboboxOption
              key={course.id}
              value={course}
              className={({ active }) =>
                `cursor-pointer select-none p-2 ${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                }`
              }
            >
              {course.name}
            </ComboboxOption>
          ))
        )}
      </ComboboxOptions>
    </Combobox> 
    </>
  );
};

const Review = ({ professor, session, userid }) => {
 
  const courses = professor.courses.map(({ course }) => course);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [lecture, setLecture] = useState(0);
  const [learning, setLearning] = useState(0);
  const [course, setCourse] = useState(courses[0]); // Default to the first course initially
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (session == null) {
      alert("You must be signed in to leave a review");
      setIsOpen(false);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (session == null) {
      alert("You must be signed in to leave a review");
      return;
    }

    
    console.log(session.user);

    const review = {
      professorId: professor.id,
      courseId: course.id,
      userId: userid,
      overallRating: rating,
      difficulty,
      workload,
      lecture,
      learning,
      comment
    };

    console.log('Submitting review:', review); // Log the review data for debugging

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Response data:', data); // Log the response data for debugging

      setIsOpen(false);
      setRating(0);
      setDifficulty(0);
      setWorkload(0);
      setLecture(0);
      setLearning(0);
      setComment("");
    } else {
      console.error("Failed to submit review");
      alert("Failed to submit review");
    }
  };

  return (
    <>
    <button 
      onClick={() => setIsOpen(true)} 
      className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out"
    >
      Leave a review
    </button>
  
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Leave a review for {professor.Prefix} {professor.Firstname} {professor.Lastname}
          </DialogTitle>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h1 className="text-gray-700 font-semibold mb-2">What course?</h1>
              <CoursesCombobox courses={courses} setCourse={setCourse} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h1 className="text-gray-700 font-semibold mb-2">Difficulty</h1>
                <StarRating rating={difficulty} onRatingChange={setDifficulty} />
              </div>
  
              <div>
                <h1 className="text-gray-700 font-semibold mb-2">Workload</h1>
                <StarRating rating={workload} onRatingChange={setWorkload} />
              </div>
  
              <div>
                <h1 className="text-gray-700 font-semibold mb-2">Lecture Quality</h1>
                <StarRating rating={lecture} onRatingChange={setLecture} />
              </div>
  
              <div>
                <h1 className="text-gray-700 font-semibold mb-2">Learning Value</h1>
                <StarRating rating={learning} onRatingChange={setLearning} />
              </div>
  
              <div className="sm:col-span-2">
                <h1 className="text-gray-700 font-semibold mb-2">Overall Rating</h1>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
            </div>
  
            <div className="mb-6">
              <Field>
                <Label className="block text-gray-700 font-semibold mb-2">Comment</Label>
                <Textarea 
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Field>
            </div>
  
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out w-full"
            >
              Submit Review
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  );
};

export default Review;
