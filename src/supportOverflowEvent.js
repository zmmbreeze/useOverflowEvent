/**
 * Detect overflow event support and create bind function.
 * https://github.com/zmmbreeze/supportOverflowEvent
 *
 * Thanks for Daniel's greate blog.
 * http://www.backalleycoder.com/2013/03/14/oft-overlooked-overflow-and-underflow-events/
 *
 * @author MZhou <zmmbreeze0825@gmail.com>
 * @licentse MIT
 * @version 0.1
 */
(function () {
    /**
     * Detect overflow event support.
     * Get addOverflowListener if supported.
     *
     * @param {function(function(Element, string, Function))} callback .
     */
    function supportOverflowEvent(callback) {
        if ('OverflowEvent' in window &&
            typeof window.OverflowEvent === 'function') {
            // chrome(test on 9+) support overflowchanged event
            callback(function (element, type, cb) {
                element.addEventListener('overflowchanged', function (e) {
                    var isOver = type === 'over';
                    if ((e.orient === 0 && e.horizontalOverflow === isOver) ||
                        (e.orient === 1 && e.verticalOverflow === isOver) ||
                        (e.orient === 2 &&
                            e.horizontalOverflow == isOver &&
                            e.verticalOverflow == isOver)) {
                        cb.call(this, e);
                    }
                }, false);
            });
            return;
        }

        var element = document.createElement('div');
        if (element.addEventListener) {
            element.style.cssText = 'overflow:scroll;height:1px;width:1px;';
            document.body.appendChild(element);

            var overflowSupport = false;
            // firefox(tested on 1.5+) support overflow/underflow event
            element.addEventListener('overflow', function () {
                overflowSupport = true;
            }, false);
            element.innerHTML = '<div style="height:200px;width:1px;"></div>';

            var timeout;
            var end = function() {
                if (end.done) {
                    return;
                }
                end.done = true;

                if (overflowSupport) {
                    callback(function (element, type, cb) {
                        element.addEventListener(type + 'flow', cb, false);
                    });
                } else {
                    callback();
                }

                clearTimeout(timeout);
                document.body.removeChild(element);
            };
            // Use scroll event to make sure it's right after overflow event.
            element.addEventListener('scroll', end, false);
            element.scrollTop = 1000;
            // Make sure callback was called, even browser not support scroll event.
            // For example 'opera 11.*'
            timeout = setTimeout(end, 250);
        } else {
            callback();
        }
    }

    if (typeof define === 'function' && define.amd) {
        define('supportOverflowEvent', [], supportOverflowEvent);
    } else {
        window.supportOverflowEvent = supportOverflowEvent;
    }
})();
