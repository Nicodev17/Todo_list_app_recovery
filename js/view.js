/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
	'use strict';

	/**
	 * Sets the default values for {@link Template}.
	 * 
	 * @constructor
	 */
	function View(template) {
		this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

		this.$todoList = qs('.todo-list');
		this.$todoItemCounter = qs('.todo-count');
		this.$clearCompleted = qs('.clear-completed');
		this.$main = qs('.main');
		this.$footer = qs('.footer');
		this.$toggleAll = qs('.toggle-all');
		this.$newTodo = qs('.new-todo');
	}

	/**
	 * Delete the todo according to his id.
	 * 
	 * @param {number} id The ID of the element to delete.
	*/
	View.prototype._removeItem = function (id) {
		var elem = qs('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	};

	/**
	 * Hide completed items.
	 * 
	 * @param {number} completedCount The number of checked items.
	 * @param {bolean} visible True if visible, false otherwise.
	 */
	View.prototype._clearCompletedButton = function (completedCount, visible) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
		this.$clearCompleted.style.display = visible ? 'block' : 'none';
	};

	/**
	 * Indicates the current page.
	 * 
	 * @param {string} currentPage The current page can have the values :
	 * '' || active || completed
	 */
	View.prototype._setFilter = function (currentPage) {
		qs('.filters .selected').className = '';
		qs('.filters [href="#/' + currentPage + '"]').className = 'selected';
	};

	/**
	 * Test if the item is checked.
	 * 
	 * @param {number} id ID of the item to test.
	 * @param {bolean} completed The status of the item. 
	 */
	View.prototype._elementComplete = function (id, completed) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = completed ? 'completed' : '';

		// In case it was toggled from an event and not by clicking the checkbox
		qs('input', listItem).checked = completed;
	};

	/**
	 * Allows editing of an item.
	 * 
	 * @param {number} id The ID of the item to edit.
	 * @param {string} title The content of the item's modifications.
	 */
	View.prototype._editItem = function (id, title) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = listItem.className + ' editing';

		var input = document.createElement('input');
		input.className = 'edit';

		listItem.appendChild(input);
		input.focus();
		input.value = title;
	};

	/**
	 * Replaces the old item by the edited item.
	 * 
	 * @param {number} id The ID of the item to edit.
	 * @param {string} title The content of the item's modifications.
	 */
	View.prototype._editItemDone = function (id, title) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		var input = qs('input.edit', listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace('editing', '');

		qsa('label', listItem).forEach(function (label) {
			label.textContent = title;
		});
	};

	/**
	 * Return the elements in the DOM.
	 * 
	 * @param {string} viewCmd The active function.
	 * @param {object} parameter The active parameters.
	 */
	View.prototype.render = function (viewCmd, parameter) {
		var self = this;
		var viewCommands = {
			showEntries: function () {
				self.$todoList.innerHTML = self.template.show(parameter);
			},
			removeItem: function () {
				self._removeItem(parameter);
			},
			updateElementCount: function () {
				self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
			},
			clearCompletedButton: function () {
				self._clearCompletedButton(parameter.completed, parameter.visible);
			},
			contentBlockVisibility: function () {
				self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
			},
			toggleAll: function () {
				self.$toggleAll.checked = parameter.checked;
			},
			// Optimized (toggleAllVisibility for testing phase)
			toggleAllVisibility: function () {
				self.$toggleAll.style.display = parameter.visible ? 'block' : 'none';
			},
			setFilter: function () {
				self._setFilter(parameter);
			},
			clearNewTodo: function () {
				self.$newTodo.value = '';
			},
			elementComplete: function () {
				self._elementComplete(parameter.id, parameter.completed);
			},
			editItem: function () {
				self._editItem(parameter.id, parameter.title);
			},
			editItemDone: function () {
				self._editItemDone(parameter.id, parameter.title);
			}
		};

		viewCommands[viewCmd]();
	};

	/**
	 * Adds an ID to the element.
	 * 
	 * @param {object} element The active element.
	 */
	View.prototype._itemId = function (element) {
		var li = $parent(element, 'li');
		return parseInt(li.dataset.id, 10);
	};

	/**
	 * EventListener of the validation of the element's editing.
	 * 
	 * @param {function} handler Callback executed over certains contitions.
	 */
	View.prototype._bindItemEditDone = function (handler) {
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'blur', function () {
			if (!this.dataset.iscanceled) {
				handler({
					id: self._itemId(this),
					title: this.value
				});
			}
		});

		$delegate(self.$todoList, 'li .edit', 'keypress', function (event) {
			if (event.keyCode === self.ENTER_KEY) {
				// Remove the cursor from the input when you hit enter just like if it
				// were a real form
				this.blur();
			}
		});
	};

	/**
	 * EventListener of the cancelling of the element's editing.
	 * 
	 * @param {function} handler Callback executed over certains contitions.
	 */
	View.prototype._bindItemEditCancel = function (handler) {
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'keyup', function (event) {
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({id: self._itemId(this)});
			}
		});
	};

	/**
	 * Make the link between the controller's methods and the view's elements.
	 * 
	 * @param {function} event The active event.
	 * @param {function} handler Callback executed over certains contitions.
	 */
	View.prototype.bind = function (event, handler) {
		var self = this;

		// Event management (Optimized)
		switch (event) {
			case 'newTodo':
				/**
				 * $on : adds eventListener
				 * It passes self.$newTodo.value to the handler (input's content).
				 */
				$on(self.$newTodo, 'change', function() { handler(self.$newTodo.value) });
				break;
			case 'removeCompleted':
				$on(self.$clearCompleted, 'click', function() { handler() });
				break;
			case 'toggleAll':
				$on(self.$toggleAll, 'click', function() { handler({completed: this.checked}) });
				break;
			case 'itemEdit':
				$delegate(self.$todoList, 'li label', 'dblclick', function() {handler({id: self._itemId(this)}) });
				break;
			case 'itemRemove':
				$delegate(self.$todoList, '.destroy', 'click', function() { handler({id: self._itemId(this)}) });
				break;
			case 'itemToggle':
				$delegate(self.$todoList, '.toggle', 'click', function() { handler({ id: self._itemId(this), completed: this.checked}) });
				break;
			case 'itemEditDone': 
				self._bindItemEditDone(handler);
				break;
			case 'itemEditCancel':
				self._bindItemEditCancel(handler);
				break;
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));
