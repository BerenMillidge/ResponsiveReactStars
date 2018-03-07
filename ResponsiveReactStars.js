import React from 'react';
import ReactStars from './ReactStars';

function defaultGetSize(size, vw, vh){
	return vw/50;
}
// I need to add some throttling/debouncing to this to make sure
// that it doesn't overload the app with resize pings

export class ResponsiveReactStars extends React.Component{
	constructor(props){
		super(props);
		this.sizeFunc = props.getSize || defaultGetSize;
		this.state={
			size: this.sizeFunc(props.size, window.innerWidth, window.innerHeight)
		};
		this.handleResize = this.handleResize.bind(this);
	}

	handleResize(){
		this.setState({
			size: this.sizeFunc(this.props.size, window.innerWidth, window.innerHeight)
		});
	}

	componentDidMount(){
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleResize);
	}
	
	render(){
		console.log('in render');
		console.log(this.state.size)
		return (
		<div className="responsive-react-stars">
		<ReactStars count={this.props.count}
					value={this.props.value}
					edit={this.props.edit}
					size={this.state.size}
					/>
		</div>
		);
	}
}

export default ResponsiveReactStars;