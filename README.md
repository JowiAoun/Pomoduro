# Pomoduro-App
An app based on the "Pomodoro Technique" made to learn how to use services on AWS.

# Architecture
Here is the work-in-progress infrastructure design using AWS.
![Pomoduro infrastructure](https://github.com/JowiAoun/Pomoduro/assets/83415433/95239dd9-8231-4738-88b9-4e49a5e8aab1)


Run development servers:
- `cd client`
- `npm install`
- `npm run dev`
In another tab:
- Based on the `.env-example`, make a `.env` file with valid variables
- `cd server`
- `pip install -r requirements.txt`
- `python .\manage.py runserver`
