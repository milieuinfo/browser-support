# browser-support

De browser support component detecteert browsers die niet ondersteund worden door de website of applicatie en toont een melding aan de gebruiker.

## Gebruik

Het gebruik van het browser support script is zeer eenvoudig. Je moet alleen maar een script tag toevoegen aan de head sectie van de HTML pagina Opgelet, de script tag moet het id attribuut browser_support_script hebben.

### Voorbeeld gebruik

```html
<script id="browser_support_script" src="https://cdn.milieuinfo.be/browser-support/LATEST/browser-support.js"></script>
```

### Domein link
Afhankelijk van het domein waarin de website zit, moet je een andere URL aanspreken:
- https://cdn.milieuinfo.be/browser-support/LATEST/browser-support.js
- https://cdn.ruimteinfo.be/browser-support/LATEST/browser-support.js

### Demo
Als demo kan het script live op elke website toegevoegd worden door onderstaande code uit te voeren in de browser:

```javascript
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.id = 'browser_support_script';
script.type = 'text/javascript';
script.src = 'https://cdn.milieuinfo.be/browser-support/LATEST/browser-support.js';
script.setAttribute('chrome-versie', false);
head.appendChild(script);
```

Na het toevoegen van bovenstaand script zal er automatisch bij het laden van de pagina in Chrome een melding verschijnen dat de browser niet ondersteund wordt:

![Alt text](https://github.com/milieuinfo/browser-support/blob/master/img/readme1.png?raw=true "Browser support voorbeeld")

### Configuratie

Standaard worden al de gekende browser ondersteund, zoals Chrome, Edge, Safari, Mobile Safari, Firefox, Opera, Vivaldi en IE. Bij niet gekende browsers zal er een melding verschijnen. Uiteraard is de melding alsook welke browsers ondersteund worden configureerbaar.

#### Melding

Het is mogelijk om de titel en de tekst naar wens aan te passen door gebruik te maken van attributen:

```html
<script id="browser_support_script" src="https://cdn.milieuinfo.be/browser-support/LATEST/browser-support.js" titel="Titel!" bericht="Bericht!"></script>
```

![Alt text](https://github.com/milieuinfo/browser-support/blob/master/img/readme2.png?raw=true "Browser support tekst voorbeeld")

#### Browsers

Het is mogelijk om per type browser te bepalen vanaf welke versie de website of applicatie ondersteund wordt. Indien de gebruiker een oudere versie heeft, zal de melding getoond worden. Het is ook mogelijk om altijd een melding te tonen bij eeen type browser, dan moet het attribuut de waarde false krijgen. Standaard worden al de gekende browsers ondersteund.

```html
<script id="browser_support_script" src="https://cdn.milieuinfo.be/browser-support/LATEST/browser-support.js" chrome-versie="71" ie-versie="false"></script>
```

## Stijl

De DOM zal uitgebreid worden met 1 element:
* browser support element

Standaard werd er een zeer eenvoudige stijl voorzien die gebaseerd is op de Vlaamse overheid huisstijl. Uiteraard is het mogelijk om deze stijl te overschrijven. Wij hebben enkele id's voorzien die hiervoor gebruikt kunnen worden. Het stijlen via HTML element tags is mogelijk, maar we garanderen niet dat deze in toekomstige versies ongewijzigd zullen blijven. Indien er nood is om specifieke elementen te stijlen, kan hiervoor altijd een id toegevoegd worden.

Momenteel zijn volgende id's voorzien:
* ![#outdated_container](https://placehold.it/15/fc0d1c/000000?text=+) `#outdated_container`
* ![#outdated](https://placehold.it/15/fffd38/000000?text=+) `#outdated`

![Alt text](https://github.com/milieuinfo/browser-support/blob/master/img/readme3.png?raw=true "Browser support tekst HTML id")

## Ontwikkelaars

Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/browser-support/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact

Heb je suggesties, opmerkingen of tips? Voel je dan vrij om ons te contacteren via help@omgevingvlaanderen.be.