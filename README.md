# Pomoduro-App
An app based on the "Pomodoro Technique" made to learn how to use services on AWS.

# Architecture
Here is the work-in-progress architecture design using AWS.
![Architecture design of the Pomoduro app]([https://assets.digitalocean.com/articles/alligator/boo.svg "a title"](https://photos.app.goo.gl/A2SXieWEwMjTnFj59))

Run development servers:
- `cd client`
- `npm install`
- `npm run dev`
In another tab:
- Based on the `.env-example`, make a `.env` file with valid variables
- `cd server`
- `pip install -r requirements.txt`
- `python .\manage.py runserver`
