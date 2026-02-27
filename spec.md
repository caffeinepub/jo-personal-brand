# Job JS - Personal Brand

## Current State
A single-page personal brand website for Job JS with sections: Hero, About, What I Do, Vision, Work, and Contact. The backend stores contact form submissions. There is no blog functionality.

## Requested Changes (Diff)

### Add
- Blog post data model in the backend (id, title, content, excerpt, date, category)
- Backend functions: createPost, getAllPosts, getPost, deletePost (admin only via caller check)
- A Blog section/page in the frontend showing a list of blog posts
- A blog detail view to read individual posts
- A blog post creation form (admin-only, accessible via a hidden route or button)
- Blog nav link in navbar

### Modify
- NAV_LINKS to include "Blog" entry
- App component to support routing between main page and blog views

### Remove
- Nothing removed
