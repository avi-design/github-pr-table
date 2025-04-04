import React, { useEffect, useState } from "react";
import PrTableRow from "./PrTableRow";
import PrTableHeader from "./PrTableHeader";
import { getAllPRsDetails } from "../service/getPrDetails";
import { PullRequest } from "../types/types";
import Loader from "../shared/loader";

const GitHubPRListContainer = () => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    getAllPRsDetails()
      .then((prResponse) => {
        if (!prResponse) {
          throw new Error("No response received from getAllPRs");
        }
        console.log(prResponse);
        setPullRequests(prResponse as PullRequest[]);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message);
      });
  }, []);
  const filteredPRs = selectedLabel
    ? pullRequests.filter((pr) =>
        pr.labels.some(
          (label) => label.name.toLowerCase() === selectedLabel.toLowerCase()
        )
      )
    : pullRequests;

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="table table-success table-striped">
         <PrTableHeader  onClearFilter={()=>setSelectedLabel(null)} filterSelectedLabel={selectedLabel} />

          {filteredPRs.map((pr: any) => (
            <PrTableRow pr={pr} setSelectedLabel={setSelectedLabel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GitHubPRListContainer; 

