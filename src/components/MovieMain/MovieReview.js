import React, { useEffect, useState } from "react";
import Titles from "../user/Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "./UserInput";
import { getSingleReview, postReview } from "../../api/movie";
import { useAuth } from "../../hooks";
import Stars from "../Stars";

export default function MovieReview({ id }) {
  const Ratings = [
    {
      title: "0 -Poor",
      value: 0,
    },
    {
      title: "1 -Fair",
      value: 1,
    },
    {
      title: "2 -Good",
      value: 2,
    },
    {
      title: "3 -Very Good",
      value: 3,
    },
    {
      title: "4 -Excellent",
      value: 4,
    },
    {
      title: "5 -Materpiece",
      value: 5,
    },
  ];

  const { authInfo } = useAuth();
  const user = {
    id: authInfo.profile?.id,
  };

  const handelSubmit = async () => {
    const { error, reviews } = await postReview(id, rating, content, user);
    if (error) return;
  };

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [content, setContent] = useState();

  const fetchReview = async () => {
    if (id) {
      const { error, reviews } = await getSingleReview(id);
      if (error) return;
      setReview(reviews);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [id]);

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* Write Review */}
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-text font-semibold">Write A Review</h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie .It will be posted on this page.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Ratings"
              options={Ratings}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex mt-4 text-lg gap-2 text-star"><Stars value={rating}/></div>
          </div>
          <Message
            label="Message"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Make it short and sweet...."
          />
          <button
            onClick={handelSubmit}
            className="bg-subMain text-white py-3 w-full flex-colo rounded"
          >
            Submit
          </button>
        </div>
        {/* Reviews */}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">Reviews (56)</h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {review &&
              review.map((it, index) => {
                return (
                  <div className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                    <div className="col-span-2 bg-main hidden md:block">
                      <img
                        src="/user.jpg"
                        className="w-full h-24 rounded-lg object-cover"
                      />
                    </div>

                    <div className="col-span-7 text-white flex flex-col gap-2">
                      <h2>{it.owner.name}</h2>
                      <p className="text-xs leading-6 font-medium text-text">
                        {it.content}
                      </p>
                    </div>
                    {/* Rates */}
                    <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                      <Stars value={it.rating}/>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
