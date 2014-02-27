useOverflowEvent.js
===

Way to detect overflow event support and use it with graceful degradation. Overflow event now supported on Chrome(tested on 9+) and Firefox(tested on 1.5+).

[DEMO](http://nodejs.in/useOverflowEvent)

HOW TO USE
---

```javascript
useOverflowEvent(function (addOverflowListener) {
    if (!addOverflowListener) {
        // browser not support overflow event
        // do somethings or nothing
        return;
    }

    var container = document.getElementById('demo');
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
