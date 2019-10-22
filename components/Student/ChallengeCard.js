import React from 'react';
import {
	StyleSheet,
	Text,
	Button,
	Alert
} from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import * as challengeActions from '../../store/actions/challengeActions';

const ChallengeCard = props => {

	const dispatch = useDispatch();

	const cancelChallenge = async (id) => {
		Alert.alert('Confirm Cancel Challenge', 'Do you want to cancel this challenge?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
	 				await dispatch(challengeActions.cancelChallenge(id, props.challenge.bid));
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const acceptChallenge = async (id) => {
		Alert.alert('Confirm Accept Challenge', 'Do you want to accept this challenge of points ?',
			 [
			 	{ text: 'Okay', onPress: async ()=>{
			 		try{
	 					await dispatch(challengeActions.acceptChallenge(id, props.challenge.bid));
			 		} catch (err) {
			 			Alert.alert('Acceptance Error!', err.message, [{text:'Okay' }]);
			 		}
			 	}},
			 	{ text: 'Cancel' }
			 ]
		);
	};

	const startDoQuestion = () => {
		console.log('start do question');
	}

	const confirm = () => {
		console.log('confirm');
	}

	const time = moment(props.challenge.time).format('MMMM DD YYYY, HH:mm:ss');
	//before accepted, challenger
	if(props.challenge.stage===0 && props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Waiting for opponent's response...</Text>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Cancel'
					onPress={e=>cancelChallenge(props.challenge.id, props.challenge.bid)}
				/>
			</Card>
		);
	}
	//before accepted, challengee
	else if(props.challenge.stage===0&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>You are challenged!</Text>
				<Text>Opponent: {props.challenge.challengerId}</Text>
				<Text>Bid: {props.challenge.bid}</Text>
				<Text>Challenge Time: {time}</Text>
				<Button 
					title='Accept'
					onPress={e=>acceptChallenge(props.challenge.id, props.challenge.bid)}
				/>
			</Card>
		);
	}
	//do question, challenger
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Button 
					title='Start Challenge'
					onPress={startDoQuestion}
				/>
			</Card>
		);
	}
	//do question, challengee
	else if(props.challenge.stage===1&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengerId}</Text>
				<Button 
					title='Start Challenge'
					onPress={startDoQuestion}
				/>
			</Card>
		);
	}
	//completed, challenger
	else if(props.stage===3&&props.userId===props.challenge.challengerId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengeeId}</Text>
				<Button 
					title='Confirm'
					onPress={confirm}
				/>
			</Card>
		);
	}
	//completed, challengee
	else if(props.challenge.stage===3&&props.userId===props.challenge.challengeeId){
		return(
			<Card style={styles.card}>
				<Text>Opponent: {props.challenge.challengerId}</Text>
			</Card>
		);
	}
	return null;
};

const styles = StyleSheet.create({
	card:{

	}
});

export default ChallengeCard;