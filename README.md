# Bill Splitter

## UploadPhoto Component

![UploadPhoto](./public/document-images/UploadPhoto.png)

### Location

- `components/UploadPhoto.tsx`

### Purpose

`UploadPhoto` is the bill image intake component. It lets users either:

- take a new photo from the device camera, or
- upload an existing image from the gallery/files.

After image selection, it sends the image to the extraction API and returns structured bill data to the parent component.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSuccess` | `(bill: ExtractedBill) => void` | Yes | Called when extraction succeeds, with parsed bill payload. |

### Internal State

| State | Type | Initial value | Description |
|-------|------|---------------|-------------|
| `isLoading` | `boolean` | `false` | Tracks active upload/extraction request; disables file inputs and shows progress text. |
| `error` | `string \| null` | `null` | Stores upload/extraction error message for user feedback. |

### User Flow

1. User chooses an image from either camera or gallery input.
2. `handleFileChange` reads the first selected file from `event.target.files?.[0]`.
3. If a file exists, `handleImageUpload(file)` runs.
4. A `FormData` object is created with key `image`.
5. Component sends `POST /api/extract` with multipart form data.
6. On success (`response.ok === true`), response JSON is parsed as `ExtractedBill` and passed to `onSuccess`.
7. On failure, component extracts `errorData.error` when available, otherwise uses fallback message.
8. `isLoading` is reset in `finally`, ensuring UI recovers in both success and error cases.

### API Contract Used

- Endpoint: `POST /api/extract`
- Request body: `FormData` with `image: File`
- Success response: JSON matching `ExtractedBill`
- Error response: JSON optionally containing `error` string

### UI Structure

- Title area: "Add Bill"
- Visual cue: receipt icon (`MdReceiptLong`)
- Action buttons:
	- "Take a photo" (`accept="image/*"`, `capture="environment"`)
	- "Upload from Gallery" (`accept="image/*"`)
- Helper text and tips section with icons:
	- Ensure good lighting
	- Place receipt on flat surface
	- Avoid shadows and blur

### States Rendered

- Default: upload/take-photo actions are enabled.
- Loading (`isLoading === true`):
	- file inputs are disabled
	- message shown: "Processing your bill..."
- Error (`error !== null`):
	- message shown in red text with extracted/fallback error text.

## Style Guide

### CSS Variables

The application uses CSS custom properties defined in `app/globals.css` with automatic light/dark mode support via `prefers-color-scheme`.

#### Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-primary` | `#e9b935` | `#e9b935` | Primary accent color |
| `--color-primary-dark` | `#e9b9352f` | `#e9b9352f` | Dark variant of primary |
| `--color-bg-primary` | `#fff9ea` | `#110a04` | Main background |
| `--color-bg-secondary` | `#f5f5f5` | `#1d1d1d` | Secondary background (e.g., cards, modals) |
| `--color-bg-tertiary` | `#e5e5e5` | `#313131` | Tertiary background |
| `--color-text-primary` | `#1a1a1a` | `#ffffff` | Main text |
| `--color-text-secondary` | `#6d6d6d` | `#919191` | Secondary text |
| `--color-text-tertiary` | `#919191` | `#6d6d6d` | Muted text |
| `--color-border-primary` | `#d4d4d4` | `#383838` | Primary borders |
| `--color-border-secondary` | `#a3a3a3` | `#6D6D6D` | Secondary borders |

#### Layout

| Variable | Value | Usage |
|----------|-------|-------|
| `--border-radius` | `16px` | Default border radius |