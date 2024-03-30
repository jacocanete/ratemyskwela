import React from "react";
import { Card, Avatar } from "flowbite-react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <Card className="max-w-full flex flex-col shadow-md border-0 transition duration-300 ease-in-out ">
        <h2 className="text-4xl text-center font-bold">About Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-balance text-center">
          RateMyUni.com is your go-to destination for transparent university
          ratings. We're passionate about education and believe in empowering
          students with unbiased insights.
          <br />
          <br />
          Our platform allows students to anonymously rate their universities,
          helping others make informed decisions about their academic journey!
        </p>
        <h2 className="text-4xl text-center font-bold">Authors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-balance text-center">
          This project is a fun venture by a group of developers aiming to
          explore the MERN stack. We're diving into displaying data with REST
          API, securing it with Google OAuth, and managing state using Redux.
        </p>
        <div className="flex flex-row mx-auto w-full justify-center items-center gap-16">
          <Card className="max-w-md">
            <div className="flex flex-col items-center pb-10">
              <Avatar
                placeholderInitials="JC"
                rounded
                size="lg"
                className="mb-2"
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Jaco Cañete
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Full-stack Developer
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Message
                </a>
              </div>
            </div>
          </Card>
          <Card className="max-w-md">
            <div className="flex flex-col items-center pb-10">
              <Avatar
                placeholderInitials="RM"
                rounded
                size="lg"
                className="mb-2"
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Ryu Mendoza
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Full-stack Developer
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Message
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
