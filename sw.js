const VERSION = '5::'
const ASSETS = [
    '/assets/css/style-1.css',
    '/assets/img/icons/envelope.svg',
    '/assets/img/icons/file-text.svg',
    '/assets/img/icons/github.svg',
    '/assets/img/icons/t.svg',
    '/assets/img/logo.svg',
    '/assets/img/nfss.png',
    '/assets/img/prolocks.png',
    '/assets/js/app.js',
    '/assets/js/particles.min.js',
    '/docs/AltamirovShamil_eng.pdf',
    '/assets/js/particles.json'
]

self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open( VERSION + 'shamilbe' ).then( cache => {
            return cache.addAll( ASSETS )
                .then( () => self.skipWaiting() )
        } )
    )
} )

self.addEventListener( 'activate', event => {
    event.waitUntil( self.clients.claim() )
} )

self.addEventListener( 'fetch', event => {
    event.respondWith(
        caches.match( event.request )
        .then( response => {
            return response || fetch( event.request );
        } )
    )
} )
