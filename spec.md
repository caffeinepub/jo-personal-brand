# Job JS Personal Brand Site

## Current State
The site has a testimonials feature with a broken backend. The Motoko backend uses two separate maps (`testimonials` as V1 and `testimonialsV2` as V2) with migration logic in `postupgrade`. This legacy complexity causes upgrade failures, making `createTestimonial` always throw an error when called from the frontend. The IDL and frontend code look correct -- the backend state management is the root cause.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Simplify the backend Motoko to use a single clean `testimonials` map (no V1/V2 split, no migration logic)
- Remove the `migratedTestimonials` stable var and all migration code
- Keep all other backend functionality unchanged (posts, leads, social links, etc.)

### Remove
- Legacy `TestimonialV1` type
- `testimonials` (V1) map
- `testimonialsV2` map (replaced with single `testimonials` map)
- `migratedTestimonials` stable var and migration logic in `postupgrade`

## Implementation Plan
1. Rewrite `src/backend/main.mo` with a clean single `testimonials` map
2. All other code (frontend, IDL, hooks) is already correct and needs no changes
