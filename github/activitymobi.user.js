// ==UserScript==
// @name         GitHub Activity Fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fix the Activity link on GitHub mobile web to point to /activity
// @author       lolion1y
// @match        *://github.com/*
// @icon         https://github.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function click(e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();

        const a = e.currentTarget;
        const link = [...document.querySelectorAll('a[href$="/activity"]')]
            .find(el => el !== a);
        link ? link.click() : location.assign(a.href.replace(/\/pulse$/, '/activity'));
    }
    function fix() {
        document.querySelectorAll('[data-testid="repo-responsive-details"] a[href$="/pulse"]')
            .forEach(a => {
                a.setAttribute('href', a.getAttribute('href').replace(/\/pulse$/, '/activity'));
                a.addEventListener('click', click);
            });
    }
    new MutationObserver(fix).observe(document.documentElement, {
        childList: true, subtree: true, attributeFilter: ['href'],
    });
    fix();
})();