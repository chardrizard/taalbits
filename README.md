# Taalbits

Short Dutch practice sessions for things that stay tricky: compound verbs, separable verbs, prepositions, and fixed combinations.

**[Try Taalbits](https://chardrizard.github.io/taalbits/)**

![Taalbits preview](og-image.png)

## What is this?

Taalbits is a mobile-friendly quiz app for Dutch learners at **B1+ / B2** level. It helps you practice the small language patterns that often look familiar but behave differently in real sentences.

Examples:

- *opnemen*, *aannemen*, *afnemen*, and *innemen* all use **nemen**, but mean different things.
- *wachten op*, *denken aan*, *zorgen voor*, and *houden van* need fixed prepositions.
- Some exercises use multiple choice; others ask you to type the missing word.

The goal is not grammar theory. The goal is fast, contextual practice with clear feedback.

## Content

Taalbits currently includes **900+ exercises** across verb themes and preposition practice.

| Theme | Practice |
|-------|----------|
| 🚪 **-komen** | aankomen · opkomen · bijkomen · uitkomen |
| 📌 **-zetten** | aanzetten · opzetten · afzetten · doorzetten |
| 🤲 **-nemen** | opnemen · aannemen · afnemen · innemen |
| 🎯 **-halen** | ophalen · afhalen · inhalen · achterhalen |
| 👀 **-kijken** | aankijken · bekijken · opkijken · verkijken |
| 🔎 **-zoeken** | afzoeken · opzoeken · onderzoeken · uitzoeken |
| 🧩 **-krijgen** | aankrijgen · doorkrijgen · uitkrijgen · afkrijgen |
| 🛠️ **-werken** | bewerken · meewerken · samenwerken · verwerken |
| 🎭 **-doen** | aandoen · uitdoen · meedoen · voordoen |
| 🔗 **Preposities** | wachten op · denken aan · zorgen voor · houden van |

New themes are added by dropping a JSON file into `data/` and registering it in `data/themes.json`.

## Features

- Mobile-first dark UI for quick study sessions
- Theme-based practice for specific Dutch patterns
- Mix mode for random multiple-choice practice across themes
- Multiple-choice and fill-in question types
- Optional hints
- Instant feedback for correct and wrong answers
- Wrong-answer review at the end of a session
- Shuffled questions and answer options
- Keyboard navigation on desktop
- Offline support after the first load
- Zero build step: vanilla HTML, CSS, JavaScript, and JSON

## Project structure

```text
taalbits/
├── index.html                  # UI, routing, and quiz logic
├── site.webmanifest            # PWA manifest
├── sw.js                       # Service worker
├── og-image.png                # Social sharing preview image
├── data/
│   ├── themes.json             # Theme registry
│   ├── komen.json              # Questions for -komen
│   ├── zetten.json             # Questions for -zetten
│   ├── nemen.json              # Questions for -nemen
│   ├── halen.json              # Questions for -halen
│   ├── kijken.json             # Questions for -kijken
│   ├── zoeken.json             # Questions for -zoeken
│   ├── krijgen.json            # Questions for -krijgen
│   ├── werken.json             # Questions for -werken
│   ├── doen.json               # Questions for -doen
│   ├── vallen.json             # Questions for -vallen
│   ├── gaan.json               # Questions for -gaan
│   ├── houden.json             # Questions for -houden
│   ├── maken.json              # Questions for -maken
│   └── preposities.json        # Fill-in preposition questions
├── assets/icons/               # Favicons and PWA icons
├── README.md
├── LICENSE
└── .gitignore
```

## Question data

Multiple-choice themes use this format:

```json
{
  "sentence": "De patiënt is gisteren in het ziekenhuis ______.",
  "options": ["opgenomen", "aangenomen", "ingenomen", "afgenomen"],
  "correct": 0,
  "explanation": "'Opnemen' = in het ziekenhuis laten blijven.",
  "wrongExplanations": {
    "1": "'Aangenomen' = geaccepteerd, bijvoorbeeld voor een baan.",
    "2": "'Ingenomen' = een medicijn geslikt.",
    "3": "'Afgenomen' = minder geworden."
  },
  "hint": "Denk aan wat er in een ziekenhuis gebeurt."
}
```

Fill-in themes use `answer`, `acceptedAnswers`, `explanation`, and `hint` instead of answer options.

## Adding a new theme

1. Create a new question file in `data/`, for example `data/geven.json`.
2. Add the theme to `data/themes.json`.
3. Commit and push. GitHub Pages updates automatically.

Example:

```json
{
  "id": "geven",
  "label": "-geven",
  "description": "meegeven · opgeven · aangeven · uitgeven",
  "emoji": "🎁",
  "color": "#8B5CF6"
}
```

## Run locally

```bash
git clone https://github.com/chardrizard/taalbits.git
cd taalbits
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Opening the app directly through `file://` will not work because the app fetches JSON files from `data/`.

## Tech stack

- Vanilla HTML, CSS, and JavaScript
- External JSON files for all quiz content
- No framework
- No build tools
- No npm dependencies
- GitHub Pages hosting

## License

MIT
