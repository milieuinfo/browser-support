'use strict';

(function() {
    var script = getDependencyScript();
    var style = getDependencyStyle();
    
    document.head.appendChild(script);
    document.head.appendChild(style);

    document

    script.addEventListener('load', function() {
        var element = getDependencyElement();
        document.body.appendChild(element);
        
        outdatedBrowserRework({
            browserSupport: {
                'Chrome': false
            },
            messages: {
                nl: {
                    outOfDate: "" +
                        "<div class='icon'></div>" + 
                        "<div>" + 
                            "<div class='title'>Opgelet!</div>" + 
                            "<div>U gebruikt een browser die niet ondersteund wordt. Voor een optimale ervaring, gebruik een <a href='http://outdatedbrowser.com/nl' target='_blank'>recente browser</a>.</div>" + 
                        "</div>"
                }
            }
        });
        window.onload();
    });

    function getDependencyScript() {
        var script = document.createElement('script');
        script.setAttribute('src', './outdated-browser-rework.min.js');
        return script;
    }

    function getDependencyStyle() {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', './style.css');
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
})();