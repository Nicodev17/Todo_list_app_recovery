/*global app, $on */
(function () {
	'use strict';

	/**
	 * Generates the application
	 * @constructor
	 */
	// function App() {
		/**
		 * Sets up a brand new Todo list.
		 *
		 * @constructor
		 * @param {string} name The name of your new to do list.
		 */
		function Todo(name) {
			this.storage = new app.Store(name);
			this.model = new app.Model(this.storage);
			this.template = new app.Template();
			this.view = new app.View(this.template);
			this.controller = new app.Controller(this.model, this.view);
		}

		/**
		 * Defines a new todo
		 */
		var todo = new Todo('todos-vanillajs'); // in View.js, View.prototype.bind() and View.prototype.render()

		/**
		 * Add the route of the page in the url '' || active || completed
		 */
		function setView() {
			todo.controller.setView(document.location.hash);
		}
		$on(window, 'load', setView);
		$on(window, 'hashchange', setView);
	// }
})();
