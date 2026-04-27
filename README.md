# Pixel Cipher

A full-stack TypeScript app that hides text inside images (encode) and reads hidden text back out (decode) using a simple LSB-based steganography flow.

## Project Structure

- `client/` — React + Vite + TypeScript UI
- `server/` — Express + TypeScript API (`/encode`, `/decode`)

## How It Works

- The server reads image bytes with `sharp`.
- For encoding, it writes message bits into the least significant bit (LSB) of image bytes.
- For decoding, it reads those LSBs back into the original message.
- The UI uploads images and downloads encoded output.

## Prerequisites

- Node.js `>= 20`
- npm `>= 9`

## Setup

Install dependencies for both apps:

```bash
cd client
npm install
cd ..\server
npm install
```

## Run the App (Current Recommended Flow)

This repo currently serves the built frontend from the Express server.

1. Build the frontend:

```bash
cd client
npm run build
```

2. Start the backend (serves API + built client):

```bash
cd ..\server
npm run dev
```

3. Open:

- `http://localhost:5050`

## Development Notes

- `client` has `npm run dev` for Vite, but API calls are relative (`/encode`, `/decode`).
- If you run Vite separately, requests will target the Vite origin unless you add a Vite proxy or adjust API URLs.

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build production bundle
- `npm run lint` — run ESLint
- `npm run preview` — preview built client

### Server (`server/package.json`)

- `npm run dev` — run server with `tsx`
- `npm run build` — compile TypeScript

## Testing

There is currently no automated unit/integration test suite in this repository.

Use this baseline quality check before pushing changes:

```bash
cd client
npm run lint
npm run build
cd ..\server
npm run build
```

Then do a quick manual functional test:

1. Start the app using the **Run the App** section.
2. In **Encode**, upload an image and enter a short message.
3. Click **Encode & Save** and confirm the download starts.
4. In **Decode**, upload the encoded image.
5. Confirm the original message appears and **Copy to Clipboard** works.

## API Reference

### `POST /encode`

- Content type: `multipart/form-data`
- Field: `image` (file)
- Body field: `text` (string)
- Response: encoded PNG bytes

### `POST /decode`

- Content type: `multipart/form-data`
- Field: `image` (file)
- Response:

```json
{ "text": "decoded message" }
```

## Collaboration Tips

- Keep changes scoped to either `client/` or `server/` where possible.
- Run lint/build checks before opening a PR.
- If changing request/response shapes, update both UI calls and server controllers together.
