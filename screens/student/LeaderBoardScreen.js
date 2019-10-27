import React, { useState,useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	ImageBackground
} from 'react-native';
import { useSelector } from 'react-redux';

import Card from '../../components/UI/Card';

const LeaderBoardScreen = props => {
	const [userList, setUserList] = useState([]); 
	const [err, setErr] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [ranking, setRanking] = useState();
	const [score, setScore] = useState();
	const userInfo = useSelector(state=>state.user);

	//load all users
	useEffect(()=>{
  		getAllUsers = async () => {
  			const response = await fetch(
  			  `https://ssad2019-1cc69.firebaseio.com/users.json?`
  			);
  			if (!response.ok) {
  			    throw new Error('Something went wrong when get user list!');
  			}
  			const resData = await response.json();
  			console.log(resData);
  			let allUsers=[];
  			for (const key in resData){
  				if(resData[key].userType==='student'){
  					allUsers.push({
  						'userId':key,
  						'userEmail':resData[key].userEmail,
  						'userName':resData[key].userName,
  						'userTotalScore':resData[key].totalScore
  					});
  				}
  			}
  			allUsers.sort((a, b)=>{
  			    if (a.userTotalScore > b.userTotalScore) {
  			        return -1;
  			    }
  			    if (a.userTotalScore < b.userTotalScore) {
  			        return 1;
  			    }
  			    return 0;
			  });
  			console.log(allUsers);
			  setUserList(allUsers);
			
			//get user ranking and score
			for(let i=0;i<allUsers.length;i++){
				if(allUsers[i].userId===userInfo.userId){
					setRanking(i);
					setScore(allUsers[i].userTotalScore);
					break;
				}
			}
  		};
  		try{
  			setIsLoading(true);
  			getAllUsers();
  			setIsLoading(false);
  		}catch(err){
  			setErr(err);
  		}
  	},[]);


	return(
		<SafeAreaView>
			<ImageBackground source={require('../../assets/images/backgrounds/leaderboard.jpeg')} style={styles.mainContainer}>
				<View style={{ flex: 0.5}}></View>
				<View style={{flex: 2, width: '100%', alignItems: 'center'}}>
                    <ImageBackground source={require('../../assets/images/icons/window.png')} style={styles.window}>  
                        <View>
                            <Text style = {styles.username}>
                                LEADERBOARD
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
				<View style={{ flex: 1}}>
					<View style={{flexDirection: 'row',marginBottom: 20, marginTop: 20}}>
						<View  style={{ flex: 1,  alignItems: 'center' }}>
							<Text style={{ fontSize: 20, color: '#DAA520',fontFamily: 'trajan-pro'}}>
								Your Rank
							</Text>
							<Text style={{fontSize: 15, color: '#DAA520',fontFamily: 'trajan-pro-bold'}}>
								{ranking+1}
							</Text>
						</View>
						<View  style={{ flex: 1,  alignItems: 'center'}}>
							<Text style={{ fontSize: 20 , color: '#DAA520',fontFamily: 'trajan-pro' }}>
								Your Score
							</Text>
							<Text style={{fontSize: 15, color: '#DAA520',fontFamily: 'trajan-pro-bold'}}>
								{score}
							</Text>
						</View>
					</View> 
				</View>
				<View style={{ flex: 0.5}}></View>
				<View style={{ flex: 6 }}>
					<FlatList
						data={userList}
						keyExtractor={item=>item.userId}
						renderItem={({item,index})=>{
							return(
								<View style={{
									backgroundColor: '#00000088',borderColor: '#DAA520', borderWidth:0.5, flexDirection:'row',paddingBottom: 10, paddingTop: 10}}>
									<Text style={{ color: '#DAA520', fontSize: 20, flex: 1, marginLeft: 10 ,fontFamily: 'trajan-pro-bold'}}>{index+1}</Text>
									<Text style={{ color: '#DAA520', fontSize: 17, flex: 4, marginLeft: 0,fontFamily: 'trajan-pro-bold' }}>{item.userName}{"\n"}
										<Text style={{ color: '#DAA520', fontSize: 12,marginLeft: 0 }}>{item.userEmail}</Text>
									</Text>
									<Text style={{ color: '#DAA520', fontSize: 17, flex: 1.5, textAlign: 'right', fontWeight: 'bold', marginRight: 10,fontFamily: 'trajan-pro-bold' }}>{item.userTotalScore}</Text>
								</View>
							);
						}}
					/>
				</View>
			</ImageBackground>
		</SafeAreaView>	
	);
};

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
    },
    infoContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center'
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
	empty:{
        flex: 0.5
    },
});

export default LeaderBoardScreen;