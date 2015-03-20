var
  // Requiring in our node modules
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  app = express(),
  // We don't recommend dumping api data into global variables
  // but for demo purposes:
  we_response
;

// Setting up the templating engine
app.set('view engine', 'jade');
app.set('views', 'public/views')

// Using public folder for static files
app.use(express.static('public'));

// Using the bodyParser for parsing http response body
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up main route
app.get('/', function (req, res) {
  res.render('index');
})

// Setting up POST method route
app.post('/register', function (req, res) {
  console.log(req.body);

  // Posting to the WE API
  request.post({
    // Sandbox API Environment (Random Fake Data)
    url: 'https://api-sandbox.wealthengine.com/v1/profile/find_one/by_address/basic',
    // Production API Environment (Real Data)
    // url: 'https://api.wealthengine.com/v1/profile/find_one/by_address/basic',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'APIKey your_we_api_key_goes_here'
    },
    body: {
      "last_name": req.body.last_name,
      "first_name": req.body.first_name,
      "address_line1": req.body.address_line1,
      "city": req.body.city,
      "state": req.body.state,
      "zip": req.body.zip
    },
    json: true
  }, function (error, response, body) {
    // console.log('Status:', response.statusCode);
    // console.log('Headers:', JSON.stringify(response.headers));
    // console.log('Response:', body);

    // Do whatever you need to do with the data we give you here
    // (We do not recommend posting it to a global variable.)
    we_response = body;
    if (!error && response.statusCode == 200) {
      // Sending browser to the 'profile' route
      res.redirect('/profile');
    } else {
      // Sending browser to the 'error' route
      res.redirect('/error');
    }
  })
});

app.get('/profile', function (req,res) {
  // Rendering the profile template
  res.render('profile', {
    title: 'Profile for '+ we_response.identity.first_name + ' '
      +  we_response.identity.last_name,
    fullname: we_response.identity.first_name + ' '
      +  we_response.identity.last_name,
    city: we_response.locations[0].address.city,
    state: we_response.locations[0].address.state.text,
    networth: we_response.wealth.networth.text,
    gift_capacity: we_response.giving.gift_capacity.text,
    we_response: JSON.stringify(we_response, null, 2)
  });
});

app.get('/error', function (req,res) {
  res.render('error');
});

// Setting up the server
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

})