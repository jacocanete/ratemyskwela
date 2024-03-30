import React from "react";
import { Card, Avatar } from "flowbite-react";
import { FaFacebook, FaGithub } from "react-icons/fa6";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <Card className="max-w-full flex flex-col shadow-md border-0 transition duration-300 ease-in-out p-2">
        <h1 className="text-4xl text-center font-bold">About</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-balance text-center">
          RateMySkwela.com is your go-to destination for transparent school
          ratings. We're passionate about education and believe in empowering
          students with unbiased insights.
          <br />
          <br />
          Our platform allows students to anonymously rate their schools,
          helping others make informed decisions about their academic journey!
        </p>
        <h2 className="text-3xl text-center font-bold">Authors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-balance text-center">
          This project is a fun venture by a group of developers aiming to
          explore the MERN stack. We're diving into displaying data with REST
          API, securing it with Google OAuth, and managing state using Redux.
        </p>
        <div className="flex flex-col lg:flex-row mx-auto w-full justify-center items-center gap-4 lg:gap-16 my-4">
          <Card className="min-w-64 ring-pink-500 dark:ring-gray-800 hover:ring-1 p-2 bg-white dark:bg-gray-800 shadow-md light:border-0 dark:shadow-none rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="flex flex-col items-center py-6">
              <Avatar
                img="https://firebasestorage.googleapis.com/v0/b/ratemyuni-6b086.appspot.com/o/LinkedIn%20Charcoal.png?alt=media&token=5aae90da-0089-4e5d-9260-518272d15ced"
                rounded
                size="xl"
                className="mb-4"
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Jaco Cañete
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Full-stack Developer
              </span>
              <div className="mt-4 flex gap-6 lg:mt-6">
                <a
                  href="https://www.facebook.com/jaco.canete/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/jacocanete"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </Card>
          <Card className="min-w-64  ring-pink-500 dark:ring-gray-800 hover:ring-1 p-2 bg-white dark:bg-gray-800 shadow-md light:border-0 dark:shadow-none rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="flex flex-col items-center py-6">
              <Avatar
                img="https://firebasestorage.googleapis.com/v0/b/ratemyuni-6b086.appspot.com/o/LinkedIn%20Charcoal%20(1).png?alt=media&token=7516a72e-0478-47f8-87d7-e073db99e0cc"
                rounded
                size="xl"
                className="mb-4"
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Ryu Mendoza
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Full-stack Developer
              </span>
              <div className="mt-4 flex gap-6 lg:mt-6">
                <a
                  href="https://www.facebook.com/luden666"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Ludensburger"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
