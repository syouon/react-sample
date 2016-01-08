/**
 * Created by syouon.
 */

var Title = React.createClass({
    render: function () {
        return (
            <h1>{this.props.text}</h1>
        );
    }
});

var TodoInput = React.createClass({
    render: function () {
        return <input type="text" placeholder="What am I going to do?"/>;
    }
});

var TodoValidButton = React.createClass({
    render: function () {
        return <input type="submit" value={this.props.text}/>;
    }
});

var TodoForm = React.createClass({
    render: function () {
        return (
            <form>
                <TodoInput/>
                <TodoValidButton text="Add"/>
            </form>
        );
    }
});

var TodoHeader = React.createClass({
    render: function () {
        return (
            <div>
                <Title text="Todo list"/>
                <TodoForm />
            </div>
        );
    }
});

ReactDOM.render(
    <TodoHeader />,
    document.getElementById('content')
);