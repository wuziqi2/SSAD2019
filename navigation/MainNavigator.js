import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//import screens
import StartupScreen from '../screens/StartupScreen';
import LoginScreen from '../screens/Login/LoginScreen';

import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import GameMapSelectionScreen from '../screens/student/soloPlay/GameMapScreenSelection';
import GameQuestionScreen from '../screens/student/soloPlay/GameQuestionScreen';
import GameMapScreen from '../screens/student/soloPlay/GameMapScreen';
import GameResultScreen from '../screens/student/soloPlay/GameResultScreen';
import ChallengeListScreen from '../screens/student/ChallengeListScreen';
import ChallengeCreationScreen from '../screens/student/ChallengeCreationScreen';
import ChallengeQuestionScreen from '../screens/student/ChallengeQuestionScreen';
import ChallengeResultScreen from '../screens/student/ChallengeResultScreen';
import LeaderBoardScreen from '../screens/student/LeaderBoardScreen';

import TeacherHomeScreen from '../screens/teacher/TeacherHomeScreen';
import TeacherProfileScreen from '../screens/teacher/TeacherProfileScreen';
import SocialMediaScreen from '../screens/teacher/SocialMediaScreen';
import ReportScreen from '../screens/teacher/ReportScreen';
import StudentMainScreen from '../screens/student/StudentMainScreen';

const StudentNavigator = createStackNavigator({
	StudentMain: StudentMainScreen,
	StudentProfile: StudentProfileScreen,
	GameMap: GameMapScreen,
	GameMapSelection: GameMapSelectionScreen,
	GameQuestion: GameQuestionScreen,
	GameResult: GameResultScreen,
	ChallengeList: ChallengeListScreen,
	ChallengeCreation: ChallengeCreationScreen,
	ChallengeQuestion: ChallengeQuestionScreen,
	ChallengeResult: ChallengeResultScreen,
	LeaderBoard: LeaderBoardScreen,
},{
	initialRouteName: 'StudentMain',
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const TeacherNavigator = createStackNavigator({
	TeacherHome: TeacherHomeScreen,
	TeacherProfile: TeacherProfileScreen,
	SocialMediaScreen: SocialMediaScreen,
	Report: ReportScreen
},{
	initialRouteName: 'TeacherHome',
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },{
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Student: StudentNavigator,
	Teacher: TeacherNavigator
});


export default createAppContainer(MainNavigator);