import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { Card, Button, ListItem } from 'react-native-elements';

import Navbar from '../../components/Navbar';

import Moment from 'moment';
import 'moment/locale/pt-br';

export default function Details({ navigation }) {

    const DEFAULT_STORAGE = 'register-regime';
    const [listWeight, setListWeight] = useState([]);

    useEffect(() => {

        async function getListItemsRegime() {
            let result;

            try {
                result = await AsyncStorage.getItem(DEFAULT_STORAGE);
                if (result !== null) {
                    setListWeight(JSON.parse(result))
                }
            } catch (error) {
                console.log("Error to get storage " + error)
            }

        }

        const unsubscribe = navigation.addListener('focus', () => {
            getListItemsRegime();
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <View style={styles.card}>
            <SafeAreaView>
                <ScrollView>
                    <Navbar />

                    <Card title="Detalhes do seu regime">
                        <View>
                            {
                                listWeight.map((item, i) => {
                                    return <ListItem
                                        key={i}
                                        title={`Data: ${Moment(item.date).format('DD/MM/YYYY')}`}
                                        subtitle={`Peso: ${item.weight} kgs`}
                                        bottomDivider
                                    />
                                })
                            }

                            <Button
                                title="Registrar novo"
                                onPress={() => navigation.navigate('Registrar')}
                            />
                        </View>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
});

