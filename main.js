"use strict";
import { logger } from 'log';

const teamName = 'Noobs';
var errorMsg = "<h1 style='color: #F00'>Geolocation is not supported by this browser.</h1>";
var watching = "";
var googleMaps = '';



function getLatAndLong(request) {
    if (request.userLocation) {
        googleMaps = '<iframe width="300" height="170" frameborder="0" scrolling="no" marginheight="0"  marginwidth="0" src="https://maps.google.com/maps?q='
            + request.userLocation.latitude + ',' + request.userLocation.longitude + '&hl=en&z=14&amp&output=embed"></iframe><br /><small><a ' +
            'href="https://maps.google.com/maps?q=' + request.userLocation.latitude + ',' + request.userLocation.longitude + '&hl=en&z=14&amp&output=embed" style="color:#0000FF;text-align:left" ' +
            'target="_blank">See map bigger</a></small>';
        watching = "<h1>WE'RE WATCHING YOU IN " + request.userLocation.city + "</h1><br/>";
        return true;
    } else {
        return false;
    }
}

export function onClientRequest(request) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
    logger.log('Responding with hello world from the path: %s', request.path);
    const isGeoLocationEnabled = getLatAndLong(request);
    if (isGeoLocationEnabled) {
        request.respondWith(200, {}, `${watching}${googleMaps}`);
    } else {
        request.respondWith(400, {}, errorMsg);
    }
}

export function onClientResponse(request, response) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
    logger.log('Adding a header in ClientResponse');
    response.setHeader('X-Hello-World', `Hello World From ${teamName}`);
}