/******************************************************************************
Funksjoner og metoder oppgave

Les oppgaveteksten NØYE. Vis noen eksempler i koden din som tester
funksjonene og metodene dine. Bruk en variasjon av pilfunksjoner (arrow functions)
og funksjoner laget med nøkkelordet `function`.

Legg til kommentarer i koden din som kort forklarer hva den gjør.

******************************************************************************/

/******************************************************************************
1.

Lag følgende funksjon:

Funksjonen skal ta inn et tall som parameter og returnere
"Oddetall" hvis tallet er et oddetall og "Partall" hvis tallet er et partall.
(PS: Funksjonen skal bruke return, du skal ikke bruke console log inni
funksjonen)

******************************************************************************/

function isOdd(integer) {
	const rest = integer % 2;
	switch (rest) {
		case 0:
			return `${integer} is even.`;
		case 1:
			return `${integer} is odd.`;
		default: // Brukar brukaren funksjonen riktig?
			// Om koden når her er det ein bug i brukar-kontekst, og bør derfor
			// kastes som ein feil! Vi veit heller ikkje korleis brukaren ønsker
			// å handtere feilen, så det er opp til brukaren å sjekke. 
			throw new TypeError(`isOdd expects an integer, but ${integer} was passed in!`);
	}
}

console.log(isOdd(4));

// Eksempel på brukarhandtering
function isOddSafe(integer, logLevel = 'verbose') {
	let result = null;
	try {
		result = isOdd(integer);
	}
	catch (error) {
		if (logLevel === 'error') {
			console.log(error);
		}
	}
	finally {
		switch (logLevel) {
			case 'silent':
			case 'error':
				break;
			case 'verbose':
			default:
				console.log(result);
				break;
		}
	}
	// MERK: vi sender att null om ein feil blir kasta. Dette er ønska då vi
	// ikkje vil at nokon skal nytte resultatet om det er feil.
	return result;
}

const resultString = isOddSafe(33, 'silent');
isOddSafe(78);
isOddSafe(57.32, 'error');
console.log('No kan vi kaste feil uten at programmet vårt krasjer!');

// throw med try...catch..finally er den skikkelege måten å handtere feil på,
// men sjå kor mykje vi måtte skrive. I tillegg blir ofte feil berre kasta, men
// ikkje fanga. Dette peker eigentleg på at ein har døme ein ikkje har, men
// burde ta stilling til i programmet, men kven har lyst å skrive meir
// feilhandtering- enn programkode? I JS er det vanleg å sende att null i
// staden, i og med at ein kan blande typer. Dette er ein av grunnene for å ha
// fleire tomme verdier - null er gitt av brukar, undefined (bør vere) av
// språket.

// Ein moderne handtering av feil er å gå tilbake til ein eldre handtering.
// Her sender vi att ein ok/feilverdi i tillegg til resultatet. Dette er
// meir ergonomisk i nokre språk enn andre, spesielt med unionar, men eg gir
// eit enkelt js eksempel under:

function isEven(int) {
	const rest = int % 2;
	switch (rest) {
		case 0:
			return { result: true, ok: true };
		case 1:
			return { result: false, ok: true };
		default: // Brukar brukaren funksjonen riktig?
			return {
				result: `isEven expects an integer, but was given ${int}!`,
				ok: false
			};
	}
}

// Brukaren held på all fleksibilitet i handtering, men kan få meir info enn
// berre null. Brukaren blir og gjort merksam på at ein må handtere ein mogleg
// feil pga datatypen funksjonen sender att.
const anEvenCheck = isEven(44).ok ? isEven(44).result : null;

// I mange språk kan ein òg gjere one-lineren utan å kalle funksjonen 2 gonger.
// Det ser ikkje såå bra ut i js, men ein kan nytte IIFE:
const anotherCheck = ((r) => r.ok ? r.result : null)(isEven(28));
console.log(`Is 28 even? ${anotherCheck}`);

// Og det kan vere greit i døme der du veit at verdien du gir inn er god, eller
// du vil krasje programmet om feilen skjer, men ein enklere og meir fleksibel
// løysing viser òg kva vi tjener på tilnærminga over null checks:
const badCheck = isEven(67.76);
if (!badCheck.ok) console.log(badCheck.result);

