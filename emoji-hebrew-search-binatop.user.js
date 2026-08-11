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
    // 😀 פרצופים ורגשות
    'שמח': 'smile',
    'שמחה': 'joy',
    'חיוך': 'smile',
    'מחייך': 'smile',
    'צוחק': 'laughing',
    'צחוק': 'laughing',
    'מצחיק': 'laughing',
    'קורע': 'rofl',
    'קורע מצחוק': 'rofl',
    'מתפקע': 'rofl',
    'דמעה': 'joy',
    'בוכה': 'cry',
    'בכי': 'cry',
    'עצוב': 'sad',
    'עצב': 'sad',
    'כועס': 'angry',
    'כעס': 'angry',
    'עצבני': 'angry',
    'זועם': 'rage',
    'מופתע': 'astonished',
    'הפתעה': 'astonished',
    'הלם': 'scream',
    'בהלם': 'scream',
    'וואו': 'astonished',
    'ווואו': 'astonished',
    'מהמם': 'star-struck',
    'מדהים': 'star-struck',
    'איזה יופי': 'heart_eyes',
    'יפה': 'heart_eyes',
    'אהבתי': 'heart_eyes',
    'קורץ': 'wink',
    'קריצה': 'wink',
    'מבולבל': 'confused',
    'בלבול': 'confused',
    'מבוכה': 'flushed',
    'נבוך': 'flushed',
    'ביישן': 'blush',
    'מחשבה': 'thinking',
    'חושב': 'thinking',
    'מה': 'confused',
    'לא יודע': 'confused',
    'שקט': 'shushing_face',
    'סוד': 'shushing_face',
    'עייף': 'tired_face',
    'עייפות': 'tired_face',
    'ישן': 'sleeping',
    'שינה': 'sleeping',
    'קריצה': 'wink',
    'לשון': 'stuck_out_tongue',
    'קריצה עם לשון': 'stuck_out_tongue_winking_eye',
    'משוגע': 'crazy_face',
    'מטורף': 'crazy_face',
    'רשע': 'smiling_imp',
    'שד': 'imp',
    'מלאך': 'angel',

    // 👍 ידיים וסימנים
    'אגודל': 'thumbsup',
    'אגודל למעלה': 'thumbsup',
    'לייק': 'thumbsup',
    'אהבתי': 'thumbsup',
    'אישור': 'ok_hand',
    'אוקיי': 'ok_hand',
    'בסדר': 'ok_hand',
    'מחיאות כפיים': 'clap',
    'כפיים': 'clap',
    'מחיאות': 'clap',
    'ידיים': 'raised_hands',
    'יד': 'hand',
    'שלום': 'wave',
    'מנופף': 'wave',
    'נפנוף': 'wave',
    'וי': 'v',
    'ניצחון': 'v',
    'אגרוף': 'fist',
    'אגרוף קדימה': 'facepunch',
    'שריר': 'muscle',
    'חזק': 'muscle',
    'אצבע למעלה': 'point_up',
    'למעלה': 'point_up',
    'למטה': 'point_down',
    'אצבע למטה': 'point_down',
    'ימינה': 'point_right',
    'שמאלה': 'point_left',
    'הצבעה': 'point_up',
    'אצבע': 'point_right',
    'מחזיק אצבעות': 'crossed_fingers',
    'אצבעות': 'crossed_fingers',

    // ❤️ לבבות וסמלים
    'לב': 'heart',
    'לב אדום': 'heart',
    'לב כחול': 'blue_heart',
    'לב ירוק': 'green_heart',
    'לב צהוב': 'yellow_heart',
    'לב סגול': 'purple_heart',
    'לב שחור': 'black_heart',
    'לב לבן': 'white_heart',
    'לב שבור': 'broken_heart',
    'לבבות': 'hearts',
    'נשיקה': 'kissing_heart',
    'אהבה': 'heart',
    'אהוב': 'heart',
    'אהבתי': 'heart',
    'מושלם': 'heart',
    'כוכב': 'star',
    'כוכבים': 'stars',
    'נוצץ': 'sparkles',
    'ניצוץ': 'sparkles',
    'ניצוצות': 'sparkles',

    // 🔥 דברים מגניבים
    'אש': 'fire',
    'בוער': 'fire',
    'חם': 'fire',
    'מגניב': 'sunglasses',
    'קול': 'sunglasses',
    'מגניב מאוד': 'sunglasses',
    'וואו': 'wow',
    'פצצה': 'boom',
    'בום': 'boom',
    'פיצוץ': 'boom',
    'חזק מאוד': '100',
    'מאה': '100',
    'מושלם': '100',
    'הצלחה': 'tada',
    'הצלחתי': 'tada',
    'חגיגה': 'tada',
    'מסיבה': 'partying_face',

    // 😂 תגובות
    'חח': 'joy',
    'חחח': 'joy',
    'חחחח': 'joy',
    'מת מצחוק': 'joy',
    'נקרע': 'joy',
    'דמעות': 'joy',
    'לא יכול': 'joy',
    'אין לי מילים': 'speechless',
    'אין מילים': 'speechless',
    'אוי': 'sweat',
    'אופס': 'sweat',
    'וואלה': 'thinking',
    'ברור': '100',
    'בדיוק': '100',
    'מסכים': 'white_check_mark',

    // ✅ סימנים
    'וי ירוק': 'white_check_mark',
    'וי': 'white_check_mark',
    'נכון': 'white_check_mark',
    'מאושר': 'white_check_mark',
    'איקס': 'x',
    'איקס אדום': 'x',
    'לא נכון': 'x',
    'טעות': 'x',
    'שגיאה': 'x',
    'סימן שאלה': 'question',
    'שאלה': 'question',
    'סימן קריאה': 'exclamation',
    'קריאה': 'exclamation',
    'חשוב': 'warning',
    'אזהרה': 'warning',
    'עצור': 'stop_sign',
    'אסור': 'no_entry_sign',

    // 🎉 אירועים
    'בלון': 'balloon',
    'בלונים': 'balloon',
    'מתנה': 'gift',
    'מתנות': 'gift',
    'עוגה': 'birthday',
    'יום הולדת': 'birthday',
    'זיקוקים': 'fireworks',
    'מסיבה': 'tada',
    'חגיגה': 'tada',
    'פרס': 'trophy',
    'גביע': 'trophy',
    'מדליה': 'medal',
    'מקום ראשון': 'first_place_medal',

    // ☀️ מזג אוויר וטבע
    'שמש': 'sunny',
    'שמשי': 'sunny',
    'ירח': 'crescent_moon',
    'כוכב נופל': 'star2',
    'ענן': 'cloud',
    'גשם': 'rain_cloud',
    'שלג': 'snowflake',
    'שלגיה': 'snowflake',
    'ברק': 'zap',
    'קשת': 'rainbow',
    'פרח': 'flower',
    'פרחים': 'bouquet',
    'עץ': 'deciduous_tree',
    'עלה': 'leaves',
    'עלים': 'leaves',

    // 🐶 בעלי חיים
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
    'ארנב': 'rabbit',
    'עכבר': 'mouse',
    'דבורה': 'bee',
    'פרפר': 'butterfly',
    'דולפין': 'dolphin',
    'לוויתן': 'whale',

    // 🍕 אוכל
    'פיצה': 'pizza',
    'המבורגר': 'hamburger',
    'ציפס': 'fries',
    'נקניקיה': 'hotdog',
    'עוגה': 'cake',
    'עוגייה': 'cookie',
    'שוקולד': 'chocolate_bar',
    'תפוח': 'apple',
    'בננה': 'banana',
    'אבטיח': 'watermelon',
    'תות': 'strawberry',
    'ענבים': 'grapes',
    'קפה': 'coffee',
    'תה': 'tea',
    'גלידה': 'icecream',
    'אוכל': 'yum',

    // 🚗 כלי רכב וטכנולוגיה
    'מכונית': 'car',
    'רכב': 'car',
    'אוטו': 'car',
    'אופניים': 'bike',
    'אופנוע': 'motorcycle',
    'מטוס': 'airplane',
    'רכבת': 'train',
    'אוניה': 'ship',
    'טלפון': 'iphone',
    'מחשב': 'computer',
    'מחשב נייד': 'computer',
    'מצלמה': 'camera',
    'טלויזיה': 'tv',
    'שעון': 'watch',
    'מפתח': 'key',
    'מנעול': 'lock',
    'נורה': 'bulb',

    // 🏆 הישגים
    'גביע': 'trophy',
    'ניצחון': 'trophy',
    'מדליה': 'medal',
    'זהב': 'first_place_medal',
    'כסף': 'second_place_medal',
    'ארד': 'third_place_medal',
    '100': '100',
    'מטרה': 'dart',
    'בול': 'dart',
    'פגיעה': 'dart'
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
