var express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  app = express(),
  util = require('util'),
  // We don't recommend dumping api data into global variables
  // but for demo purposes:
  we_response

function log (title, obj) {
  console.log('::: ' + title + ' :::')
  console.log(util.inspect(obj, { depth: null, colors: true }))
}

// Setting up the templating engine
app.set('view engine', 'jade')
app.set('views', 'public/views')

// Using public folder for static files
app.use(express.static('public'))

// Using the bodyParser for parsing http response body
app.use(bodyParser.urlencoded({ extended: true }))

// Setting up main route
app.get('/', function (req, res) {
  // Default route returns index.jade
  res.render('index')
})

// Setting up POST method route
// The registration form on the front page posts data to the '/register' route.
// Here, the form data is available as req.body,
// and we use that data to build a new request to the WE API
app.post('/register', function (req, res) {
  log('Form Inputs', req.body)
  log('Registration POST Status:', res.statusCode)

  // Build the input for the find_one match request
  // that we're sending to WealthEngine
  var match_request = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    address_line1: req.body.address_line1,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }

  log('Address Match Request', match_request)

  // Posting to the WE API
  request.post({
    // Sandbox API Environment (Random Fake Data)
    url: 'https://api-sandbox.wealthengine.com/v1/profile/find_one/by_address/basic',
    // Production API Environment (Real Data)
    // url: 'https://api.wealthengine.com/v1/profile/find_one/by_address/basic',

    // Setting this flag serializes the body input as JSON
    // and adds Content-type: application/json header.
    // Additionally, parses the response body as JSON.
    json: true,
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': 'APIKey YOUR_API_KEY'
    },
    body: match_request
  }, function (error, response, payload) {
    log('WE API Status:', response.statusCode)
    log('Headers:', JSON.stringify(response.headers))
    log('Response:', payload)

    // Do whatever you need to do with the data we give you here
    we_response = payload

    if (!error && response.statusCode === 200) {
      // Sending browser to the 'profile' route
      res.redirect('/profile')
    } else {
      // Sending browser to the 'error' route
      res.redirect('/error')
    }
  })
})

// When the API succeeds, show profile.jade
app.get('/profile', function (req, res) {
  res.render('profile', {
    title: 'Profile for ' + we_response.identity.first_name + ' '
      + we_response.identity.last_name,

    fullname: we_response.identity.first_name + ' '
      + we_response.identity.last_name,

    city: we_response.locations[0].address.city,

    state: we_response.locations[0].address.state.text,

    networth: we_response.wealth.networth.text,

    gift_capacity: we_response.giving.gift_capacity.text,

    we_response: JSON.stringify(we_response, null, 2)

  })
})

// When the API fails, show error.jade
app.get('/error', function (req, res) {
  res.render('error')
})

// Setting up the server
var server = app.listen(3000, function () {

  console.log('Server Ready: http://localhost:' + server.address().port)

})
