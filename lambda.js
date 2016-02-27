var https = require('http');
var data = 'OFF';
var options = {
    host: 'your-host-here', // global IP goes here. I'd use a DDNS host to avoid your ISP changing IP address
    port: 8080, // make sure to forware this port
    method: 'POST',
    headers: {
        'Content-Type': 'text',
        'Content-Length': Buffer.byteLength(data)
    }
};


/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = function(event, context) {
    
    console.log("event.session.application: " + event.session.application.applicationId);
    
    if (event.session.application.applicationId != "amzn1.echo-sdk-ams.app.your-app-code-here") {
        context.fail("Invalid application id");
    } 
    var intentRequest = event.request;
    var session = event.session;
    
    console.log("onIntent requestId = " + intentRequest.requestId 
        + ", sessionId = " + session.sessionId);
        
    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
    console.log("Intent name: " + intentName);
    if ("TelevisionIntent" === intentName) {
        
        var actionSlot = intent.slots.Action;
        var action = actionSlot.value;
        console.log("Action slot contains: " + action);
        if (action == "on") {
            data = "ON";
        }
        else if (action == "off") {
            data = "OFF";
        }
        else {
            context.fail("No match for action submitted");
        }
    }
    
    var req = https.request(options, function(res) {
        var body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            console.log('Successfully processed HTTP response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            context.succeed(body);
        });
    });
    console.log("Before the error");
    req.on('error', context.fail);
    req.write(data);
    console.log("Before req.end()");
    req.end();
};
