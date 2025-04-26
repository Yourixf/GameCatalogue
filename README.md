# Game Catalogue installatiehandleiding

## 1. Inleiding

Doorloop van de jaren heb ik redelijk wat games gespeeld en gekocht waarvan de meeste heel leuk waren en kan blijven spelen. Maar soms is het tijd voor afwisseling. Nou zijn er diverse platformen zoals Steam, Ubisoft en App Store waar je games kan opzoeken en downloaden, maar er is naar mijn mening niet een overzichtelijke manier om al deze games van al deze platformen in te zien, dat is waar ik met mijn applicatie verandering in zal brengen.

Deze applicatie laat je game opzoeken, details bekijken, filteren, sorteren, markeren als favoriet en op basis van jouw favorieten, een lijst van aanbevolen games weergeven.

Op de onderstaande screenshot, zie je de homepagina van de applicatie als ingelogde gebruiker.

![image](https://github.com/user-attachments/assets/7ab3ab3b-637f-497f-9108-345ee3042d7c)

## 2. Benodigdheden

Om deze applicatie te kunnen draaien heb je een aantal dingen nodig.
- Node.js (versie 18 of hoger)
- IDE (integrated development environment) zoals WebStorm
- Moderne browser
- Internet verbinding
- Novi API Key: 'gamecatalogue:QCNnRs9yfPCbZmu2BT3h'
- Novi API Base URL: 'https://api.datavortex.nl/gamecatalogue'
- RAWG API Key: '5fde045bdba542bab0274fd5a10db4ea'
- RAWG API Base URL: 'https://api.rawg.io/api'

## 3. Installatie instructie

1. In CMD of je terminal, voer het volgende commando uit: `node -v`, indien Node.JS niet is geïnstalleerd, download deze op [NodeJS.org](https://nodejs.org/en)
2. In je IDE, clone deze repository. Bijvoorbeeld op de Webstorm home pagina met de knop "GET FROM VCS" (met de link: [https://github.com/Yourixf/GameCatalogue.git](https://github.com/Yourixf/GameCatalogue.git))
3. Voer in de terminal van de IDE het volgende commando uit `npm install` zodat de benodigde packages worden geïnstalleerd
4. Maak in de root van het project een nieuw bestand aan genaamd `.env` en kopieer hierin de inhoud van het bestaande `.env.dist` bestand. Je .env bestand zou er dan zo uit moeten zien:

```
VITE_NOVI_API_KEY='gamecatalogue:QCNnRs9yfPCbZmu2BT3h'
VITE_NOVI_API_BASE_URL='https://api.datavortex.nl/gamecatalogue'
VITE_RAWG_API_KEY='5fde045bdba542bab0274fd5a10db4ea'
VITE_RAWG_API_BASE_URL='https://api.rawg.io/api'
```
5. Start de ontwikkelserver door in de terminal het volgende commando uit te voeren: `npm run dev`
6. In de terminal wordt dan een link gegeven waarop deze draait, in de meeste gevallen zal dit [http://localhost:5173](http://localhost:5173) zijn

## 4. Standaard test account

Voor deze applicatie heb ik een standaard test account gemaakt met de volgende gegevens:
- Gebruikersnaam: `Novi User`
- Wachtwoord: `12345678`

(Let op: de Novi API verwijdert elke 3 maanden automatisch alle gemaakte accounts. Het kan daarom voorkomen dat het testaccount niet meer beschikbaar is. In dat geval kun je eenvoudig zelf een nieuw account registreren via de registratiepagina.)

## 5. Beschikbare commando's
In de terminal van de IDE kun je de volgende commando's uitvoeren:

- Basiscommando's:
1. `npm install` of `npm i` in het kort. Deze installeert de benodigde packages
2. `npm run dev`, deze start de ontwikkelserver, meestal op [http://localhost:5173](http://localhost:5173)
- Optionele commando's:
1. `npm run build`, maakt een geoptimaliseerde versie van de applicatie (voor productie)
2. `npm run preview`, draait een lokale server om de productieversie van de applicatie te bekijken (hiervoor moet je eerst `npm run build` uitvoeren)
