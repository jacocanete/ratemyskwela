import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Avatar,
  Rating,
  Spinner,
  Pagination,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);

  console.log(totalUniversities);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/university/read");
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setTotalUniversities(data.totalUniversities);
          setUniversities(data.universities);
          if (data.universities.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch universities.");
        setShowMore(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleShowMore = async () => {
    const startIndex = universities.length;
    try {
      const res = await fetch(`/api/university/read?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUniversities((prev) => [...prev, ...data.universities]);
        if (data.universities.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch universities.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="pink" size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {universities.map((university) => (
          <Link to={`/${university.slug}`} className="flex">
            <Card
              key={university._id}
              className="w-full cursor-pointer mx-auto max-w-sm ring-pink-500 dark:ring-gray-800 hover:ring-1 flex flex-col p-2 bg-white dark:bg-gray-800 shadow-md border-0 dark:shadow-none rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
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
              <h2 className=" text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
                {university.title}
              </h2>
              <p className="mt-auto font-normal text-gray-600 dark:text-gray-400 line-clamp-4">
                {university.description}
              </p>
              <Rating className="mt-2 justify-end">
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {university.overallRating.toFixed(1)}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <span
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {university.totalRatings} reviews
                </span>
              </Rating>
            </Card>
          </Link>
        ))}
      </div>
      <div className="w-full my-8 flex flex-row justify-between">
        <p>
          Showing <span className="font-bold">{universities.length}</span> of{" "}
          <span className="font-bold">{totalUniversities}</span> results
        </p>
        {showMore && (
          <Button onClick={handleShowMore} color="pink">
            Show more
          </Button>
        )}
      </div>
    </div>
  );
}
