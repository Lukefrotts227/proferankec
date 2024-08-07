"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Combobox, ComboboxButton, ComboboxOptions, ComboboxOption, ComboboxInput, Field, Label, Textarea } from "@headlessui/react";
import StarRating from "./rating";
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
        <div>
          <ComboboxInput
            displayValue={(course) => (course ? course.name : "")}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton>Choose a course</ComboboxButton>
        </div>
        <ComboboxOptions>
          {filteredCourses.map((course) => (
            <ComboboxOption key={course.id} value={course}>
              {course.name}
            </ComboboxOption>
          ))}
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
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Leave a review</button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="bg-white p-4 rounded">
            <DialogTitle>Leave a review for {professor.Prefix} {professor.Firstname} {professor.Lastname}</DialogTitle>
            <div className="py-5" />
            <form onSubmit={handleSubmit}>
              <div>
                <h1>What course?</h1>
                <CoursesCombobox courses={courses} setCourse={setCourse} />
              </div>
              <div className="pb-12" />

              <div>
                <div>
                  <h1>Difficulty</h1>
                  <StarRating rating={difficulty} onRatingChange={setDifficulty} />
                </div>

                <div>
                  <h1>Workload</h1>
                  <StarRating rating={workload} onRatingChange={setWorkload} />
                </div>

                <div>
                  <h1>Lecture Quality</h1>
                  <StarRating rating={lecture} onRatingChange={setLecture} />
                </div>

                <div>
                  <h1>Learning Value</h1>
                  <StarRating rating={learning} onRatingChange={setLearning} />
                </div>

                <div>
                  <h1>Overall Rating</h1>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>

              <div>
                <Field>
                  <Label>Comment</Label>
                  <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </Field>
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Review;
