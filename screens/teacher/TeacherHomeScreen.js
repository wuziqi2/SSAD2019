import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	SafeAreaView,
	ImageBackground,
	Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TeacherHomeScreen = props => {

	return(
		<SafeAreaView>
			<View style = {styles.mainContainer}>
				<View style={{ flex: 0.5}}></View>
				<View style={{flex: 2, width: '100%', alignItems: 'center'}}>
					<ImageBackground source={require('../../assets/images/icons/window.png')} style={styles.window}>  
						<View style={{alignItems:'center',justifyContent:'center'}}>
							<Text style = {styles.username}>
								WELCOME BACK
							</Text>
							<Text style = {styles.username}>
								PROFESSOR
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={{ flex: 3, alignItems:'center'}}>
					<TouchableOpacity activityOpacity={.5} onPress = { () => {props.navigation.navigate('TeacherProfile');}}>
                        <Image resizeMode = 'contain'
                            style = {{width: 283, height:46}}
                            source={require("../../assets/images/icons/profile.png")}/>
                    </TouchableOpacity>
					<Button 
						title='View Report'
						onPress = { () => {
							props.navigation.navigate('Report');
							}
						}
					/>
				</View>
				<View style={{ flex: 0.5}}></View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer:{
		backgroundColor:'#000',
        width:'100%',
		height:'100%',
		alignItems:'center',
    },
    window:{
        width: 306,
        height: 131,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        width: '100%',
        textTransform: 'uppercase',
        textAlign:'center',
		fontSize: 20,
		color: '#DAA520',
        fontFamily: 'trajan-pro',
	},
});

export default TeacherHomeScreen;