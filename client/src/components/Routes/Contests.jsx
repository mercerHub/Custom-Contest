import React, { useEffect, useState } from "react";
import useAuth from "../../contexts/UserContext";
import { server } from "../../constants";
import axios from "axios";
import ContestHeader from "./ContestHeader";
import { Triangle } from "react-loader-spinner";
import AddContestForm from "../Forms/AddContestForm";
import RemoveContestForm from "../Forms/RemoveContestForm";

function Contests() {
  const { user } = useAuth();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContests = async () => {
      if (user && Array.isArray(user.contests) && user.contests.length > 0) {
        try {
          const contestDetailsPromises = user.contests.map((contest_id) => {
            const response = axios.post(
              `${server}/contest/getContest`,
              {
                contest_id,
              },
              {
                withCredentials: true,
              }
            );
            return response;
          });

          const contestDetails = await Promise.all(contestDetailsPromises);
          var contestList = contestDetails.map((contest) => contest.data.data);
          setContests(contestList);
          setLoading(false);
        } catch (error) {
          console.log("Couldn't fetch contests !!", error);
        }
      }
    };

    fetchContests();
  }, [user]);

  return (
    <div className="flex gap-2">
      <div className="bg-black my-5 mx-8 rounded-xl h-[85vh] w-3/5 flex items-center justify-center flex-col gap-5 p-5">
        <div
          className={`bg-black w-5/6 hover:shadow-md text-gray-300 p-5 mt-5 rounded-xl text-3xl text-center border border-teal-700 select-none logoText-notlogo tracking-widest`}
        >
          CONTESTS
        </div>
        <div
          className={`h-[70vh] w-5/6 overflow-auto scrollbar-custom rounded-xl flex flex-col gap-3 scroll-smooth items-center ${loading ? "pt-20":""}`}
        >
          {loading ? (
            <Triangle height={160} color="white" />
          ) : (
            contests.map((contest) => {
              return (
                <div key={contest._id} className="text-white w-full">
                  <ContestHeader
                    id={contest.contestId}
                    problems={contest.problems}
                    name={contest.name}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex flex-col w-2/5 my-5 h-[85vh] mr-8 gap-2">
        <div className="bg-black rounded-xl h-1/2 flex items-center justify-center flex-col p-5">
          <AddContestForm/>
        </div>
        <div className="bg-black rounded-xl h-1/2 flex items-center justify-center flex-col ">
          <RemoveContestForm/>
        </div>
      </div>
    </div>
  );
}

export default Contests;
