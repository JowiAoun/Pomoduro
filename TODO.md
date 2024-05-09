Improvements:
- src/helpers/index.ts: move `SECRET` into an .env variable and pass in function
- Create indexes for mongodb (i.e. on id)
- Show toasts for bad responses (i.e.: tasks not updated/deleted/created)
- Setup CSRF defence
- Add rate limiting by IP for non-authenticated routes and user ID for the rest