/******************************************************************************
2.

Lag følgende funksjon:

Funksjonen skal ta inn en string som parameter og returnere stringen
i STORE BOKSTAVER med et utropstegn på slutten.

Eksempel: "Dette er kult" skal returnere "DETTE ER KULT!"

******************************************************************************/

const makeExclamation = (string) => string.toUpperCase() + '!';
console.log(makeExclamation('Dette er ein pilfunksjon'));

/******************************************************************************
3.

Lag følgende funksjon:

Funksjonen skal ta inn 2 parametere:

 - Et navn (string)
 - En time på døgnet (nummer)

Funksjonen skal returnere:
"Ugyldig tid" hvis timeverdien er mindre enn 0.
"God natt (mottatt navn)" hvis timeverdien er mellom 0 og 5.
"God morgen (mottatt navn)" hvis timeverdien er mellom 6 og 11.
"God dag (mottatt navn)" hvis timeverdien er mellom 12 og 17.
"God kveld (mottatt navn)" hvis timeverdien er mellom 18 og 23.
"Ugyldig tid" hvis timeverdien er større enn 23.

Hvis ingen timeverdi mottas, skal funksjonen returnere en feilmelding.

******************************************************************************/

function greetTimely(name, hourOf23) {
	const result = {
		greeting: null,
		err: `Ufullendt utføring av funksjon.`
	}
	// Tidleg retur.
	if (!hourOf23 && hourOf23 != 0) {
		result.err = `No hour specified.`;
		return result;
	}
	// switch (true) lar oss skrive uttrykk som matcher om sann. 
	switch (true) {
		case hourOf23 < 0:
			result.err = `hourOf23 må vere eit positivt tal! Fekk: ${hourOf23}`;
			break;
		case hourOf23 < 6:
			result.greeting = `God natt ${name}`, result.err = false;
			break;
		case hourOf23 < 12:
			result.greeting = `God morgon ${name}`, result.err = false;
			break;
		case hourOf23 < 18:
			result.greeting = `God dag ${name}`, result.err = false;
			break;
		case hourOf23 < 24: 
			result.greeting = `God kveld ${name}`, result.err = false;
			break;
		case hourOf23 > 23: 
			result.err = `hourOf23 kan ikkje være høgare enn 23! Fekk: ${hourOf23}`;
			break;
		default:
			result.err = `Noko gjekk gale - switch defaulted. Switch: ${hourOf23}`;
			break;
	}
	return result;
}

console.log(((r) => r.err ? r.err : r.greeting)(greetTimely('Rettleiar', 0)));
console.log(((r) => r.err ? r.err : r.greeting)(greetTimely('Rettleiar', -1)));

const greeting = greetTimely('Vrangleiar', 24);
const greetMsg = greeting.err ? greeting.err : greeting.result;
console.log(greetMsg);

/******************************************************************************
4.

Lag følgende funksjon:

Funksjonen skal ta inn en array som parameter og returnere arrayen
med første og siste indeks fjernet.

Eksempel 1: ["Rød", "Grønn", "Blå", "Gul"] skal returnere ["Grønn", "Blå"].

Eksempel 2: ["En", "To", "Tre", "Fire", "Fem", "Seks"] skal returnere
["To", "Tre", "Fire", "Fem"].

******************************************************************************/

const truncateArray = (a) => a.slice(1, -1);

const initialArray = [0, 4, 3, 2, 78, true, 'hei'];
const shortArray = truncateArray(initialArray);
console.log(initialArray);
console.log(shortArray);

/******************************************************************************
5.

Lag følgende funksjon:

Funksjonen skal ta inn en string som parameter.

Bruk stringmetoder på stringen for å gjøre følgende:
 - Erstatt ordet "vanskelig" med "gøy".
 - Fjern mellomrom fra starten og slutten av stringen.

Returner deretter den oppdaterte stringen.

Eksempel 1: "  Javascript er vanskelig   " skal returnere "Javascript er gøy".
Eksempel 2: " Det er vanskelig å bruke metoder " skal returnere "Det er gøy å bruke metoder".
Eksempel 3: "   vanskelig        " skal returnere "gøy".

******************************************************************************/

function strictFun(strParam) {
	return strParam.replaceAll("vanskelig","gøy").trim();
}

console.log(strictFun('  JS er vanskelig  '));
console.log(strictFun(' Det er vanskelig å bruke metoder når det er vanskelig, vanskelig'));
console.log(strictFun('		vanskelig    		 '));

