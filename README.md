# Bill Splitter

Bill Splitter is a bill-splitting app that turns a receipt photo into a reviewed item list, lets you assign dishes to people, and calculates the final totals with service charge.



## What is this?

Bill Splitter solves the awkward, repetitive part of splitting a restaurant bill after the meal. A user uploads a receipt, reviews the extracted items, adds the people at the table, assigns dishes, and gets a final per-person breakdown without doing the arithmetic manually. The core mechanic is a guided multi-step flow that keeps the extracted bill as the source of truth while the user refines it step by step.

## Live Demo

There is no public live demo deployed yet.

## Tech Stack

- Next.js 16 App Router: the app benefits from a clean server/client split, file-based routing, and easy API route co-location for the extraction endpoint.
- React 19: the UI is entirely state-driven and step-based, which fits React’s component model well for orchestrating the workflow.
- TypeScript: the bill, item, person, and final bill shapes are central to the app, so strong types help keep state transitions and props consistent.
- Tailwind CSS v4: styling is utility-based and fast to iterate on, which works well for a small interactive product with multiple screens and shared UI primitives.
- Gemini 2.5 Flash: the app uses Gemini Flash for multimodal receipt extraction because it is fast, practical for image parsing, and returns structured JSON from the receipt image.
- React Icons: the interface uses lightweight iconography for camera, edit, navigation, delete, and progress affordances without bringing in a large UI kit.

## Architecture / Key Design Decisions

The app is organized as a guided flow in `app/page.tsx`, with each screen represented by a component and the current step stored in local state. That keeps the experience linear and makes it easy to preserve shared data like the bill, the participant list, and the final output.

The most important design choice is that the extracted bill acts as the source of truth. The receipt is parsed once, then users refine the data in later screens instead of re-entering it from scratch. `ReviewBill` edits the raw items, `AddPeople` collects participants, `AssignDishes` attaches names to bill items, and `BillSummary` computes the final totals from the same underlying data.

The summary and final bill are separated on purpose. `BillSummary` is an interactive calculation screen where the service charge can still change, while `FinalBill` is the completed payload that packages the bill and people together for the final handoff. That split makes the workflow easier to reason about and keeps finalization explicit.

You can find more details on the design and implementation of each component in the [Components Documentation](docs/ComponentsDoc.md).

The extraction pipeline is intentionally layered. The client uploads the image to `app/api/extract`, the route validates and converts the file, `services/billExtraction.ts` handles the OCR/extraction orchestration, and `lib/gemini.ts` performs the Gemini API call. This separation keeps request handling, business logic, and external API integration isolated from each other.

The assignment screen uses name-based item assignment, with `assignedTo` stored on each item as an array of person names. That makes the later summary math straightforward, because shared items can be split evenly across assigned people without introducing extra join tables or a separate mapping object.

Color assignment for people is deterministic. Each new person receives a color from a fixed palette based on the current list length, which keeps avatars visually distinct while avoiding extra persisted styling state.

## Getting Started

```bash
git clone <repository-url>
cd bill-splitter
npm install
```

Create a `.env.local` file with your Gemini key:

```bash
GOOGLE_API_KEY=your_key_here
```

Run the app:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Features

- Upload a receipt image from camera or gallery.
- Extract restaurant, items, prices, currency, and service charge from the receipt.
- Review and edit extracted items before continuing.
- Add people to split the bill.
- Assign dishes to one or more people.
- Calculate service charge and final per-person totals.
- Keep the workflow step-based so users can move back and forth safely.

_Check out the individual components for more details on how each part of the flow is implemented and designed!_

[Components Documentation](docs/ComponentsDoc.md)

_Style Guide and design are documented separately here:_

[Style Guide](docs/StyleDoc.md)

## What I'd do next

- Implement persistent storage (e.g., localStorage or backend) for bill data and people list to survive page reloads.
- Add user authentication and multi-session support for saving past bills and sharing with others.
- Enhance error handling with more specific messages based on API error codes.
- Add unit tests for core components and handlers to ensure reliability during refactors.
- Create final page design with possibility to share or export the final bill summary using dom-to-image library.
