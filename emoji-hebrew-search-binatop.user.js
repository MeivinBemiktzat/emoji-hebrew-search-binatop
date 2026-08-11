// ==UserScript==
// @name         חיפוש אימוג'ים בעברית - בינה טופ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  מאפשר חיפוש אימוג'ים בעברית בבינה טופ
// @author       מייבין במקצת
// @match        https://bina.top/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // מילון חיפוש עברית -> אנגלית
    const emojiTranslations = {
        // רגשות
        'שמח': 'smile',
        'שמחה': 'joy',
        'צוחק': 'laugh',
        'צחוק': 'laugh',
        'מצחיק': 'laugh',
        'חיוך': 'smile',
        'קורץ': 'wink',
        'קריצה': 'wink',
        'בוכה': 'cry',
        'בכי': 'cry',
        'עצוב': 'sad',
        'עצב': 'sad',
        'כועס': 'angry',
        'כעס': 'angry',
        'אהבה': 'heart',
        'אוהב': 'love',
        'לב': 'heart',
        'נשיקה': 'kiss',
        'מופתע': 'surprised',
        'הפתעה': 'surprise',
        'מבולבל': 'confused',
        'מבוכה': 'embarrassed',
        'פחד': 'fear',
        'מפחד': 'fear',
        'מגניב': 'cool',
        'מגניב מאוד': 'cool',

        // ידיים
        'תודה': 'pray',
        'תודה רבה': 'pray',
        'מתפלל': 'pray',
        'תפילה': 'pray',
        'אמן': 'pray',
        'אגודל': 'thumb',
        'אגודל למעלה': 'thumbs up',
        'לייק': 'thumbs up',
        'אישור': 'ok',
        'אוקיי': 'ok',
        'מחיאות כפיים': 'clap',
        'כפיים': 'clap',
        'שלום': 'wave',
        'מנופף': 'wave',
        'יד': 'hand',
        'אצבע': 'finger',
        'וי': 'victory',
        'ניצחון': 'victory',
        'אגרוף': 'fist',
        'שריר': 'muscle',

        // חפצים וסמלים
        'אש': 'fire',
        'כוכב': 'star',
        'כוכבים': 'star',
        'שמש': 'sun',
        'ירח': 'moon',
        'ענן': 'cloud',
        'גשם': 'rain',
        'שלג': 'snow',
        'ברק': 'lightning',
        'מים': 'water',
        'פרח': 'flower',
        'פרחים': 'flower',
        'עץ': 'tree',
        'מתנה': 'gift',
        'מתנות': 'gift',
        'כתר': 'crown',
        'מפתח': 'key',
        'מנעול': 'lock',
        'טלפון': 'phone',
        'מחשב': 'computer',
        'מייל': 'email',
        'דואר': 'email',
        'שעון': 'clock',
        'מצלמה': 'camera',

        // אוכל
        'פיצה': 'pizza',
        'המבורגר': 'hamburger',
        'עוגה': 'cake',
        'עוגייה': 'cookie',
        'תפוח': 'apple',
        'בננה': 'banana',
        'קפה': 'coffee',
        'תה': 'tea',
        'גלידה': 'ice cream',

        // בעלי חיים
        'כלב': 'dog',
        'כלבים': 'dog',
        'חתול': 'cat',
        'חתולים': 'cat',
        'אריה': 'lion',
        'נמר': 'tiger',
        'קוף': 'monkey',
        'דג': 'fish',
        'דגים': 'fish',
        'ציפור': 'bird',
        'סוס': 'horse',
        'פרה': 'cow',
        'תרנגולת': 'chicken',

        // אירועים
        'מזל טוב': 'congratulations',
        'יום הולדת': 'birthday',
        'חגיגה': 'party',
        'מסיבה': 'party',
        'בלונים': 'balloon',
        'בלון': 'balloon',
        'זיקוקים': 'fireworks',

        // סימנים
        'וי ירוק': 'check',
        'וי': 'check',
        'איקס': 'x',
        'שגיאה': 'x',
        'לא': 'no',
        'כן': 'yes',
        'שאלה': 'question',
        'סימן שאלה': 'question',
        'קריאה': 'exclamation',
        'סימן קריאה': 'exclamation',
        'מאה': '100',
        'חדש': 'new',
        'חשוב': 'warning',
        'אזהרה': 'warning'
    };

    function translateHebrew(text) {
        const original = text.trim();

        if (!original) {
            return original;
        }

        // אם אין עברית – משאירים את החיפוש המקורי
        if (!/[\u0590-\u05FF]/.test(original)) {
            return original;
        }

        // קודם בודקים ביטוי שלם
        const normalized = original.replace(/\s+/g, ' ');

        if (emojiTranslations[normalized]) {
            return emojiTranslations[normalized];
        }

        // אחר כך מנסים כל מילה/ביטוי
        const words = normalized.split(' ');
        const translated = words.map(word => {
            return emojiTranslations[word] || word;
        }).join(' ');

        return translated;
    }

    let lastHebrewSearch = '';

    function setupEmojiSearch(input) {
        if (!input || input.dataset.hebrewEmojiSearch) return;

        input.dataset.hebrewEmojiSearch = 'true';

        input.addEventListener('input', function () {
            const value = input.value.trim();

            // חיפוש רגיל באנגלית
            if (!/[\u0590-\u05FF]/.test(value)) {
                lastHebrewSearch = '';
                return;
            }

            const translated = translateHebrew(value);

            if (!translated || translated === value) {
                return;
            }

            // שומרים את מה שהמשתמש כתב
            lastHebrewSearch = value;

            // מחליפים זמנית את החיפוש לאנגלית
            input.value = translated;

            // נותנים למנוע החיפוש של NodeBB להפעיל את עצמו
            input.dispatchEvent(new Event('input', {
                bubbles: true
            }));

            input.dispatchEvent(new Event('change', {
                bubbles: true
            }));

            /*
             * מחזירים את הטקסט העברי אחרי שהחיפוש בוצע,
             * כדי שהמשתמש עדיין יראה מה שהוא כתב.
             */
            setTimeout(() => {
                if (document.activeElement === input && lastHebrewSearch) {
                    const current = input.value;

                    if (current === translated) {
                        input.value = lastHebrewSearch;
                    }
                }
            }, 50);
        });
    }

    function findSearchBox() {
        const input = document.querySelector(
            'input.emoji-dialog-search'
        );

        if (input) {
            setupEmojiSearch(input);
        }
    }

    // טעינה ראשונית
    findSearchBox();

    // חלון האימוג'ים נטען דינמית
    const observer = new MutationObserver(() => {
        findSearchBox();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
