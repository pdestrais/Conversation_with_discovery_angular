import { Router, Response, Request } from 'express';

const apiRouter: Router = Router();
var watson = require( 'watson-developer-cloud' );  // watson sdk
var https = require('https');

// Endpoint to be call from the client side for conversation service
apiRouter.post( '/conversation', function(req, res) {
  //Moodbuddy workspace
  //var workspace = "b3917f6b-77b1-48c0-884b-a992b4030cdc";
  //YourEurope workspace
  var workspace = "7bedffab-067f-4859-9536-e66f49a1aa80";
  var payload = {
    workspace_id: workspace,
    context: {},
    input: {},
    intents: []
  };
  // Create the conversation service wrapper
  var conversation = watson.conversation( {
    url: 'https://gateway.watsonplatform.net/conversation/api',
    password: 'ci2ohVQsKmat',
    username: '16659935-048b-4c0a-9bfc-79c93f650cd0',
    version_date: '2016-07-11',
    version: 'v1'
  } );
  if ( req.body ) {
    if ( req.body.input ) {
      payload.input = req.body.input;
    }
    if ( req.body.context ) {
      // The client must maintain context/state
      payload.context = req.body.context;
    }
    if ( req.body.intents ) {
      // The client must maintain context/state
      payload.intents = req.body.intents;
    }
  }
  console.log('before calling conversation message '+JSON.stringify(conversation));
  // Send the input to the conversation service
  conversation.message( payload, function(err, data) {
    if ( err ) {
      return res.status( err.code || 500 ).json( err );
    }
    return res.json( data );
  } );
} );

// Endpoint to be call from the client side for tone analyzer service
apiRouter.post( '/toneAnalyzer', function(req, res) {
  var payload = {
    text: ""
  };
  // Create the service wrapper
  var tone_analyzer = watson.tone_analyzer({
    url: "https://gateway.watsonplatform.net/tone-analyzer/api",
    username: '81726c38-9c91-46c0-b8e8-a25ef82c9116',
    password: 'bWjBdCua8YkG',
    version: 'v3',
    version_date: '2016-05-19'
  }); 
  if ( req.body ) {
    if ( req.body.text ) {
      payload.text = req.body.text;
    }
  }
  console.log('before calling tone analyzer message ');
  // Send the input to the conversation service
  tone_analyzer.tone( payload, function(err, data) {
    if ( err ) {
      console.log('error returned by Tone Analyzer API : '+JSON.stringify(err));
      return res.status( err.code || 500 ).json( err );
    }
    return res.json( data );
  } );
} );

// Endpoint to be call from the client side for Alchemy API service
apiRouter.post( '/extractKeywords', function(req, res) {
  if (req && req.body && req.body.text) {

    // Create the service wrapper
    var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
    var natural_language_understanding = new NaturalLanguageUnderstandingV1({
      'username': 'b6d4c1e0-9a4d-4f5e-837e-333f340f76b5',
      'password': 'xnXEtlpvNnUF',
      'version_date': '2017-02-27'
    });
    
    var parameters = {
      'text': req.body.text,
      'features': {
        'keywords': {
          'limit': 20
        },
        'concepts': {
          'limit': 3
        }
      }
    };

    natural_language_understanding.analyze(parameters, function(err, response) {
      if (err) {
          console.log('error returned by NLU API : '+JSON.stringify(err));
          return res.status( err.code || 500 ).json( err );
      } else
        return res.json( response );
    });
  } else 
    return res.json(500,'No text to look for keywords');
} );

// Endpoint to be call from the client side for Alchemy API service
apiRouter.post( '/queryCollection', function(request, response) {
  
  let query='';
  if (request.body && request.body.input && request.body.input.text)
    query = request.body.input.text;
  console.log("query string : "+query);
  var urlEncodedQueryString = encodeURI(query);
  console.log("query string url encoded : "+urlEncodedQueryString);

  var options = {
    host: 'gateway.watsonplatform.net',
/*    path: 'discovery/api/v1/environments/'+'16a6e9b0-1f1a-4887-812f-151c225b9038/collections/2357a0f0-909e-40e5-8e4d-ca45e17475fa/query?version=2016-12-01'
          +'&natural_language_query='+urlEncodedQueryString+'&return=text,html&count=3&passages=true&highlight=true',
*/    path: 'discovery/api/v1/environments/'+'16a6e9b0-1f1a-4887-812f-151c225b9038/collections/2357a0f0-909e-40e5-8e4d-ca45e17475fa/query?version=2016-12-01'
          +'&natural_language_query='+urlEncodedQueryString+'&return=text,html&count=3',
    auth: '854290d9-974d-4ad5-8cb4-15ceae821c1f:8nzsXEByPk05'
  };  
  https.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
      // Continuously update stream with data
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          // Data reception is done, do whatever with it!
          //console.log("queryCollection returns : "+body);
          var parsed = JSON.parse(body);
          response.json(parsed);
          //return res.json(parsed);
          //return body;
      });
  }).on('error', function(e) {
    console.log('error returned by Discovery service API : '+JSON.stringify(e));
    return response.status( e.code || 500 ).json( e );
  });
} );

export { apiRouter }
