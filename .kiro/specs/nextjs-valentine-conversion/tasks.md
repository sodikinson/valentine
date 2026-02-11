# Implementation Plan: Next.js Valentine Conversion

## Overview

Convert the static HTML/CSS/JS Valentine's Day project into a Next.js App Router application with TypeScript and CSS Modules. Tasks are ordered to establish project scaffolding first, then implement pages incrementally, and finally wire up testing.

## Tasks

- [x]   1. Initialize Next.js project and configure infrastructure
    - [x] 1.1 Create a Next.js App Router project with TypeScript
        - Initialize with `create-next-app` or manually create `package.json`, `tsconfig.json`, and `next.config.ts`
        - Configure `next.config.ts` with Giphy remote image patterns (`media1.giphy.com`, `media4.giphy.com`) and `unoptimized: true` for images
        - _Requirements: 6.1, 6.2_
    - [x] 1.2 Create root layout and global styles
        - Create `app/layout.tsx` with metadata (title: "Valentine"), html/body wrapper, and `globals.css` import
        - Create `app/globals.css` with box-sizing reset, body margin 0, and Arial font-family
        - _Requirements: 1.1, 5.1_

- [x]   2. Implement the Main Page
    - [x] 2.1 Create Main Page component and CSS Module
        - Create `app/page.module.css` mirroring `styles.css` exactly: body flex centering, pink background, title styling (2.5em, #d32f2f), button styling (green #4caf50 for Yes, red #f44336 for No, sizes, padding, border-radius), GIF container styling, and `transition: font-size 0.3s ease` on the Yes button class
        - Create `app/page.tsx` as a `"use client"` component with:
            - Module-level `MESSAGES` constant array with the 10 persuasive messages
            - `noClickCount` state (number, initial 0) and `yesFontSize` state (number, initial 1.5)
            - `handleNoClick`: increments `noClickCount`, multiplies `yesFontSize` by 1.5
            - `handleYesClick`: calls `router.push("/yes")` via `useRouter` from `next/navigation`
            - No button text derived as `noClickCount === 0 ? "No" : MESSAGES[(noClickCount - 1) % MESSAGES.length]`
            - Yes button with inline `style={{ fontSize: \`${yesFontSize}em\` }}`
            - `next/image` for the cat GIF with `unoptimized` prop
        - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 5.3, 5.4, 5.5, 6.3_

- [x]   3. Implement the Yes Page
    - [x] 3.1 Create Yes Page component and CSS Module
        - Create `app/yes/page.module.css` mirroring `yes_style.css`: flex centering, pink background, header text (3em, #d32f2f), GIF sizing (100% width, max-width 500px)
        - Create `app/yes/page.tsx` as a server component displaying the title "Knew you would say yes!" and the hugging characters GIF via `next/image` with `unoptimized`
        - _Requirements: 4.1, 4.2, 4.3, 5.2, 5.4, 5.5, 6.3_

- [x]   4. Checkpoint - Verify application runs correctly
    - Ensure the app builds without errors (`next build`)
    - Ensure all tests pass, ask the user if questions arise.

- [x]   5. Set up testing and write tests
    - [x] 5.1 Configure testing infrastructure
        - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `fast-check`, and `jsdom`
        - Create `vitest.config.ts` with jsdom environment and React plugin
        - _Requirements: 5.5_
    - [x] 5.2 Write unit tests for Main Page
        - Test that the page renders the title "Will you be my Valentine?????"
        - Test that Yes and No buttons render with correct initial text
        - Test that the cat GIF Image component has the correct src and `unoptimized` prop
        - Test that clicking Yes calls `router.push("/yes")`
        - Test that first No click changes text to "Are you sure?" and grows font size
        - Test that the MESSAGES array contains exactly the 10 specified messages
        - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.4, 3.1_
    - [x] 5.3 Write unit tests for Yes Page
        - Test that the page renders the title "Knew you would say yes!"
        - Test that the hugging GIF Image component has the correct src and `unoptimized` prop
        - _Requirements: 4.1, 4.2, 4.3, 6.3_
    - [x] 5.4 Write property test for No button text cycling
        - **Property 1: No button text cycling**
        - Generate random non-negative integers (0–1000) as click counts
        - For each N, simulate N No-button clicks and verify displayed text matches `N === 0 ? "No" : MESSAGES[(N - 1) % 10]`
        - Minimum 100 iterations
        - **Validates: Requirements 2.1, 2.3**
    - [x] 5.5 Write property test for Yes button font size growth
        - **Property 2: Yes button font size exponential growth**
        - Generate random non-negative integers (0–50) as click counts
        - For each N, simulate N No-button clicks and verify Yes button font size equals `1.5 * Math.pow(1.5, N)` within floating-point tolerance
        - Minimum 100 iterations
        - **Validates: Requirements 2.2**

- [x]   6. Final checkpoint - Ensure all tests pass
    - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties for the interactive button behavior
- Unit tests validate specific rendering and interaction examples
