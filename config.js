// # Ghost Configuration
// Setup your Ghost install for deployment to Zeit Now.

// This is a stripped down version of the default `config.example.js`
// file with only a single ("production") environment for simplicity.

// Full documentation can be found at http://support.ghost.org/config/

const path = require('path')

const mailgunAuth = {
  user: process.env.MAILGUN_USERNAME,
  pass: process.env.MAILGUN_PASSWORD
}
if (!mailgunAuth.user) {
  throw new TypeError('the MAILGUN_USERNAME env variable must be set!')
}
if (!mailgunAuth.pass) {
  throw new TypeError('the MAILGUN_PASSWORD env variable must be set!')
}

const config = {
  // The url to use when providing links to the site, E.g. in RSS and email.
  // Change this to your Ghost blog's published URL.
  url: 'https://n8.io',

  // Visit http://support.ghost.org/mail for instructions
  mail: {
    transport: 'SMTP',
    options: {
      service: 'Mailgun',
      auth: mailgunAuth
    }
  },

  // #### Database
  // Ghost supports sqlite3 (default), MySQL & PostgreSQL
  //
  // You basically have two workflows to choose from for the database
  // when deploying to Now:
  //
  //   1) Use "sqlite3" backend. Run Ghost in development mode on localhost and
  //      write blog posts + upload images via the Ghost UI. When ready to create
  //      a deployment, simply type `now` and the latest state will be uploaded.
  //      Note that in this workflow, the deployments are read-only and cannot
  //      have new blog posts or files uploaded. Restart this flow for additional
  //      changes. This is the default, because it's inline with the general
  //      develop + deploy paradigm that Now encourages.
  //
  //   2) Use "mysql" or "postgres" backends configured to a remote database
  //      server. In this workflow, blog posts can be created via the Ghost UI
  //      without creating a new Now deployment, however image uploading is
  //      disabled because Now deployments are read-only, so you'll have to use an
  //      external image hosting service for images in your blog posts in this
  //      case. With this flow, the only time you need to create new Now
  //      deployments is when a new version of Ghost comes out that you would
  //      like to upgrade to.
  //
  database: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/content/data/ghost.db')
    },
    debug: false
  },

  // #### Use persistent file storage?
  // http://support.ghost.org/config/#file-storage
  //
  // Now fires up multiple instances of your Ghost server globally,
  // so if we were to upload an image for a blog post on one of the
  // instances then the file would be missing on the other instances.
  // So by default disable local file storage, which forces you to use
  // external image URLs for all blog post and profile images.
  //
  // I recommend using https://cloudup.com/ for image hosting
  // with Direct URL (hotlinking) access.
  fileStorage: false,

  // #### Server
  // http://support.ghost.org/config/#server
  //
  // The server host and port are the IP address and port number that Ghost
  // should listen on.
  // (Probably don't touch this)
  server: {
    host: '0.0.0.0',
    port: '2368'
  },

  // #### Paths
  // http://support.ghost.org/config/#paths
  //
  // Specify where your content directory lives.
  paths: {
    contentPath: path.join(__dirname, 'content')
  }
}


exports.production = config

exports.development = Object.create(config)

// Update the `url` so that ghost doesn't try to redirect us
// to the production URL.
exports.development.url = 'http://localhost:2368'

// On localhost we're allowed to upload files to the `content`
// directory via the Ghost blog editor UI.
exports.development.fileStorage = true
