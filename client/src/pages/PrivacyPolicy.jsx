import React from "react";
import { Card } from "flowbite-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-2 min-h-screen">
      <Card className="max-w-full flex flex-col shadow-md border-0 transition duration-300 ease-in-out p-2">
        <h2 className="text-4xl text-center font-bold">Privacy Policy</h2>
        <h3 className="text-2xl font-bold">Introduction: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          We collect user information primarily for account management purposes.
          As this website is a student project, the data collected is solely for
          managing users within the platform. We do not intend to use this data
          for any purposes beyond the website itself.
        </p>

        <h3 className="text-2xl font-bold">
          Types of Data Collected - Personal Data:
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          We collect essential user information such as email addresses and
          usernames for registration. Users remain anonymous when interacting
          with the website. Additionally, the privacy of user emails and
          usernames are strictly protected.
        </p>

        <h3 className="text-2xl font-bold">Cookies:</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          Currently, our use of cookies is primarily for login functionality.
          Further details on cookie usage may be provided as development
          progresses.
        </p>

        <h3 className="text-2xl font-bold">Third-Party Services:</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          Our website may offer Google as an alternative registration option.
          However, aside from this feature, we do not utilize any additional
          third-party services.
        </p>

        <h3 className="text-2xl font-bold">Changes to This Policy: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          While updates to the Privacy Policy may occur, they are expected to be
          minimal given the nature of this project. Any changes will be
          communicated transparently to users.
        </p>
        <br />
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          For any questions or concerns regarding our Privacy Policy or data
          practices, please feel free to contact us directly.
        </p>
      </Card>
    </div>
  );
}
