# <img src="https://cloud.githubusercontent.com/assets/120485/18661790/cf942eda-7f17-11e6-9eb6-9c65bfc2abd8.png" alt="Ghost" />

This repo demonstrates deployment of the [Ghost blogging
software](https://ghost.org/) using Node.js and Now.

## How to deploy

First, [download `now`](https://zeit.co/download). Then, clone this
repository and run `now`:

```bash
$ git clone git://github.com/now-examples/ghost
$ cd ghost
$ npm install
$ NODE_ENV=development npm start
# make changes to your Ghost database locally before deploying
$ now
```

> Example: https://now-examples-ghost.now.sh/

You can tweak the `config.js` file and `content` directory to your liking, and
then re-deploy by running `now` again.

### A note on Ghost database engines with Now

#### `sqlite3`

The file system on Now deployments is immutable. So knowing this, if you're
going to stick with the default `sqlite3` backend (which is file system
based) then you should follow the typical Now-deployment paradigm. That is:

 * Start Ghost up locally in development mode: `NODE_ENV=development npm start`
 * Write a blog post and publish it so that the local sqlite database is updated
 * Create a new Now deployment and re-alias your URL

This paradigm requires a new deployment for _any_ new blog posts or changes,
and when upgrading Ghost.

#### `mysql` and `postgres`

If you want to use a `mysql` or `postgres` database service, then you'll have
to update the `config.js` file to point to an externally hosted database.
If you go this route then your Now deployment is more "live" such that you can
edit and publish posts without creating a new Now deployment, so the workflow
looks more like:

 * Edit the `config.js` file to point to your database server
 * Create a Now deployment and re-alias your URL
 * At this point you can go to the admin panel on your Now deploment URL and make desired changes

This paradigm requires a new deployment only when upgrading Ghost, or tweaking database settings.
