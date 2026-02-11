import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Home from "./page";
import { MESSAGES } from "./messages";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

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

describe("Main Page", () => {
    beforeEach(() => {
        pushMock.mockClear();
    });

    it("renders the title 'Will you be my Valentine?????'", () => {
        render(<Home />);
        expect(
            screen.getByText("Will you be my Valentine?????"),
        ).toBeInTheDocument();
    });

    it("renders Yes and No buttons with correct initial text", () => {
        render(<Home />);
        expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
    });

    it("renders the cat GIF with correct src and unoptimized prop", () => {
        render(<Home />);
        const img = screen.getByAltText("Cute cat GIF");
        expect(img).toHaveAttribute(
            "src",
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif",
        );
        expect(img).toHaveAttribute("data-unoptimized", "true");
    });

    it("calls router.push('/yes') when Yes button is clicked", async () => {
        const user = userEvent.setup();
        render(<Home />);
        await user.click(screen.getByRole("button", { name: "Yes" }));
        expect(pushMock).toHaveBeenCalledWith("/yes");
    });

    it("changes No button text to 'Are you sure?' and grows Yes font size on first No click", async () => {
        const user = userEvent.setup();
        render(<Home />);
        const noButton = screen.getByRole("button", { name: "No" });
        const yesButton = screen.getByRole("button", { name: "Yes" });

        expect(yesButton).toHaveStyle({ fontSize: "1.5em" });

        await user.click(noButton);

        expect(
            screen.getByRole("button", { name: "Are you sure?" }),
        ).toBeInTheDocument();
        expect(yesButton).toHaveStyle({ fontSize: "2.25em" });
    });
});

describe("MESSAGES array", () => {
    it("contains exactly the 10 specified messages", () => {
        const expectedMessages = [
            "Are you sure?",
            "Really sure??",
            "Are you positive?",
            "Pookie please...",
            "Just think about it!",
            "If you say no, I will be really sad...",
            "I will be very sad...",
            "I will be very very very sad...",
            "Ok fine, I will stop asking...",
            "Just kidding, say yes please! ❤️",
        ];
        expect(MESSAGES).toHaveLength(10);
        expect([...MESSAGES]).toEqual(expectedMessages);
    });
});
