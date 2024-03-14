import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Button, Card, Avatar } from "flowbite-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Wrap Card component with Link */}
        <Link to="/school-info">
          <Card className="max-w-sm hover:ring">
            <div className="flex">
              <Avatar
                img="https://upload.wikimedia.org/wikipedia/en/8/8c/Cebu_Institute_of_Technology_University_logo.png"
                rounded
                size="lg"
                className="border rounded-full"
              />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cebu Institute of Technology - University
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021
              so far, in reverse chronological order.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
