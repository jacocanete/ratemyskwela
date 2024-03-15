import { useEffect, useState } from "react";
import { Button, Card, Avatar, Rating } from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("/api/university/read");
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUniversities(data.universities);
        }
      } catch (error) {
        toast.error("Failed to fetch universities.");
      }
    };
    fetchUniversities();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {universities.map((university) => (
          <Card
            key={university._id}
            className="cursor-pointer mx-auto max-w-sm ring-pink-500 dark:ring-gray-800 hover:ring-1 flex flex-col p-2 bg-white dark:bg-gray-800 shadow-md dark:shadow-none rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="flex">
              <Avatar
                img={university.logo}
                alt={university.title}
                size="lg"
                className="border rounded-full dark:border-gray-800"
                rounded
              />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {university.title}
            </h5>
            <p className="mt-auto font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
              {university.description}
            </p>
            <Rating className="mt-2 justify-end">
              <Rating.Star />
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                {university.averageRating.toFixed(2)}
              </p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              <a
                href="#"
                className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                {university.totalRatings} reviews
              </a>
            </Rating>
          </Card>
        ))}
      </div>
    </div>
  );
}
