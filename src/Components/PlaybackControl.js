import React from 'react';
import { controller } from '../Controller/Controller'
import { Clickable } from "./Common";

const TickMode = {
	RealTime: "real-time",
	RealTimeAutoPause: "real-time, auto pause",
	AutoFastForward: "auto fast forward",
	Manual: "manual"
};

class TickModeSelection extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {
			tickMode: TickMode.Manual
		}
		this.onChangeValue = this.unboundOnSelectionChanged.bind(this);
	}
	unboundOnSelectionChanged(evt) {
		console.log(evt.target.value);
	}
	render() {
		return <div onChange={this.onChangeValue}>
			<label>
				<input type={"radio"} value={TickMode.RealTime} defaultChecked={false} name={"tick mode"}/>
				{TickMode.RealTime}
			</label>
			<label>
				<input type={"radio"} value={TickMode.RealTimeAutoPause} defaultChecked={false} name={"tick mode"}/>
				{TickMode.RealTimeAutoPause}
			</label>
			<label>
				<input type={"radio"} value={TickMode.AutoFastForward} defaultChecked={false} name={"tick mode"}/>
				{TickMode.AutoFastForward}
			</label>
			<label>
				<input type={"radio"} value={TickMode.Manual} defaultChecked={true} name={"tick mode"}/>
				{TickMode.Manual}
			</label>
		</div>
	}
}

export var getStepSize = function() { return 0.5; }

class ManualTick extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 0.5};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		getStepSize = this.unboundGetStepSize.bind(this);
	}

	unboundGetStepSize() {
		return parseFloat(this.state.value);
	}

	handleSubmit (event) {
		controller.requestTick({
			deltaTime: parseFloat(this.state.value)
		});
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		const form =
			<form onSubmit={this.handleSubmit}>
				<span>Step by </span>
				<input size="5" type="text"
					   value={this.state.value} onChange={this.handleChange}/>
				<span> seconds </span>
				<input type="submit" value="GO"/>
			</form>;
		return (
			<div className={"manualTickSelection"}>{form}</div>
		)}
}

class PlaybackControl extends React.Component {
	render() {
		let playPauseButton = <Clickable onClickFn={()=>{
			controller.requestPlayPause({});
		}} content={"[Play/Pause]"}/>

		let fastForwardButton = <Clickable onClickFn={()=>{
			controller.requestFastForward({})
		}} content={"[Fast-forward]"}/>

		// TODO
		return <div className={"playbackControl"}>
			{/*
			<TickModeSelection/>
			{playPauseButton}
			{fastForwardButton}
			*/}
			<ManualTick/>
		</div>;
	}
}

export const playbackControl = <PlaybackControl/>;