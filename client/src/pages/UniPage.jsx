import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Avatar, Card } from "flowbite-react";
import { set } from "mongoose";
import { FaStar } from "react-icons/fa";

export default function University() {
  const { uniSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/university/read?slug=${uniSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setUniversity(data.universities[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchUniversity();
  }, [uniSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="pink" size="xl" />
      </div>
    );
  }

  console.log(university);

  return (
    <main className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="flex mt-10">
        <Avatar
          img={university && university.logo}
          alt={university && university.title}
          size="xl"
          className="border rounded-full dark:border-gray-800"
          rounded
          objectFit="cover"
        />
      </div>
      <div className="mt-5 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-white">
          {university && university.title}
        </h1>
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 text-pretty">
          Located in {university && university.location} City
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty">
          {university && university.description}
        </p>
      </div>
      <div className="w-full flex flex-row mt-10 space-x-4">
        <div className="basis-1/3 space-y-6">
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Overall Rating</h2>
            <div className="flex items-center gap-3">
              <FaStar className="h-16 w-16" />
              <span className="text-6xl font-semibold">
                {university && university.countRatings}
              </span>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Rating Breakdown</h2>
            <span className="text-xl font-semibold">
              {university && university.averageRating}
            </span>
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <span className="text-xl font-semibold">
              {university && university.location}
            </span>
          </div>
        </div>
        <div className="basis-2/3">Ratings</div>
      </div>
    </main>
  );
}
