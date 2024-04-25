import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = 'your key'; // Substitua 'your key' pela sua chave da API OpenAI

export function Serie() {
  const [load, defLoad] = useState(false);
  const [sérieFavorita, setsérieFavorita] = useState("");
  const [preferida, setpreferida] = useState("");
  const [clima, setClima] = useState("");
  const [recomendacao, setRecomendacao] = useState("");

  async function obterRecomendacao() {
    defLoad(true);
    Keyboard.dismiss();

    // Exemplo de prompt para a API
    const prompt = `Sugira uma série da netflix para mim, considerando que minha série favorita é ${sérieFavorita}, minha série preferida é ${preferida} e o clima é ${clima}.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setRecomendacao(data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        defLoad(false);
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#f1f1f1" />
      <Text style={styles.header}>Recomendação de série</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Informe suas preferências:</Text>
        <TextInput
          placeholder="Série favorita (ex: La casa de papel, Suits, Euphoria)"
          style={styles.input}
          value={atividadeFavorita}
          onChangeText={text => setsérieFavorita(text)}
        />
        <TextInput
          placeholder="Preferida (ex: Stranger things, Dexter, Vikings)"
          style={styles.input}
          value={local}
          onChangeText={text => setpreferida(text)}
        />
        <TextInput
          placeholder="Clima (ex: ensolarado, chuvoso)"
          style={styles.input}
          value={clima}
          onChangeText={text => setClima(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={obterRecomendacao}>
        <Text style={styles.buttonText}>Obter Recomendação</Text>
        <MaterialIcons name="search" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}>
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Analisando suas preferências...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {recomendacao && (
          <View style={styles.content}>
            <Text style={styles.title}>Sua recomendação de série:</Text>
            <Text style={{ lineHeight: 24 }}>{recomendacao}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54,
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  },
});
