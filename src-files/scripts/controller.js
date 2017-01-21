
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
  return {__html: markup};
}

class InputForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form>
				<textarea value={this.props.input} onChange={this.props.handleChange} />
			</form>
		);
	}
}

//https://facebook.github.io/react/docs/forms.html
class OutputForm extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div dangerouslySetInnerHTML={createMarkup(this.props.output)}></div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: 'Input',
			output: '<h1>Output</h1>'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({input: event.target.value});
		this.setState({output: marked(event.target.value)});
	}

	render() {
		return (
			<div id="App">
				<div id="input-form" className="col-6">
					<InputForm input={this.state.input} handleChange={this.handleChange}/>
				</div>
				<div id="input-form" className="col-6">
					<OutputForm output={this.state.output}/>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
