import React, { useEffect, useState } from "react";
import PrTableRow from "./PrTableRow";
import PrTableHeader from "./PrTableHeader";
import { getAllPRsDetails } from "../service/getPrDetails";
import { PullRequestResponse } from "../types/types";
import Loader from "../shared/loader";
import ErrorContainer from "../shared/error";

const GitHubPRListContainer = () => {
  const [pullRequests, setPullRequests] = useState<PullRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const callRetry = ()=>{
    setLoading(true);
    setError("");
    fetchPRs();
  }

  useEffect(() => {
    fetchPRs();
  }, []);

  function fetchPRs() { getAllPRsDetails()
    .then((prResponse: PullRequestResponse[] | Error) => {
      if (!prResponse || !Array.isArray(prResponse)) {
        setError(prResponse.message || "Failed to fetch pull requests");
        console.log(prResponse);
        throw new Error("Invalid response received from getAllPRs");
      }
      console.log(prResponse);
      setPullRequests(prResponse);
    })
    .finally(() => {
      setLoading(false);
    })
    .catch((err: any) => {
      console.error(err);
      setError(err.message);
    }); }

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
        <Loader />
      ) : error ? (
      
        <ErrorContainer errorMsg={error} retry={callRetry}/>

      ) : (
        <div className="table table-success table-striped">
          <PrTableHeader
            onClearFilter={() => setSelectedLabel(null)}
            filterSelectedLabel={selectedLabel}
          />

          {filteredPRs.map((pr: any) => (
            <PrTableRow pr={pr} setSelectedLabel={setSelectedLabel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GitHubPRListContainer;
