import React from 'react';
import ReactStars from './ReactStars';

function defaultGetSize(size, vw, vh,maxSize){
	console.log('size function fired!');
	const proposedSize= vw/50;
	if(proposedSize>=maxSize){
		return maxSize;
	}
	return proposedSize;
}

function debounce(func, wait, immediate){
	console.log('debounce called');
	var timeout;
	return function(){
		var context = this;
		var args = arguments;
		var later = function(){
			timeout = null;
			if(!immediate){
				func.apply(context, args);
			} 
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout=setTimeout(later, wait);
		if(callNow) {
			func.apply(context, args);
		}
	};
};
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
		console.log('MAX SIZE');
		console.log(this.maxSize);
		this.debounceWait=props.debounceWait || 200;
	}

	handleResize(){
		const size = this.sizeFunc(this.props.size, window.innerWidth, window.innerHeight, this.maxSize);
		if(size > this.state.size || size< this.state.size){
		console.log('setting state in handle resize');
		this.setState({
			size: size
		});
		}

	}

	componentDidMount(){
		window.addEventListener('resize', debounce(this.handleResize, this.debounceWait));
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