import React from 'react';
import ReactStars from './ReactStars';

function defaultGetSize(size, vw, vh,maxSize){
	const proposedSize= vw/50;
	if(size>=maxSize){
		return maxSize;
	}
	return proposedSize;
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
		this.maxSize = props.maxSize || Number.MAX_SAFE_INTEGER;
	}

	handleResize(){
		this.setState({
			size: this.sizeFunc(this.props.size, window.innerWidth, window.innerHeight, this.maxSize);
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