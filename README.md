This instillation is designed to work on Linux only. 

### REQUIRED LIBRARIES:

You must compile https://github.com/Pulse-Eight/libcec
Follow instructions to get the cec library installed on the device
that will be connected to you television via HDMI

You will also need Node installed on the device


### General Setup Procedure

lambda.js is the code you'll need to put in AWS Lambda. I'd recommend copying / pasting into 
the code editor, I found it easier than reuploading a zip file every time

server.js is your webserver that will run on the RaspberryPi or similar attached
to the TV or other divice you want to send cec signals too

Currently, the server is only set to respond to the ON and OFF commands. Shoot me a message
and I can add volume and channel commands pretty easily. Or submit a pull request!

The two sh files are what the server calls to execute the command. You will need libcec 
installed in order for this to work. 

### Updates

You will need to update the path to the sh scripts in the server code

You will also need to set your IP address in the lambda code (make sure
you've forwarded your ports!)

