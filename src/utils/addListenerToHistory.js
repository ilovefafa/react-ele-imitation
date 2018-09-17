export default (function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
        if (typeof history.onPushState === "function") {
            history.onPushState({ state: state });
        }
        return pushState.apply(history, arguments);
    };

    var replaceState = history.replaceState;
    history.replaceState = function (state) {
        if (typeof history.onReplaceState === "function") {
            history.onReplaceState({ state: state });
        }
        return replaceState.apply(history, arguments);
    };
})(window.history);

