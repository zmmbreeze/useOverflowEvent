supportOverflowEvent.js
===

Detect overflow event support and create bind function. Overflow event now supported on Chrome(tested on 9+) and Firefox(tested on 1.5+).

(DEMO)[];

HOW TO USE
---

```javascript
supportOverflowEvent(function (addOverflowListener) {
    if (!addOverflowListener) {
        // browser not support
        return;
    }

    var container = document.getElementById('container');
    addOverflowListener(container, 'over', function () {
        console.log('overflow');
    });
    addOverflowListener(container, 'under', function () {
        console.log('underflow');
    });
});
```

LICENTSE
---
MIT
