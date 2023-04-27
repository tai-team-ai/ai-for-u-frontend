# AI For U Frontend

Here is located the code for the frontend of https://aiforu.app.

## Table of Contents
1. [Getting Started](#getting-started)
1. [Task Workflow](#task-workflow)
1. [Project Structure](#project-structure)

## Getting Started

This project is written in typescript so you'll need to install node to download dependencies and run the developement server.  You can get node from here [node](https://nodejs.org/en).

To begin developing on this project, you must first clone the repository:

```bash
git clone https://github.com/ai-for-u/ai-for-u-frontend
```

Once cloned, you will want to navigate to the repository and install the dependencies:

```bash
cd ai-for-u-frontend
npm i
```

You can then run the developement server with the following command:

```
npm run dev
```

The server will start and listen at `0.0.0.0:3000`, which you can get to on your local machine's browser by navigating to https://localhost:3000.

You will need to get a `.env` file from Mike Whitney and place it at the root of your repository in order to get authentication and the calls to the API to work properly.  The `.env` will consist of variables such as google oauth creds and aws access keys so it is **NOT** to be committed to the remote repository.  It is already included in the `.gitignore`.  The format of the `.env` file should look as follows:

```ini
# the url to the REST API
API_URL="xxx"

# nextauth variables
NEXTAUTH_URL="xxx"
NEXTAUTH_SECRET="xxx"
NEXT_AUTH_AWS_ACCESS_KEY="xxx"
NEXT_AUTH_AWS_SECRET_KEY="xxx"
NEXT_AUTH_AWS_REGION="xxx"

# oAuth provider variables
GOOGLE_ID="xxx"
GOOGLE_SECRET="xxx"
```

## Task Workflow

Task management is handled on this [notion page](https://www.notion.so/aiforu/d2e85221d1154b238fa169ea731c5f4e?v=013a3a1864be4f0897d0eb939e6b5348).

The basic workflow for completing a task is as follows:

1. Select a task to work on that is assigned to you and move it to the `In progress` column.
2. Create a new branch for the task with a descriptive name, for example:
```bash
git checkout -b feature/new-feature-branch
```
3. Make code changes and test it on your local developement environment. Make sure your code passes ESLint
4. Push your changes to the repo using either using your GUI git client in your IDE or by using the following commands:
```bash
git add src/changed-file1 pages/changed-file2
git commit -m "descriptive commit message"
git push --set-upstream origin feature/new-feature-branch
```
5. Submit a pull request by either going to https://github.com/ai-for-u/ai-for-u-frontend/pulls or by clicking the link that appears in terminal after the initial push. Move your task to the `Pull request` column.
6. Have someone review your code.
7. Merge code to main.  Move your task tothe `Done` column.

## Project Structure

**Pages:** This frontend is built on [NextJS](https://nextjs.org/).  This means that any `.tsx` file found in the `pages` directory is available as a route on the server.  For example `pages/index.tsx` refers to the home page (`/`), `pages/app/sandbox` refers to the chatGPT sandbox (`/app/sandbox`), and `pages/templates/index.tsx` refers to the templates page (`/templates`).  NextJS offers dynamic routes such as `pages/templates/[task].tsx`.  This means going to `/templates/text-summarizer` will invoke the `pages/templates/[task].tsx` with the value `text-summarizer` passed as a query parameter.

**Components:** The components directory contains all the reusable components such as the modals, navbar, etc.  These have `.tsx` extentions and can be used as UI elements.

**Utils:** The utils directory contains all the utility functions and constant values.  Basically, these are all `.ts` files that are not specifically used by

**Styles:** The styles directory contains all the `.css` files.  NextJS is a little weird when it comes to css and general css has to be within the `styles/global.css` and styles specific to a component needs to be in a `styles/<Component name>.module.css` file.

**Types:** The types directory hold type overwrites for things that we use in libraries like nextauth and nextui.

**API:** The `pages/api` directory hold all frontend server requests.  We use this for authentication as well as a middleware layer between the frontend and our backend API (all requests sent to `/api/ai-for-u/[task]` will be forwarded to `${API_URL}/ai-for-u/[task]`)