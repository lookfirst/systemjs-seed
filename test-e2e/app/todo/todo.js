// Contrived class to show ES6 support
class Helpers {
	verifyHeaderElementText(headerType, headerText) {
		it('should verify the text of a header element', () => {
			var typeOfHeader = element(by.css(headerType));
			expect(typeOfHeader.getText()).toEqual(headerText);
		});
	}
}


describe('todo homepage', () => {
	var helpers = new Helpers();

	beforeEach(function() {
		browser.get('/todo');
	});

	helpers.verifyHeaderElementText('h1', 'todos');

	it('should have an input box', () => {
		var todoTextField = element(by.model('newTodo'));
		var placeholder = todoTextField.getAttribute('placeholder');
		expect(placeholder).toEqual('What needs to be done?');
	});

	it('should add an item into the todo list', () => {
		var text = 'This is a new todo item';

		var todoListLi = element.all(by.css('#todo-list li'));
		expect(todoListLi.count()).toEqual(0);

		var todoTextField = element(by.model('newTodo'));
		todoTextField.sendKeys(text);
		todoTextField.sendKeys(protractor.Key.ENTER);

		var todoListLi = element.all(by.css('#todo-list li'));
		expect(todoListLi.count()).toEqual(1);
	});
});
