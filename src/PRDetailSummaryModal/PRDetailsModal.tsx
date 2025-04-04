import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getPRSummary } from "../service/getPrDetails";
import { formatLastUpdatedTime } from "../utils/dateFormat";
import { ModalDetails } from "../types/types";

const PRModalComponent = ({ prUrl }: { prUrl: string }) => {
  const [showModal, setShowModal] = useState(false);

  const [modalDetailsData, setmodalDetailsData] = useState<
    ModalDetails | undefined
  >();
  const handleClose = () => setShowModal(false);

  const handleShow = async () => {
    try {
      const PrSummaryRes = await getPRSummary(prUrl);
      setmodalDetailsData(PrSummaryRes);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Pull Request Details
      </Button>

      {modalDetailsData !== undefined && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{modalDetailsData.title}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalDetailsData.body}</Modal.Body>
          <Modal.Footer>
            <span>
              <strong>
                last Updated at :{" "}
                {formatLastUpdatedTime(modalDetailsData.updated_at)}
              </strong>
            </span>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PRModalComponent;
