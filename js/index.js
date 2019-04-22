var ToDoInput = React.createClass({ displayName: "ToDoInput",
  addTask: function (e) {
    var newthing = document.getElementById('new-task').value;
    if (newthing) {
      this.props.addToDo(newthing);
    };

    document.getElementById('new-task').value = '';

    e.preventDefault();
  },
  render: function () {
    return (
      React.createElement("form", { onSubmit: this.addTask },
      React.createElement("input", { type: "text", id: "new-task", placeholder: "new programmer" }),
      React.createElement("input", { type: "submit", className: "btn", value: "Add" })));


  } });


var FinishedList = React.createClass({ displayName: "FinishedList",
  render: function () {
    var endTasks = this.props.completedTasks.map(function (task, index) {
      return (
        React.createElement("li", { key: index, className: "finished" }, task));

    });
    return (
      React.createElement("div", null,
      React.createElement("ul", null,
      endTasks),

      React.createElement("form", { onSubmit: this.props.clear },
      React.createElement("input", { type: "submit", className: "btn", value: "Clear" }))));



  } });


var ToDoList = React.createClass({ displayName: "ToDoList",
  render: function () {
    var newToDos = this.props.todos.map(function (todo, index) {
      return (
        React.createElement("li", { key: index },
        React.createElement("input", { className: "check-done", type: "checkbox" }),
        React.createElement("span", { className: "todo-span" }, todo)));


    });
    return (
      React.createElement("div", null,
      React.createElement("ul", null,
      newToDos),

      React.createElement("form", { onSubmit: this.props.moveDone },
      React.createElement("input", { className: "btn", type: "submit", value: "Move to Favorites \u2764 \u2192" }))));



  } });


var ToDoBox = React.createClass({ displayName: "ToDoBox",
  getInitialState: function () {
    return {
      items: [
      "Nazar Voitovych, PI-15-2",
      "Virliana Tymkiv, PI-15-2",
      "Misha Push, PI-15-1"],

      done: ["Tetiana Petrosaniak, PI-15-2"] };

  },
  addToDo: function (todo) {
    this.setState({
      items: this.state.items.concat([todo]) });

  },
  clearFinished: function (e) {
    e.preventDefault();

    this.setState({
      done: [] });

  },
  moveToCompleted: function (e) {
    var finished = document.getElementsByClassName('check-done');
    var newItems = [];
    var newDone = this.state.done;

    e.preventDefault();

    Array.prototype.forEach.call(finished, function (box) {
      var isChecked = box.checked;
      var siblingSpan = box.parentElement.getElementsByClassName('todo-span');

      if (isChecked === true) {
        var todo = siblingSpan[0].innerHTML;
        newDone.push(todo);
      } else
      {
        var todo = siblingSpan[0].innerHTML;
        newItems.push(todo);
      }
    });

    this.setState({
      items: newItems,
      done: newDone });


    // make sure all checkboxes left in 'To Do' are unchecked
    var allChecks = document.getElementsByClassName('check-done');

    Array.prototype.forEach.call(finished, function (box) {
      box.checked = false;
    });
  },
  render: function () {
    return (
      React.createElement("div", { className: "inside-app" },
      React.createElement("div", { className: "task-model" },
      React.createElement("h1", null, "LIST OF PROGRAMMERS"),
      React.createElement(ToDoList, { className: "toDoList", todos: this.state.items, moveDone: this.moveToCompleted })),

      React.createElement("div", { className: "input-area" },
      React.createElement("h3", null, "Add New Programmer"),
      React.createElement(ToDoInput, { addToDo: this.addToDo }),

      React.createElement("div", { className: "completed-tasks" },
      React.createElement("h3", null, "Favorites"),
      React.createElement(FinishedList, { completedTasks: this.state.done, clear: this.clearFinished })))));




  } });


ReactDOM.render(
React.createElement(ToDoBox, null),
document.getElementById('app'));