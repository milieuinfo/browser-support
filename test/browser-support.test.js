const chai = require('chai');
const jsdom = require('jsdom');
const sinon = require('sinon');

const { JSDOM } = jsdom;
const { assert } = chai;

const sandbox = sinon.createSandbox();
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';

function setup() {
    return new JSDOM(`
        <head>
            <script id="browser_support_script" src="./browser-support.js"></script>
        </head>
    `, {
        runScripts: 'dangerously',
        resources: 'usable',
        userAgent: userAgent
    });
}

function setupAndereBrowsersWordenOndersteund(defaultValue) {
    return new JSDOM(`
        <head>
            <script id="browser_support_script" src="./browser-support.js" andere-browsers-worden-ondersteund="${defaultValue}"></script>
        </head>
    `, {
        runScripts: 'dangerously',
        resources: 'usable',
        userAgent: userAgent
    });
}

function setupChrome(versie = false, titel = '', bericht = '') {
    return new JSDOM(`
        <head>
            <script id="browser_support_script" src="./browser-support.js" titel="${titel}" bericht="${bericht}" chrome-versie="${versie}"></script>
        </head>
    `, {
        runScripts: 'dangerously',
        resources: 'usable',
        userAgent: userAgent
    });
}

function wait(dom, callback) {
    dom.window.addEventListener('load', () => {
        setTimeout(() => {
            callback();
        }, 500);
    });
}

suite('browser support', function() {
	teardown(() => {
		sandbox.restore();
    });

    test('bij het laden van het browser support script worden de browser support elementen geladen en getoond omdat standaard geen enkele browser ondersteund is', (done) => {
        const dom = setup();
        wait(dom, () => {
            const window = dom.window;
            const document = window.document;
            const container = document.querySelector('#outdated_container');
            const element = container.querySelector('#outdated');
            assert.exists(container);
            assert.exists(element);
            assert.isNotEmpty(element.innerHTML);
            done();
        });
	});

    test('standaard wordt er geen enkele browser ondersteund, maar er kan ook geconfigureerd worden of browsers ondersteund worden of niet', (done) => {
        let dom = setupAndereBrowsersWordenOndersteund();
        wait(dom, () => {
            const element = dom.window.document.querySelector('#outdated_container #outdated');
            assert.isEmpty(element.innerHTML);

            dom = setupAndereBrowsersWordenOndersteund(false);
            wait(dom, () => {
                const element = dom.window.document.querySelector('#outdated_container #outdated');
                assert.isNotEmpty(element.innerHTML);

                dom = setupAndereBrowsersWordenOndersteund(true);
                wait(dom, () => {
                    const element = dom.window.document.querySelector('#outdated_container #outdated');
                    assert.isEmpty(element.innerHTML);
                    done();
                });
            });
        });
	});

    test('wanneer de browser ondersteund wordt, wordt er geen melding getoond aan de gebruiker', (done) => {
        const versie = true;
        const dom = setupChrome(versie);
        wait(dom, () => {
            const element = dom.window.document.querySelector('#outdated_container #outdated');
            assert.isEmpty(element.innerHTML);
            done();
        });
    });

    test('wanneer de browser versie ondersteund wordt, wordt er geen melding getoond aan de gebruiker', (done) => {
        const versie = 71;
        const dom = setupChrome(versie);
        wait(dom, () => {
            const element = dom.window.document.querySelector('#outdated_container #outdated');
            assert.isEmpty(element.innerHTML);
            done();
        });
	});

    test('wanneer er geen browser ondersteuning is, wordt er een standaard melding getoond aan de gebruiker', (done) => {
        const dom = setupChrome();
        wait(dom, () => {
            const window = dom.window;
            const document = window.document;
            const container = document.querySelector('#outdated_container');
            const element = container.querySelector('#outdated');
            assert.isNotEmpty(element.innerHTML);
            const titel = element.querySelector('#outdated_title');
            const message = element.querySelector('#outdated_message');
            assert.equal(titel.innerHTML, 'Opgelet!');
            assert.equal(message.innerHTML, 'U gebruikt een browser die niet ondersteund wordt. Voor een optimale ervaring, gebruik een <a href="http://outdatedbrowser.com/nl" target="_blank">recente browser</a>.');
            done();
        });
	});

    test('wanneer de browser versie verouderd is, wordt er een melding getoond aan de gebruiker', (done) => {
        const versie = 72;
        const dom = setupChrome(versie);
        wait(dom, () => {
            const element = dom.window.document.querySelector('#outdated_container #outdated');
            assert.isNotEmpty(element.innerHTML);
            done();
        });
	});

    test('de browser ondersteuning melding kan aangepast worden', (done) => {
        const titel = 'custom titel';
        const bericht = 'custom bericht';
        const dom = setupChrome(null, titel, bericht);
        wait(dom, () => {
            const window = dom.window;
            const document = window.document;
            const container = document.querySelector('#outdated_container');
            const element = container.querySelector('#outdated');
            const titelElement = element.querySelector('#outdated_title');
            const berichtElement = element.querySelector('#outdated_message');
            assert.equal(titelElement.innerHTML, titel);
            assert.equal(berichtElement.innerHTML, bericht);
            done();
        });
	});
});