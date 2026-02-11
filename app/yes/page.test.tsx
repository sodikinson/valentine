import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import YesPage from "./page";

vi.mock("next/image", () => ({
    default: (props: Record<string, unknown>) => {
        const { unoptimized, ...rest } = props;
        return (
            <img
                {...rest}
                data-unoptimized={unoptimized ? "true" : undefined}
            />
        );
    },
}));

describe("Yes Page", () => {
    it("renders the title 'Knew you would say yes!'", () => {
        render(<YesPage />);
        expect(screen.getByText("Knew you would say yes!")).toBeInTheDocument();
    });

    it("renders the hugging GIF with correct src and unoptimized prop", () => {
        render(<YesPage />);
        const img = screen.getByAltText("Hugging characters");
        expect(img).toHaveAttribute(
            "src",
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif",
        );
        expect(img).toHaveAttribute("data-unoptimized", "true");
    });
});
