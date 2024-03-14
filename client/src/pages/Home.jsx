import React from "react";
import { Button, Card, Avatar, Rating } from "flowbite-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order. The combined value of the
          </p>
          <Rating className="mt-2 justify-end">
            <Rating.Star />
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              4.95
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a
              href="#"
              className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              73 reviews
            </a>
          </Rating>
        </Card>
      </div>
    </div>
  );
}
