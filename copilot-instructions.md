# Copilot Instructions

- Prefer Tailwind CSS utility classes for UI styling.
- Avoid adding new custom CSS classes unless a utility-only solution is impractical.
- Keep long static content, copy blocks, and data arrays out of page files.
- Move reusable content data into feature-local `data.js` files.
- Extract repeated UI blocks into feature-local components under `components/`.
- Keep pages thin: they should compose sections, not store large data or markup blobs.
- Prefer small, focused components over wrapping everything in motion.
- Use motion sparingly for major reveal points, not every nested element.
