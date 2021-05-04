import React from 'react'
import  {Text,View,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions  from 'expo-permissions'
export default class TransactionSreen extends React.Component{
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedBookId:'',
      scannedStudentId:'',
      buttonState:'normal',

    }
  }
  getCameraPermission = async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      hasCameraPermissions:status==='granted',
      scanned:false,
      buttonState:id

    })

   
  }
  handleBarcodeScanned=async({type,data})=>{
    const {buttonState} = this.state

    if(buttonState==='BookId'){
      this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:'normal'
      })
    }
    else if(buttonState==='StudentId'){
      this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:'normal'
      })
    }
  }
    render(){
      const hasCameraPermissions= this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState

      if(buttonState !== 'normal'&&hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if(buttonState==='normal'){
    return(
      <View style = {styles.container}>
        <View>
          {/* <Image 
          source={require('../assets/booklogo.jpg')}
          style={{width:200,height:200}}/> */}
          <Text style={{textAlign:'center',fontSize:30}}> WILY APP </Text>
          </View>
       <View style = {styles.inputView}>
         <TextInput
         style = {styles.inputBox} 
         placeholder = "Book ID" 
         value={this.state.scannedBookId}/>
         <TouchableOpacity style = {styles.scanbutton}
         onPress={()=>{
           this.getCameraPermission("BookId")
         }}>
     
        <Text style = {styles.buttonText}>SCAN</Text>
      </TouchableOpacity>
       </View>
       <View style = {styles.inputView}>
         <TextInput 
         style={styles.inputBox}
         placeholder = "Student ID" 
         value={this.state.scannedStudentId}/>
         <TouchableOpacity style = {styles.scanbutton}
          onPress={()=>{
            this.getCameraPermission("StudentId")
          }}>
     
     <Text style={styles.buttonText}>SCAN</Text>
   </TouchableOpacity>
       </View>
      </View>
    )
    }
}}

const styles = StyleSheet.create({
  container:{
    flex:1,justifyContent:'center',alignItems:'center'
  },
  displaytext:{
    fontSize:20,
    textDecorationLine:'underline'
  },
  scanbutton:{
    backgroundColor:'red',
    margin:10,
   width:50
  },
  inputView:{
flexDirection:'row',
margin:15
  },
  inputBox:{
    width:200,
    height:50,
    borderWidth:2,
    fontSize:20
  },
  buttonText:{
    fontSize:15,
    textAlign:'center',
    marginTop:5
  }
})