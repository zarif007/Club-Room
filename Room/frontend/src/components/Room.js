import React, { Component } from "react";
import {TextField, Button, ButtonGroup, Grid, Typography} from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage'

export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
        } 
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSatiings = this.updateShowSatiings.bind(this);
        this.renderSetiings = this.renderSetiings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
    };

    getRoomDetails() {
        fetch(`/api/get-room?code=${this.roomCode}`)
            .then((response) => {
                if(!response.ok){
                    this.props.leaveRoomCallback();
                    this.props.history.push('/');
                }
            return response.json();
        })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
            });
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };

        fetch('/api/leave-room', requestOptions)
            .then((_response) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            });
    }

    updateShowSatiings(value){
        this.setState({
            showSettings: value,
        })
    }

    renderSettingsButton(){
        return (
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={() => this.updateShowSatiings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    renderSetiings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage update={true} 
                        votesToSkip={this.state.votesToSkip} 
                        guestCanPause={this.state.guestCanPause} 
                        roomCode={this.state.roomCode} 
                        updateCallback={() => {}} 
                    />
                </Grid>
                <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary' onClick={() => this.updateShowSatiings(false)}>
                    Close
                </Button>
                </Grid>
            </Grid>
        )
    }

    render() {
        if(this.state.showSettings){
            return this.renderSetiings();
        }
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        Code : {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        guestCanPause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        isHost: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                
                <Grid item xs={12} align='center'>
                    <ButtonGroup>
                        {this.state.isHost ? this.renderSettingsButton() : null}
                        <Button variant='contained' color='secondary' onClick={this.leaveButtonPressed}>Leave Party</Button>
                    </ButtonGroup>
                    
                </Grid>

            </Grid>
        )
    }
}