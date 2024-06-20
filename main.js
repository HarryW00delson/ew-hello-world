"use strict";
import { logger } from 'log';

const teamName = 'Hackathon Team 3';
var errorMsg = "";
const latAndLong = {};
const watching = "WE'RE WATCHING YOU.";
const googleMaps = '<iframe \n' +
    '  width="300" \n' +
    '  height="170" \n' +
    '  frameborder="0" \n' +
    '  scrolling="no" \n' +
    '  marginheight="0" \n' +
    '  marginwidth="0" \n' +
    '  src="https://maps.google.com/maps?q=\'' + latAndLong.lat + '\',\'' + latAndLong.long + '\'&hl=es&z=14&amp;output=embed"\n' +
    ' >\n' +
    ' </iframe>\n' +
    ' <br />\n' +
    ' <small>\n' +
    '   <a \n' +
    '    href="https://maps.google.com/maps?q=\'' + latAndLong.lat + '\',\'' + latAndLong.long + '\'&hl=es;z=14&amp;output=embed" \n' +
    '    style="color:#0000FF;text-align:left" \n' +
    '    target="_blank"\n' +
    '   >\n' +
    '     See map bigger\n' +
    '   </a>\n' +
    ' </small>';



function getLatAndLong() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latAndLong.lat = position.coords.latitude;
            latAndLong.long = position.coords.longitude;
            return true
        })
    } else {
        errorMsg = "<h1 style='color: #F00'>Geolocation is not supported by this browser.</h1>";
        return false;
    }
}

export function onClientRequest(request) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
    logger.log('Responding with hello world from the path: %s', request.path);
    if (getLatAndLong()) {
        request.respondWith(200, {}, `${watching} + ${googleMaps}`);
    } else {
        request.respondWith(400, {}, errorMsg);
    }
}

export function onClientResponse(request, response) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
    logger.log('Adding a header in ClientResponse');
    response.setHeader('X-Hello-World', `Hellow World From ${teamName}`);
}