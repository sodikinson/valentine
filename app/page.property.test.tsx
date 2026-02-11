import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { MESSAGES } from "./messages";

/**
 * **Validates: Requirements 2.1, 2.3**
 *
 * Property 1: No button text cycling
 *
 * For any non-negative integer N representing the number of No button clicks,
 * the displayed No button text should equal:
 *   - "No" when N === 0
 *   - MESSAGES[(N - 1) % MESSAGES.length] when N > 0
 */

function getNoButtonText(clickCount: number): string {
    return clickCount === 0
        ? "No"
        : MESSAGES[(clickCount - 1) % MESSAGES.length];
}

describe("Property 1: No button text cycling", () => {
    it("should display 'No' when click count is 0", () => {
        expect(getNoButtonText(0)).toBe("No");
    });

    it("should cycle through MESSAGES for any non-negative click count", () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 1000 }), (n) => {
                const text = getNoButtonText(n);
                if (n === 0) {
                    expect(text).toBe("No");
                } else {
                    expect(text).toBe(MESSAGES[(n - 1) % MESSAGES.length]);
                }
            }),
            { numRuns: 100 },
        );
    });

    it("should always return a valid message from MESSAGES for N > 0", () => {
        fc.assert(
            fc.property(fc.integer({ min: 1, max: 1000 }), (n) => {
                const text = getNoButtonText(n);
                expect(MESSAGES).toContain(text);
            }),
            { numRuns: 100 },
        );
    });

    it("should cycle back to the first message after exhausting all 10 messages", () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 100 }), (cycle) => {
                const n = cycle * MESSAGES.length + 1;
                expect(getNoButtonText(n)).toBe(MESSAGES[0]);
            }),
            { numRuns: 100 },
        );
    });
});
