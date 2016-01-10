/**
 * Created by syouon.
 */

var data = [
    {id: 0, label: "Task number 1"},
    {id: 1, label: "Task number 2"},
    {id: 2, label: "Task number 3"}
];

var TodoPage = React.createClass({
    getInitialState: function () {
        return {
            freeId: 3,
            data: this.props.data
        };
    },

    onAddingTask: function (label) {
        data.push({ id: this.state.freeId, label: label});
        var newFreeId = this.state.freeId+1;
        var newState = {
            freeId: newFreeId,
            data: data
        };
        this.setState(newState);
    },

    render: function () {
        return (
            <div>
                <h1>Todo list</h1>
                <TodoForm onSubmit={this.onAddingTask} />
                <TodoList data={this.state.data} />
            </div>
        );
    }
});

var TodoForm = React.createClass({
    getInitialState: function () {
        return { task: '' };
    },

    submitting: function () {
        this.props.onSubmit(this.state.task);
    },

    onInputChange: function (e) {
        this.setState({ task: e.target.value});
    },

    render: function () {
        return (
            <form onSubmit={this.submitting}>
                <input type="text" placeholder="What's next?" value={this.state.task} onChange={this.onInputChange} />
                <input type="submit" />
            </form>
        );
    }
});

var TodoList = React.createClass({

    render: function () {
        var tasks = this.props.data.map(function (task) {
            return <TodoTask key={task.id}>{task.label}</TodoTask>;
        });
        return <ul>{tasks}</ul>;
    }
});

var TodoTask = React.createClass({
    render: function () {
        return (
            <li>{this.props.children}</li>
        );
    }
});

ReactDOM.render(
    <TodoPage data={data} />,
    document.getElementById('content')
);