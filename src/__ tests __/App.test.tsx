// src/__ tests __/App.test.tsx

import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import App from "../App";


test("Renders the main page", () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
})