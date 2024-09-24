import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default function App() {
  const [milissegundos, setMilissegundos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [Intervalo, setIntervalo] = useState(null);

  function Iniciar() {
    if (!Intervalo) {
      const Current = setInterval(() => {
      setMilissegundos((prevMilissegundos) => {
        let newMilissegundos = prevMilissegundos + 1;
        if (newMilissegundos === 100) {
        newMilissegundos = 0;
        setSegundos((prevSegundos) => {
          let newSegundos = prevSegundos + 1;
          if (newSegundos === 60) {
          newSegundos = 0;
          setMinutos((prevMinutos) => prevMinutos + 1);
          }
          return newSegundos;
        });
        }
        return newMilissegundos;
      });
      }, 10); // incrementa a cada 10ms
      setIntervalo(Current);
    }
  }

  function Parar() {
    if (Intervalo) {
      clearInterval(Intervalo);
      setIntervalo(null);
    }
  }

  function Zerar() {
    Parar();
    setMilissegundos(0);
    setSegundos(0);
    setMinutos(0);
  }

  const formatarTempo = () => {
    return `${minutos}:${segundos}:${milissegundos}`;
  };

  return (
    <View>
      <View style={{ alignContent: "center", justifyContent: "center", margin: "auto", marginTop: 160 }}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 35 }}>Cronômetro</Text>
      </View>
      <View style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 150 }}>
        <Image source={require('./assets/circle.png')} style={{marginT:"auto", top: 70, width:350, height:350}} />
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 45, margin:"auto", bottom: 130}}>
          {formatarTempo()}
        </Text>
      </View>
      
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 230 }}>
        <TouchableOpacity
          style={styles.left_button} 
          onPress={Iniciar}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "blue",paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 10,}}
          onPress={Parar}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.right_button}
          onPress={Zerar}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Zerar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  left_button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    right: 10


  },
  right_button: {
    backgroundColor: "blue",     
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    left: 10
  },
});
