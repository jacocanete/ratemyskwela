import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Avatar } from "flowbite-react";
import { set } from "mongoose";

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
      <div className="mt-5 space-y-4 ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-white">
          {university && university.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {university && university.description}
        </p>
      </div>
    </main>
  );
}
