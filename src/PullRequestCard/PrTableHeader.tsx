import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

interface FilterBarProps {
  filterSelectedLabel: string | null;
  onClearFilter: () => void;
}
const PrTableHeader = ({
  filterSelectedLabel,
  onClearFilter,
}: FilterBarProps) => {
  return (
    <Container className="border pb-1">
      <Row>
        <Col xs={3} className="border border-bottom-0">
          <h4>Title</h4>
        </Col>
        <Col xs={3} className="border border-bottom-0">
          <h4>All labels</h4>
        </Col>
        <Col xs={3} className="border border-bottom-0">
          <h4>Date Opened</h4>
        </Col>

        <Col className="d-flex align-items-center" xs={3}>
          {filterSelectedLabel && (
            <div
              className="filter-bar"
              aria-live="polite"
              onClick={onClearFilter}
            >
              <button
                className="clear-filter d-inline-block"
                aria-label={`Clear filter for ${filterSelectedLabel}`}
              >
                <span className="cross-icon">×</span>
              </button>
              <span className="btn btn-link"> Clear Filter</span>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PrTableHeader;
