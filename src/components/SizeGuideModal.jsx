import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import "./SizeGuideModal.css";
import React from "react";
const medidas = [
  ["S", "110 cm", "68 cm"],
  ["M", "116 cm", "71 cm"],
  ["L", "122 cm", "74 cm"],
  ["XL", "128 cm", "77 cm"],
];
export default function SizeGuideModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered className="size-guide-modal">
      <Modal.Header closeButton>
        <Modal.Title>GUÍA DE TALLES</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Diseñado con un corte amplio. Elegí tu talle habitual.</p>
        <Table borderless size="sm">
          <thead>
            <tr>
              <th>TALLE</th>
              <th>PECHO</th>
              <th>LARGO</th>
            </tr>
          </thead>
          <tbody>
            {medidas.map(([talle, pecho, largo]) => (
              <tr key={talle}>
                <td>{talle}</td>
                <td>{pecho}</td>
                <td>{largo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
