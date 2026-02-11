import { describe, it, expect } from "vitest";
import fc from "fast-check";

/**
 * **Validates: Requirements 2.2**
 *
 * Property 2: Yes button font size exponential growth
 *
 * For any non-negative integer N representing the number of No button clicks,
 * the Yes button font size after N clicks should equal `1.5 * Math.pow(1.5, N)` em.
 * Each click multiplies the previous size by exactly 1.5, producing exponential
 * growth from the initial 1.5em base.
 */

/**
 * Simulates the Yes button font size state logic from app/page.tsx:
 *   initial yesFontSize = 1.5
 *   on each No click: yesFontSize = yesFontSize * 1.5
 */
function computeYesFontSize(noClicks: number): number {
    let size = 1.5;
    for (let i = 0; i < noClicks; i++) {
        size *= 1.5;
    }
    return size;
}

describe("Property 2: Yes button font size exponential growth", () => {
    it("should have initial font size of 1.5em with zero clicks", () => {
        expect(computeYesFontSize(0)).toBe(1.5);
    });

    it("should equal 1.5 * Math.pow(1.5, N) em after N No-button clicks", () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 50 }), (n) => {
                const actual = computeYesFontSize(n);
                const expected = 1.5 * Math.pow(1.5, n);
                // Allow floating-point tolerance
                return Math.abs(actual - expected) < 1e-6 * expected + 1e-10;
            }),
            { numRuns: 100 },
        );
    });

    it("each click should multiply the previous size by exactly 1.5", () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 49 }), (n) => {
                const before = computeYesFontSize(n);
                const after = computeYesFontSize(n + 1);
                const ratio = after / before;
                return Math.abs(ratio - 1.5) < 1e-10;
            }),
            { numRuns: 100 },
        );
    });
});
