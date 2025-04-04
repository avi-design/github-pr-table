import { useEffect, useState } from "react";
import PrTableRow from "./PrTableRow";
import { Col, Container, Row } from "react-bootstrap";
import { getAllPRsDetails } from "../service/getPrDetails";
import { PullRequest } from "../types/types";
import Loader from "../shared/loader";

const GitHubPRList = () => {
  const [pullRequestsData, setPullRequestsData] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    getAllPRsDetails()
      .then((prResponse) => {
        if (!prResponse) {
          throw new Error("No response received from getAllPRs");
        }
        console.log(prResponse);
        setPullRequestsData(prResponse as PullRequest[]);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  const filteredPRs = pullRequestsData
    .filter((pr) =>
      pr.title.toLowerCase().includes(titleFilter.toLowerCase())
    )
    .filter((pr) => 
      selectedLabel 
      ? pr.labels.some(
          (label) => label.name.toLowerCase() === selectedLabel.toLowerCase()
        )
      : true
    );

  // Sort the filtered PRs
  const sortedPRs = filteredPRs.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    
    if (sortDirection === 'asc') {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h2 className="mb-4">Git Pull Requests Table</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <Container className="border">
            <Row>
              <Col xs={3} className="border border-bottom-0">
                <h4>Title</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    placeholder="Search by title"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="form-control"
                  />
                  <button className="btn btn-link" onClick={handleSort}>
                    {sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                  </button>
                </div>
              </Col>
              <Col xs={3} className="border border-bottom-0">
                <h4>All labels</h4>
              </Col>
              <Col xs={3} className="border border-bottom-0">
                <h4>Date opened</h4>
              </Col>
              <Col className="d-flex align-items-start" xs={3}>
                <FilterBar
                  selectedLabel={selectedLabel}
                  onClearFilter={() => setSelectedLabel(null)}
                />
              </Col>
            </Row>
          </Container>

          <Container>
            {sortedPRs.map((pr: any) => (
              <PrTableRow key={pr.id} pr={pr} setSelectedLabel={setSelectedLabel} />
            ))}
          </Container>
        </div>
      )}
    </div>
  );
};

export default GitHubPRList;

interface FilterBarProps {
  selectedLabel: string | null;
  onClearFilter: () => void;
}

const FilterBar = ({ selectedLabel, onClearFilter }: FilterBarProps) => {
  if (!selectedLabel) return null; // Don't render if no filter is selected

  return (
    <div className="filter-bar" aria-live="polite" onClick={onClearFilter}>
      <button className="clear-filter d-inline-block" aria-label={`Clear filter for ${selectedLabel}`}>
        <span className="cross-icon">×</span>
      </button>
      <span className="btn btn-link"> Clear Filter</span>
    </div>
  );
};
