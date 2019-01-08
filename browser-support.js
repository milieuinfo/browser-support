'use strict';

(function() {
    var script = getDependencyScript();
    var style = getDependencyStyle();
    
    document.head.appendChild(script);
    document.head.appendChild(style);

    script.addEventListener('load', function() {
        var element = getDependencyElement();
        document.body.prepend(element);
        
        outdatedBrowserRework({
            browserSupport: {
                'Chrome': getBrowserVersion('chrome'),
                'Edge': getBrowserVersion('edge'),
                'Safari': getBrowserVersion('safari'),
                'Mobile Safari': getBrowserVersion('mobile-safari'),
                'Firefox': getBrowserVersion('firefox'),
                'Opera': getBrowserVersion('opera'),
                'Vivaldi': getBrowserVersion('vivaldi'),
                'IE': getBrowserVersion('ie')
            },
            isUnknownBrowserOK: false,
            messages: {
                nl: {
                    outOfDate: "" +
                        "<div class='icon'></div>" + 
                        "<div>" + 
                            "<div id='outdated_title'>" + getTitle() + "</div>" + 
                            "<div id='outdated_message'>" + getMessage() + "</div>" + 
                        "</div>"
                }
            },
            language: 'nl'
        });
        window.onload();
    });

    function getBrowserSupportScript() {
        return document.querySelector('#browser_support_script');
    }

    function getDependencyScript() {
        var script = document.createElement('script');
        script.setAttribute('src', 'https://cdn.milieuinfo.be/browser-support/LATEST/outdated-browser-rework.min.js');
        return script;
    }

    function getDependencyStyle() {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://cdn.milieuinfo.be/browser-support/LATEST/style.css');
        return link;
    }

    function getDependencyElement() {
        var container = document.createElement('div');
        container.setAttribute('id', 'outdated_container');

        var element = document.createElement('div');
        element.setAttribute('id', 'outdated');
        
        container.appendChild(element);
        return container;
    }

    function getBrowserVersion(browser) {
        return JSON.parse(getBrowserSupportScript().getAttribute(browser + '-versie') || getDefaultValue());
    }

    function getTitle() {
        var titel = getBrowserSupportScript().getAttribute('titel');
        return !!titel ? titel : "Opgelet!";
    }

    function getMessage() {
        var tekst = getBrowserSupportScript().getAttribute('bericht');
        return !!tekst ? tekst : "U gebruikt een browser die niet ondersteund wordt. Voor een optimale ervaring, gebruik een <a href='http://outdatedbrowser.com/nl' target='_blank'>recente browser</a>.";
    }

    function getDefaultValue() {
        try {
            return JSON.parse(getBrowserSupportScript().getAttribute('andere-browsers-worden-ondersteund'));
        } catch(e) {
            return defaultValue === '' ? true : !!defaultValue;
        }
    }
})();