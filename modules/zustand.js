'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function create(createState) {
  var state;
  var listeners = new Set();

  var setState = function setState(partial, replace) {
    var nextState = typeof partial === 'function' ? partial(state) : partial;

    if (nextState !== state) {
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach(function (listener) {
        return listener(state);
      });
    }
  };

  var getState = function getState() {
    return state;
  };

  var subscribeWithSelector = function subscribeWithSelector(listener, selector, equalityFn) {
    if (selector === void 0) {
      selector = getState;
    }

    if (equalityFn === void 0) {
      equalityFn = Object.is;
    }

    var currentSlice = selector(state);

    function listenerToAdd() {
      // Selector or equality function could throw but we don't want to stop
      // the listener from being called.
      // https://github.com/react-spring/zustand/pull/37
      try {
        var newStateSlice = selector(state);

        if (!equalityFn(currentSlice, newStateSlice)) {
          listener(currentSlice = newStateSlice);
        }
      } catch (error) {
        listener(null, error);
      }
    }

    listeners.add(listenerToAdd); // Unsubscribe

    return function () {
      return listeners.delete(listenerToAdd);
    };
  };

  var subscribe = function subscribe(listener, selector, equalityFn) {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }

    listeners.add(listener); // Unsubscribe

    return function () {
      return listeners.delete(listener);
    };
  };

  var destroy = function destroy() {
    return listeners.clear();
  };

  var api = {
    setState: setState,
    getState: getState,
    subscribe: subscribe,
    destroy: destroy
  };
  state = createState(setState, getState, api);
  return api;
}

exports.default = create;
