import React from "react";
import { Card } from "flowbite-react";

export default function TermsOfService() {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-5 min-h-screen">
      <Card className="max-w-full flex flex-col shadow-md border-0 transition duration-300 ease-in-out p-2">
        <h2 className="text-4xl text-center font-bold">Terms of Service</h2>
        <h3 className="text-2xl font-bold">Authenticity: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          Users are required to provide genuine and truthful reviews based on
          their personal experiences. Reviews must refrain from containing any
          false, misleading, or defamatory information.
        </p>
        <h3 className="text-2xl font-bold">Proprietary Rights: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          By submitting a review, users grant the platform permission to use and
          share the review within the community for non-commercial purposes.
          This license allows the platform to facilitate user interaction and
          community engagement without engaging in any commercial exploitation.
        </p>

        <h3 className="text-2xl font-bold">No Conflicts of Interest: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          Users must confirm that they have no financial or other conflicts of
          interest influencing their review.
        </p>

        <h3 className="text-2xl font-bold">Responsibility for Content: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          Users bear full responsibility for the content of their reviews and
          any consequences arising from its publication.
        </p>

        <h3 className="text-2xl font-bold">Right to Remove: </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          The platform reserves the right to delete any review that violates
          these terms and conditions or is deemed inappropriate, offensive, or
          in contravention of the law.
        </p>

        <br />
        <p className="text-lg text-gray-600 dark:text-gray-400 text-pretty text-left">
          By submitting a review, users acknowledge that they have read,
          understood, and consent to abide by these terms and conditions.
        </p>
      </Card>
    </div>
  );
}
