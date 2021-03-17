/*global NodeList */
// (function (window) {
	'use strict';

	/**
	 * Global functions
	 * @constructor
	 */
	function Helper() {

		/**
		 * Get element(s) by CSS selector: qs = querySelector
		 * Using in dans {@link View}.
		 */
		Helper.qs = function (selector, scope) {
			return (scope || document).querySelector(selector);
		};

		/**
		 * Get element(s) by CSS selector: qsa = querySelectorAll
		 * Using in {@link View}.
		 */
		Helper.qsa = function (selector, scope) {
			return (scope || document).querySelectorAll(selector);
		};

		/**
		 * Encapsulates the addEventListener.
		 * Using in {@link View}.
		 * Using in {@link App}.
		 * 
		 * @param {object} target  The target.
		 * @param {bolean} type Focus or Blur.
		 * @param {function} callback The callback function.
		 * @param {object} useCapture The catched element.
		 */
		Helper.$on = function (target, type, callback, useCapture) {
			target.addEventListener(type, callback, !!useCapture);
		};

		/**
		 * Delegate an eventListener to a parent
		 * Using in {@link View}.
		 * 
		 * @param  {object} target The target..
	 	 * @param  {function} selector Check if there is a match between childrens and parents.
	 	 * @param {bolean} type Event type.
	 	 * @param  {function} handler A callback executed if there is a certain condition.
		 */
		Helper.$delegate = function (target, selector, type, handler) {
			function dispatchEvent(event) {
				var targetElement = event.target;
				var potentialElements = Helper.qsa(selector, target);
				var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

				/**
				 * If we have a hasMatch element we call the manager on the target element.
				 */
				if (hasMatch) {
					handler.call(targetElement, event);
				}
			}

			/**
			 * useCapture type can be blur or focus.
			 * @type {bolean}
			 */
			var useCapture = type === 'blur' || type === 'focus';

			/**
			 * $on add a eventListener
			 */
			Helper.$on(target, type, dispatchEvent, useCapture);
		};

		/**
		 * Finds the parent of the element with the tag name : $parent(qs('a'), 'div');
		 * Using in {@link View}.
		 * @param {object} element The active element.
		 * @param {string} (tagName) The element tagName.
		 */
		Helper.$parent = function (element, tagName) {
			// OPTIMIZED
			if (!element.parentNode) {
				return;
			} else if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
				return element.parentNode;
			}
			return Helper.$parent(element.parentNode, tagName);
		};

		/**
		 * Allow loops on nodes : qsa('.foo').forEach(function () {})
		 * Browsing each node is like browsing each table
		 */
		NodeList.prototype.forEach = Array.prototype.forEach;
	
	}
// })(window);
