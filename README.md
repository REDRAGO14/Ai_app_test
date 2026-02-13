# AuraHome Starter

## High-level system architecture (AI virtual staging)

1. **Frontend (React + Tailwind)**
   - User browses catalog, filters by category, adds to cart, and selects an item to stage.
   - User uploads room image.
   - Frontend sends `roomImage`, selected furniture metadata, and optional placement hints to backend.

2. **Backend API (Node/Express or Next.js API routes)**
   - Validates image and selected item.
   - Retrieves the product asset bundle (transparent PNG and/or 3D glTF model).
   - Calls an AI staging service.

3. **AI staging service options**
   - **Option A: Generative API (Replicate ControlNet/Inpaint)**
     - Create a segmentation mask for placement zone (automatic with GroundingDINO/SAM or manual placement box).
     - Inpaint only the placement area while preserving room lighting and perspective.
     - Return a composited staged image URL.
   - **Option B: Hybrid deterministic + AI**
     - Use Three.js to position a 3D furniture model on the floor plane (depth estimate + perspective transform).
     - Render overlay and optionally pass the composite through an image harmonization model for realism.

4. **Storage/CDN**
   - Original and staged images are stored in object storage (e.g., S3).
   - Signed URLs returned to frontend.

5. **State management (React Hooks)**
   - `selectedItem`, `selectedCategory`, `roomImage`, `cart`, and `isGenerating` managed via `useState`.
   - Derived category/item lists via `useMemo`.

## Apple-style Tailwind UI cues used

- Frosted-glass cards: `bg-white/70`, `backdrop-blur-xl`, `border border-white/60`
- Soft depth: custom shadows `shadow-glass`, `shadow-card`
- Rounded geometry: `rounded-3xl`, `rounded-2xl`, `rounded-full`
- Minimal monochrome palette with subtle accents: `bg-slate-*`, `text-slate-*`
- Crisp typography and spacing: `tracking-tight`, `uppercase`, generous whitespace

## Run locally

```bash
npm install
npm run dev
```
