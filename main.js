import { logger } from 'log';

const teamName = 'Hackathon Team 2';

export function onClientRequest(request) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
    logger.log('Responding with hello world from the path: %s', request.path);
    request.respondWith(200, {}, `Hello World From ${teamName}`);
}

export function onClientResponse(request, response) {
    // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
    logger.log('Adding a header in ClientResponse');
    response.setHeader('X-Hello-World', `Hellow World From ${teamName}`);
}