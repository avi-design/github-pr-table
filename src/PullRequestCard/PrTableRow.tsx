import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { pullDateFormat } from "../utils/dateFormat";
import PRModalComponent from "../PRDetailSummaryModal/PRDetailsModal";
import { getPrDetailsType } from "../types/types";

interface PrTableRowprops {
  pr: getPrDetailsType;
  setSelectedLabel: (label: string) => void;
}

const PrTableRow = ({
  pr,
  setSelectedLabel,
}: PrTableRowprops) => {
  return (
    <div role="group">
      <Container className="border-bottom pb-1">
        <Row>
          <Col>
            <h5>{pr.title}</h5>
          </Col>
          <Col>
            {pr.labels.map((label) => (
              <button
                type="button"
                key={label.name}
                className="btn btn-outline-primary inline-block"
                title={label.description}
                style={{ backgroundColor: label.color, color: label.color }}
                onClick={() => setSelectedLabel(label.name)}
                aria-label={`Filter by label ${label.name}`}
                data-testid={`label-${label.name}`}
              >
                {label.name}
              </button>
            ))}
          </Col>
          <Col>
            <span>{pullDateFormat(pr.created_at) || "Invalid Date"}</span>
          </Col>
          <Col>
            <PRModalComponent prUrl={pr.url} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrTableRow;
