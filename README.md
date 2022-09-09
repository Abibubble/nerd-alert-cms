# NerdAlert CMS

![GitHub contributors](https://img.shields.io/github/contributors/abibubble/nerd-alert-cms)
![GitHub last commit](https://img.shields.io/github/last-commit/abibubble/nerd-alert-cms)
![GitHub language count](https://img.shields.io/github/languages/count/abibubble/nerd-alert-cms)
![GitHub top language](https://img.shields.io/github/languages/top/abibubble/nerd-alert-cms)
<img src="https://img.shields.io/badge/yarn-~1.22.15-blue" />
<img src="https://img.shields.io/badge/node-~16.14.2-green" />
![GitHub forks](https://img.shields.io/github/forks/abibubble/nerd-alert-cms?style=social)

[Here is a link to the deployed site](https://nerd-alert-cms.herokuapp.com/)

This is a Strapi CMS database, containing blogs and videos by the members of NerdAlert. It is designed to be responsive on a wide range of devices, whilst also being easy to navigate through. This is a [Strapi V4](https://strapi.io/) project bootstrapped with [`create-strapi-app`](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

![Final project image home page](docs/img/finalpage.png)

---

## Contents

- [Local Development](#local-development)

- [Database Design](#database-design)

- [Technologies Used](#technologies-used)

  - [Languages](#languages)
  - [Workspace](#workspace)
  - [Version Control](#version-control)
  - [Documentation](#documentation)
  - [Database Design](#database-design)

- [Deployment](#deployment)

  - [Initial Deployment](#initial-deployment)
  - [How to Fork it](#how-to-fork-it)
  - [Making a Local Clone](#making-a-local-clone)

- [Credits](#credits)
  - [Code](#code)
  - [Content](#content)
  - [Media](#media)

---

## Local Development

- Run `yarn install` to install the dependencies.
- Run the development server with `npm run dev`.
- Open [http://localhost:1337](http://localhost:1337) in your browser.
- Visit [http://localhost:1337/api](http://localhost:1337/api) for any API calls.
- Visit [http://localhost:1337/admin](http://localhost:1337/admin) to make updates to the CMS.

---

## Database Design

Strapi was used to store data for this site in a PostgreSQL database.

### Article

| Field          | Type      | Editable | Info                               |
| -------------- | --------- | -------- | ---------------------------------- |
| Title          | string    | True     |                                    |
| Tagline        | string    | True     |                                    |
| Content        | rich text | True     |                                    |
| Image          | media     | True     |                                    |
| Slug           | UID       | False    |                                    |
| **Author**     | Relation  | True     | Links to **Author** content-type   |
| **Categories** | Relation  | True     | Links to **Category** content-type |

### Author

| Field     | Type      | Editable |
| --------- | --------- | -------- |
| Name      | string    | True     |
| Tagline   | string    | True     |
| About You | rich text | True     |
| GitHub    | string    | True     |
| LinkedIn  | string    | True     |
| Image     | media     | True     |
| Slug      | UID       | False    |

### Category

| Field | Type   | Editable |
| ----- | ------ | -------- |
| Name  | string | True     |
| Image | media  | True     |
| Slug  | UID    | False    |

### Video

| Field      | Type     | Editable | Info                             |
| ---------- | -------- | -------- | -------------------------------- |
| Title      | string   | True     |                                  |
| Tagline    | string   | True     |                                  |
| Video      | media    | True     |                                  |
| Image      | media    | True     |                                  |
| Slug       | UID      | False    |                                  |
| **Author** | Relation | True     | Links to **Author** content-type |

---

## Technologies Used

### Languages Used

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Workspace

#### VSCode:

[VSCode](https://code.visualstudio.com/) was used as an IDE workspace to build this site.

### Version Control

#### Git:

[Git](https://git-scm.com/) was used for version control by utilizing the Gitpod terminal to add and commit to Git and push to GitHub.

#### GitHub:

[GitHub](https://github.com/) is used to store the code for this project after being pushed from Git.

### Documentation

#### Shields.io:

[Shields.io](https://shields.io/) was used to create the GitHub badges for the top of this README.md file.

### Database Design

#### Strapi:

[Strapi](https://strapi.io/) was used to store the contents of the database.

---

## Deployment

### Requirements for Deployment

- Strapi account and database
- GitHub account
- Heroku account

### Initial Deployment

This site was deployed to Vercel by following these steps:

1. Login or sign up to [Heroku](https://www.heroku.com).
2. Install the Heroku CLI using `brew tap heroku/brew && brew install heroku` on Mac, `sudo snap install --classic heroku` on Ubuntu, or [using an installer](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html#_1-install-the-heroku-postgres-addon-for-using-postgres) on Windows.
3. Log in to Heroku from your CLI using `heroku login`.
4. Add `package-lock.json` at the end of your `.gitignore`.
5. Create your Heroku app. This can be done in one of two ways:
   - On the Heroku site, by following the steps. Then run `heroku git:remote -a your-heroku-app-name`, replacing `your-heroku-app-name` with the unique app name that you chose on Heroku.
   - In your CLI by running `heroku create custom-project-name` to create your Heroku app, replacing `custom-project-name` with your project name. Please note: This must be unique.
6. Install the Heroku Postgres addon by running `heroku addons:create heroku-postgresql:hobby-dev`.
7. Run `heroku config` to retrieve your database credentials.
8. Install pg-connection-string, by running `npm install pg-connection-string --save` or `yarn add pg-connection-string`.
9. Create a new route of subfolders in `./config`, of `/env/production`, and then create a new file of `database.js`. The path should now be `./config/env/production/database.js`.
10. Add the following into this new `database.js` file:

```js
const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
```

11. Set the NODE_ENV to production on Heroku using `heroku config:set NODE_ENV=production` in your CLI.
12. Create a new `server.js` file in your `./config/env/production` folder, and add the following into it:

```js
module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  emitErrors: true,
  app: {
    keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  },
});
```

13. Set the environment variables using the following commands, one line at a time:

```bash
heroku config:set MY_HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set APP_KEYS=$(cat .env | grep APP_KEYS | cut -d= -f2-)
heroku config:set API_TOKEN_SALT=$(cat .env | grep API_TOKEN_SALT | cut -d= -f2)
heroku config:set ADMIN_JWT_SECRET=$(cat .env | grep ADMIN_JWT_SECRET | cut -d= -f2)
heroku config:set JWT_SECRET=$(cat .env | grep -w JWT_SECRET | cut -d= -f2)
```

14. Install the `pg` module by running `npm install pg --save` or `yarn add pg`
15. Commit your changes, but don't push
16. Update your lockfile by running `yarn install`
17. Commit your changes, but don't push
18. Push your changes using `git push heroku HEAD:main`
19. After the deployment is successful, the logs will display the URL of your deployed site.

### How to Fork it

1. Login or Sign Up to [GitHub](www.github.com).
2. On GitHub, go to [Abibubble/nerd-alert-blog](https://github.com/Abibubble/nerd-alert-cms).
3. In the top right, click "Fork".

### Making a Local Clone

1. Log in to [GitHub](https://www.github.com) and locate the [Repository](https://github.com/Abibubble/nerd-alert-cms) for this site.
2. Under the repository name, above the list of files, click "Code".
3. Here you can either Clone or Download the repository.
4. You should clone the repository using HTTPS, clicking on the icon to copy the link.
5. Open Git Bash.
6. Change the current working directory to the new location, where you want the cloned directory to be.
7. Type `git clone`, and then paste the URL that was copied in Step 4.
8. Press Enter, and your local clone will be created.

For a more detailed version of any of these steps, go to one of the following:

- The [Strapi Docs on deploying on Heroku](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html).
- The [Github Docs page on cloning a repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop).
- The [GitHub Docs page on forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

---

## Credits

### Code

- Code credit here

### Content

- All content was created by the members of NerdAlert:
  - [Abi Harrison](https://github.com/Abibubble)

### Media

- Logo created by Alexa Hendry.
