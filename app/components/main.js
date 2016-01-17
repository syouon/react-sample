/**
 * Created by syouon.
 */

var TodoPage = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },

    getTasks: function () {
        $.ajax({
            url: this.props.serverUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.serverUrl, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.getTasks();
    },

    onAddingTask: function (task) {
        $.ajax({
            url: this.props.serverUrl,
            type: 'post',
            data: 'task=' + task,
            success: function() {
                this.getTasks();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.serverUrl, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div>
                <h1>Todo list</h1>
                <TodoForm onSubmit={this.onAddingTask}/>
                <TodoList data={this.state.data}/>
            </div>
        );
    }
});

var TodoForm = React.createClass({
    getInitialState: function () {
        return {task: ''};
    },

    submitting: function () {
        this.props.onSubmit(this.state.task);
    },

    onInputChange: function (e) {
        this.setState({task: e.target.value});
    },

    render: function () {
        return (
            <form onSubmit={this.submitting}>
                <input type="text" placeholder="What's next?" value={this.state.task} onChange={this.onInputChange}/>
                <input type="submit"/>
            </form>
        );
    }
});

var TodoList = React.createClass({

    render: function () {
        var tasks = this.props.data.map(function (todo) {
            return <TodoTask key={todo.id}>{todo.task}</TodoTask>;
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
    <TodoPage serverUrl="http://localhost:8080/todos"/>,
    document.getElementById('content')
);