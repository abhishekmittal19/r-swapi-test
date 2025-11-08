// src/setupTests.js
import '@testing-library/jest-dom';

// Create #root element for react-modal tests
beforeAll(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

afterAll(() => {
  const root = document.getElementById("root");
  if (root) document.body.removeChild(root);
});