/******************************************************************************
6.

Fullfør følgende steg for å manipulere "items"-arrayet. Hvert steg skal
fullføres ved å bruke passende array-metoder.

*******************************************************************************/

const items = ["Bok", "Penn", "Notatbok", "Viskelær", "Blyant", "Markør"];

/*******************************************************************************
Steg 1: Fjern det første elementet ("Bok") fra arrayen ved hjelp av riktig metode.

Steg 2: Finn og erstatt "Viskelær" med "Linjal" i arrayen.

Steg 3: Bruk splice-metoden til å fjerne både "Penn" og "Notatbok", og legg til "Markeringspenn" i deres plass.

Steg 4: Kombiner alle elementene i arrayen til en enkelt string ved å bruke " | " som separator.

Ekstra utfordring: Lag et nytt array som kun inkluderer elementer som inneholder bokstaven "e".

******************************************************************************/

items.shift();
console.log(items);

const i = items.indexOf('Viskelær');
if (i) {
	items[i] = 'Linjal';
}
console.log(items);

// Litt meir fluff
const pennPos = items.indexOf('Penn');
const bokPos = items.indexOf('Notatbok');
if (pennPos >= 0 && bokPos >= 0 ) {
	const startPos = pennPos < bokPos ? pennPos : bokPos;
	items.splice(startPos, Math.abs(pennPos-bokPos), "Markeringspenn");
}
console.log(items);

console.log(items.join(' | '));

const eItems = items.filter((i) => i.includes('e'));
console.log(eItems);

/******************************************************************************
7.

EKSTRA UTFORDRING #1:

Dette er ikke obligatorisk, kun for de som vil ha en ekstra utfordring.

Lag følgende funksjon:

Funksjonen skal ta inn 2 parametere, en array og en string.

Sjekk om arrayen inneholder stringen. Hvis den gjør det, fjern elementet
fra arrayet og returner den oppdaterte arrayen.

Hvis arrayet ikke inneholder stringen, legg stringen til på slutten
av arrayet og returner det oppdaterte arrayet.

Eksempel 1: (["Rød", "Grønn"], "Blå") --> ["Rød", "Grønn", "Blå"]
Eksempel 2: (["Rød", "Grønn", "Blå"], "Grønn") --> ["Rød", "Blå"]
Eksempel 3: (["En", "To", "Tre"], "Fire") --> ["En", "To", "Tre", "Fire"]
Eksempel 4: (["En", "To", "Tre"], "To") --> ["En", "Tre"]

******************************************************************************/

function addOrRemove(string, array) {
	const i = array.indexOf(string);
	i === -1 ? array.push(string) : array.splice(i, 1);
}

const fargar = ['Rød', 'Grønn'];
const tall = ['En', 'To', 'Tre'];

addOrRemove('Blå', fargar);
console.log(fargar);
addOrRemove('Blå', fargar);
console.log(fargar);

addOrRemove('Fire', tall);
console.log(tall);
addOrRemove('To', tall);
console.log(tall);

/******************************************************************************
8.

EKSTRA UTFORDRING #2:

Dette er ikke obligatorisk, kun for de som vil ha en ekstra utfordring.

Lag følgende funksjon:

Funksjonen skal ta inn ett parameter.

Hvis parameteret er en string:
Returner stringen med "😎" lagt til i starten og slutten.

Hvis parameteret er et tall:
Doble verdien, konverter den til en string, og returner den med "😎" lagt til i
starten og slutten.

Hvis parameteret er en boolean:
Returner "😎Ja😎" hvis parameteret er true, eller "😎Slapp av😎" hvis parameteret er false.

Hvis parameteret er en annen datatype:
Returner "😎Kun primitive verdier😎".

******************************************************************************/

// Skriv koden for oppgave 8 her

function coolTypeOf(primitive) {
	const type = typeof(primitive);
	switch (type) {
		case "string":
			return `😎${primitive}😎`;
		case "number":
			return `😎${primitive * 2}😎`;
		case "boolean":
			return `😎${primitive ? 'Ja' : 'Slapp av'}😎`;
		default:
			return '😎Kun primitive verdier😎';
	}
}

console.log(coolTypeOf('hallo'));
console.log(coolTypeOf(21));
console.log(coolTypeOf(false));
console.log(coolTypeOf(null));