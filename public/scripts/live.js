'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
function Square (props) {

    return (
		<button className="square" onClick={() => props.onClick()}>
	      {props.value}
	  </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      history: [{
	        squares: Array(9).fill(null),

	      }],
		  stepNumber: 0,
	      xIsNext: true
	    };
	  }

	handleClick(i) {
	    const history = this.state.history;
		const current = history[this.state.stepNumber];
	    const squares = current.squares.slice();
	    if (calculateWinner(squares) || squares[i]) {
	      return;
	    }
	    squares[i] = this.state.xIsNext ? 'X' : 'O';
	    this.setState({
	      history: history.concat([{
	        squares: squares
	      }]),
		  stepNumber: history.length,
	      xIsNext: !this.state.xIsNext,
	    });
	}

	jumpTo(step) {
	  this.setState({
		stepNumber: step,
		xIsNext: (step % 2) ? false : true,
	  });
	}

	render() {
		const history = this.state.history;
		//const current = history[history.length - 1];
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		let status;
		if (winner) {
		  status = 'Winner: ' + winner;
		} else {
		  status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		const moves = history.map((step, move) => {
		  const desc = move ?
		    'Move #' + move :
		    'Game start';

		  return (
		    <li key={move}>
		      <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
		    </li>
		  );
		});
		return (
			<div>
			<div className="game-board">
			    <Board
			      squares={current.squares}
			      onClick={(i) => this.handleClick(i)}
			    />
			  </div>
			  <div className="game-info">
			    <div>{status}</div>
			    <ol>{moves}</ol>
			  </div>
			</div>
		);
	}
}
*/

//https://github.com/chjj/marked
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

//https://facebook.github.io/react/docs/dom-elements.html
function createMarkup(markup) {
	return { __html: markup };
}

var InputForm = function (_React$Component) {
	_inherits(InputForm, _React$Component);

	function InputForm(props) {
		_classCallCheck(this, InputForm);

		return _possibleConstructorReturn(this, (InputForm.__proto__ || Object.getPrototypeOf(InputForm)).call(this, props));
	}

	_createClass(InputForm, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				null,
				React.createElement('textarea', { value: this.props.input, onChange: this.props.handleChange })
			);
		}
	}]);

	return InputForm;
}(React.Component);

//https://facebook.github.io/react/docs/forms.html


var OutputForm = function (_React$Component2) {
	_inherits(OutputForm, _React$Component2);

	function OutputForm(props) {
		_classCallCheck(this, OutputForm);

		return _possibleConstructorReturn(this, (OutputForm.__proto__ || Object.getPrototypeOf(OutputForm)).call(this, props));
	}

	_createClass(OutputForm, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', { dangerouslySetInnerHTML: createMarkup(this.props.output) });
		}
	}]);

	return OutputForm;
}(React.Component);

var App = function (_React$Component3) {
	_inherits(App, _React$Component3);

	function App() {
		_classCallCheck(this, App);

		var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this3.state = {
			input: 'Input',
			output: '<h1>Output</h1>'
		};

		_this3.handleChange = _this3.handleChange.bind(_this3);
		return _this3;
	}

	_createClass(App, [{
		key: 'handleChange',
		value: function handleChange(event) {
			this.setState({ input: event.target.value });
			this.setState({ output: marked(event.target.value) });
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'App' },
				React.createElement(
					'div',
					{ id: 'input-form', className: 'col-6' },
					React.createElement(InputForm, { input: this.state.input, handleChange: this.handleChange })
				),
				React.createElement(
					'div',
					{ id: 'input-form', className: 'col-6' },
					React.createElement(OutputForm, { output: this.state.output })
				)
			);
		}
	}]);

	return App;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));