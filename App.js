import React, { Component } from 'react';

import { Image,
   StyleSheet,
   TextInput,
   View,
   Alert,
   Button,
   TouchableHighlight,
   Text,
   ScrollView } from 'react-native';
import doddle from './assets/doddle.jpg';
import merc1 from './assets/merc1.jpg';
import merc2 from './assets/merc2.jpg';
import merc3 from './assets/merc3.jpg';
import thumb from './assets/thumbsup.gif';
// Importing Stack Navigator library to add multiple activities.
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// Creating Login Activity.

//-------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
class LoginActivity extends Component {

  // Setting up Login Activity title.
  static navigationOptions =
    {
      title: 'Costos de Producción MIGA',
    };
  //-------------------------------------------- 
  constructor(props) {

    super(props)

    this.state = {

      UserEmail: '',
      UserPassword: ''

    }

  }
  //-------------------------------------
  UserLoginFunction = () => {

    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    //-----------------------------------------------
    fetch('http://18.221.139.38/proy_achu/User_Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: UserEmail,

        password: UserPassword

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        var dat=responseJson;
        //var text= JSON.stringify(responseJson)
        //var obj = JSON.parse(text); 
        // If server response message same as Data Matched
        //if (responseJson.msg === 'Data Matched') {
        if (responseJson.msg === 'Bienvenido') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('PreciosMerc', { Datos: dat });
          //console.log(responseJson+ typeof responseJson);

        }
        else {
          //console.log('del else'+ JSON.stringify(responseJson)+ typeof responseJson);
          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });


  }
  //-------------------------------------------------------------------------------
  render() {
    return (

      <View style={styles.MainContainer}>
        <Image source={doddle} style={styles.image} />
        <Text style={styles.TextComponentStyle}>Inserte sus datos</Text>

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Nombre del producto: durazno"

          onChangeText={UserEmail => this.setState({ UserEmail })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Nombre de comunidad: Achumani"

          onChangeText={UserPassword => this.setState({ UserPassword })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}

          //secureTextEntry={true}
        />

        <Button title="Entrar" onPress={this.UserLoginFunction} color="#2196F3" />



      </View>

    );
  }
}
/////////////////////////////////////////////////////////////////////////////////////
// Creating Profile activity.
class ProfileActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'ProfileActivity',

    };



  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.MainContainer}>

        <Text style={styles.TextComponentStyle}> {this.props.navigation.state.params.Email} </Text>

        <Button title="Click here to Logout" onPress={() => goBack(null)} />

      </View>
    );
  }
}
/////////////////////////////////VENTANA RESULTADOS////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Creating Profile activity.
class resultadoscalc extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'Resultados',

    };



  render() {
    var aux1=35;
    var aux2=85;
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.MainContainer}>
        
        <Text style={styles.TextComponentStyle}> Pudimos calcular que una caja de duraznos (100Kg) te costaría: </Text>
        <Text style={styles.TextComponentStyle}> {aux1} Bs </Text>
        <Text style={styles.TextComponentStyle}> Además tuviste un rendimiento del {aux2} %</Text>
        
        <Text style={styles.TextComponentStyle}> Parece que te fue muy bien en la producción de duraznos este año... Felicidades!!!!!</Text>
        <Image source={thumb} style={styles.imagepeq} />
        <Button title="Página de inicio" onPress={() => this.props.navigation.navigate('Home')} />
        

      </View>
    );
  }
}
/////////////////////////////////VENTANA PRECIOS////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Creating Profile activity.
class VentanaPrecios extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'Precios de mercados',

    };



  render() {

    const { goBack } = this.props.navigation;
    var aux1= this.props.navigation.state.params.Datos;
    var precio1= this.props.navigation.state.params.Datos.precio1;
    var precio2= this.props.navigation.state.params.Datos.precio2;
    var precio3= this.props.navigation.state.params.Datos.precio3;
    //var precio1= '44';
    //var precio2= '55';
    //var precio3= '60';

    return (
      <View style={styles.MainContainer1}>
        <Text style={styles.titulo}>Duraznos</Text>
        <Text style={styles.titulo}>Tipo: Mediano (Nacional)</Text>
        <Text style={styles.titulo}>Unidad: 100 Unidades</Text>
        <Text style={styles.titulo}> </Text>
        <View style={styles.contenedor}>
              <Image source={merc1} style={styles.imagepeq} />
              <View style={{paddingLeft: 15,}}>
                <Text style={styles.titulo}> </Text>
                <Text style={styles.subtitulomerc}>Mercado Campesino</Text>
                <Text style={styles.TextComponentStyle}> {precio1} Bs </Text>
              </View>
        </View>
        <Text style={styles.subtitulo}> </Text>
        <View style={styles.contenedor}>
              <Image source={merc2} style={styles.imagepeq} />
              <View style={{paddingLeft: 15,}}>
                <Text style={styles.titulo}> </Text>
                <Text style={styles.subtitulomerc}>Mercado Villa Dolores</Text>
                <Text style={styles.TextComponentStyle}> {precio2} Bs </Text>
              </View>
        </View>
        <Text style={styles.subtitulo}> </Text>
        <View style={styles.contenedor}>
              <Image source={merc3} style={styles.imagepeq} />
              <View style={{paddingLeft: 15,}}>
                <Text style={styles.titulo}> </Text>
                <Text style={styles.subtitulomerc}>Mercado Rodriguez</Text>
                <Text style={styles.TextComponentStyle}> {precio3} Bs </Text>
              </View>
        </View>
        <Text style={styles.subtitulo}> </Text>
        
        
        
        <View style={styles.fixToText}>


            <Button
              title="Página de inicio"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="Abrir la calculadora"
              onPress={() => this.props.navigation.navigate('Formulario', { Datos: aux1 })}
              
            />
        </View>


      </View>
    );
  }
}

