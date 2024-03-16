import { Rating } from "flowbite-react";

export default function UniRating({ rating }) {
  return (
    <Rating size="md">
      <Rating.Star filled={rating >= 1 ? true : false} />
      <Rating.Star filled={rating >= 2 ? true : false} />
      <Rating.Star filled={rating >= 3 ? true : false} />
      <Rating.Star filled={rating >= 4 ? true : false} />
      <Rating.Star filled={rating >= 5 ? true : false} />
    </Rating>
  );
}
