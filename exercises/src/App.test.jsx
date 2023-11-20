import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  HelloWorld,
  PropsComponent,
  ButtonComponent,
  ListAndMap,
  BooleanState,
  SubmitCredential,
  LifeCycle,
} from "./App";

describe("App", () => {
  it("renders Hello World!", () => {
    render(<HelloWorld />);

    // Use getByText to find the element with the specified text content
    const hello = screen.getByText("Hello World!");

    // Use expect to assert that the element is present in the document
    expect(hello).toBeInTheDocument(
      "Expected 'Hello World!' to be rendered in the document."
    );
  });

  it("renders Greetings name", () => {
    render(<PropsComponent name="Marco" />);

    const greetings = screen.getByText("Greetings Marco!");

    expect(greetings).toBeInTheDocument(
      "Expected 'Greetings Marco!' to be rendered in the document."
    );
  });

  it("button correctly clicked", async () => {
    render(<ButtonComponent />);

    const button = screen.getByRole("button");
    await fireEvent.click(button);
    const updatedCount = screen.getByText("1");

    expect(updatedCount).toBeInTheDocument(
      "Expected the counter to be 1, from 0, when the button is pressed"
    );
  });

  it("renders the array passed as prop", () => {
    const items = [3, 4, 5, 6];
    render(<ListAndMap items={items} />);

    // Check for the presence of each item in the array
    items.forEach((item) => {
      const itemElement = screen.getByText(item.toString());
      expect(itemElement).toBeInTheDocument(
        "Expected the array to be printed on the page."
      );
    });
  });

  it("button correctly clicked", async () => {
    render(<BooleanState />);

    const button = screen.getByRole("button");
    await fireEvent.click(button);
    const updatedCount = screen.getByText("cliccato");

    expect(updatedCount).toBeInTheDocument(
      "Expected the text to be 'cliccato' after the button is clicked, transitioning from 'non cliccato'."
    );
  });

  it("submits the form with the entered credentials", async () => {
    render(<SubmitCredential />);

    const alertSpy = vi.spyOn(window, "alert");

    // Fill in the form inputs
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "john_doe" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Check if the alert is displayed with the correct message
    const alertMessage = "Username: john_doe | Password: secret123";
    expect(alertSpy).toHaveBeenCalledWith(alertMessage);
  });

  it("renders the name of the pokemon fetched", async () => {
    render(<LifeCycle />);

    // Wait for the asynchronous fetch operation to complete
    await waitFor(() => {
      const nameElement = screen.queryByText((content, element) => {
        // Check if the content includes "ditto" and it's not inside certain elements
        return (
          content.includes("ditto") &&
          !["script", "style"].includes(element.tagName.toLowerCase())
        );
      });

      // Use expect to assert that the element is present in the document
      expect(nameElement).toBeInTheDocument();
    });
  });
});