/////////////////////////////////VENTANA FORMULARIO////////////////////////////////////////////////////////////
class FormularioActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'Costos de Producción',

    };

  constructor() {
    super()
    
    this.state = {
      
      valor1: '',
      valor2: '',
      valor3: '',
      valor4: '',
      valor5: '',
      valor6: '',
      valor7: '',
    }
  }
  changefield1(valor1) {
    this.setState({ valor1 })
  }
  changefield2(valor2) {
    this.setState({ valor2 })
  }
  changefield3(valor3) {
    this.setState({ valor3 })
  }
  changefield4(valor4) {
    this.setState({ valor4 })
  }
  changefield5(valor5) {
    this.setState({ valor5 })
  }
  changefield6(valor6) {
    this.setState({ valor6 })
  }
  changefield7(valor7) {
    this.setState({ valor7 })
  }
//----------------------CONECCION DB-------------------------
  //-------------------------------------
  EnvioFORM = () => {
    
    const { valor1 } = this.state;
    const { valor2 } = this.state;
    const { valor3 } = this.state;
    const { valor4 } = this.state;
    const { valor5 } = this.state;
    const { valor6 } = this.state;
    const { valor7 } = this.state;
    var aux1= this.props.navigation.state.params.Datos.id;
    

    //-----------------------------------------------
    fetch('http://18.221.139.38/proy_achu/recive_data.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        P0: aux1,
        P1: valor1,
        P2: valor2,
        P3: valor3,
        P4: valor4,
        P5: valor5,
        P6: valor6,
        P7: valor7,

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        //var text= JSON.stringify(responseJson)
        //var obj = JSON.parse(text); 
        // If server response message same as Data Matched
        if (responseJson === 'Datos Guardados') {
          //console.log(responseJson);
          Alert.alert('Tus datos han sido guardados');
          //this.props.navigation.navigate('PreciosMerc', { Datos: dat });
          this.props.navigation.navigate('resultados');
          //Then open Profile activity and send user email to profile activity.
          //this.props.navigation.navigate('Formulario', { Email: UserEmail });
          //console.log(responseJson+ typeof responseJson);

        }
        else {
          //console.log(responseJson);
          Alert.alert('No se pudo calcular');
        }

      }).catch((error) => {
        console.error(error);
      });


  }




//----------------------TERMINA LA FUNCION CONECCION DB-------------------------






  render() {
    var aux1= this.props.navigation.state.params.Datos.id;
    const { goBack } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titulo}>Duraznos Sapahaqui </Text>
         
          <Text style={styles.subtitulo}>¿Cuanto gastaste en la herramienta que usaste para sembrar?</Text>
          <TextInput

            placeholder="Inserte el valor en Bs, por ejemplo: 100"
            value={this.state.valor1}
            onChangeText={(valor1) => this.changefield1(valor1)}
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />
          <Text style={styles.subtitulo}>¿Cuanto te costaron los insumos que usaste para el sembrado (Como los fertilizantes)?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Inserte el valor en Bs, por ejemplo: 100"
            value={this.state.valor2}
            onChangeText={(valor2) => this.changefield2(valor2)}
          />
          <Text style={styles.subtitulo}>¿Cuanto gastaste en la cosecha?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Inserte el valor en Bs, por ejemplo: 100"
            value={this.state.valor3}
            onChangeText={(valor3) => this.changefield3(valor3)}
          />
          <Text style={styles.subtitulo}>¿Cuanto gastaste en el transporte?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Inserte el valor en Bs, por ejemplo: 100"
            value={this.state.valor4}
            onChangeText={(valor4) => this.changefield4(valor4)}
          />
          <Text style={styles.subtitulo}>Si tuviste algun gasto extra, ¿cuanto fue?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Inserte el valor en Bs, por ejemplo: 100"
            value={this.state.valor5}
            onChangeText={(valor5) => this.changefield5(valor5)}
          />
          <Text style={styles.subtitulo}>¿Cuantas cajas produciste?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Por ejemplo 5"
            value={this.state.valor6}
            onChangeText={(valor6) => this.changefield6(valor6)}
          />
          <Text style={styles.subtitulo}>¿Con cuantas hectareas cuentas?</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Por ejemplo 2"
            value={this.state.valor7}
            onChangeText={(valor7) => this.changefield7(valor7)}
          />


          <View style={styles.fixToText}>


            <Button
              title="Página de inicio"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="    Calcular    "
              onPress={this.EnvioFORM}
            />
          </View>

          





        </View>
      </ScrollView>
    );

  }
}


/////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////////////////////////////////////////////////////////////////
const RootStack = createStackNavigator(
  {
    Home: LoginActivity,
    Second: ProfileActivity,
    Formulario: FormularioActivity,
    PreciosMerc: VentanaPrecios,
    resultados: resultadoscalc
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(RootStack);

/////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    //alignItems: 'center'

  },
  MainContainer1: {

   // justifyContent: 'center',
    flex: 1,
    margin: 10,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    //alignItems: 'center'

  },

  contenedor:{
    flexDirection: 'row',


  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    //Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    //borderRadius: 5 ,

  },

  image: {
    width: 305,
    height: 250

  },
  imagepeq: {
    width: 100,
    height: 100,
    alignSelf: 'center',

  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
  },
  subtitulo: {
    textAlign: 'left',
    fontSize: 13,
  },
  subtitulomerc: {
    textAlign: 'left',
    fontSize: 20,
  },
  boton: {
    backgroundColor: "#2196F3",
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',

  },
  textboton: {
    fontSize: 15,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 15




  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    marginBottom: 15
  }
});