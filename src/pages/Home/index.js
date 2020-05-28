import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';

import { Card, Button, ListItem } from 'react-native-elements';

import Navbar from '../../components/Navbar';

import Moment from 'moment';
import 'moment/locale/pt-br';

export default function Home({ navigation }) {

    const DEFAULT_STORAGE = 'register-regime';
    const [listWeight, setListWeight] = useState([]);
    const [lostWeight, setLostWeight] = useState(0);

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

    useEffect(() => {
        const weightInitial = Number(listWeight[0] ? listWeight[0].weight : 0);
        const weightFinal = Number(listWeight[listWeight.length - 1] ? listWeight[listWeight.length - 1].weight : 0);
        setLostWeight((weightInitial - weightFinal).toFixed(2));
    });

    return (
        <View>

            <Navbar />

            {listWeight.length === 0 &&
                <Card title="Você ainda não fez regime">
                    <View>
                        <Button
                            title="Começar um novo regime :)"
                            onPress={() => navigation.navigate('Registrar')}
                        />
                    </View>
                </Card>
            }

            {listWeight.length > 0 &&
                <Card title="Status do seu regime">
                    <View>
                        <ListItem
                            title={'Início do regime:'}
                            subtitle={Moment(listWeight[0].date).format('DD/MM/YYYY')}
                            bottomDivider />

                        <ListItem
                            title={'Peso inicial:'}
                            subtitle={`${listWeight[0].weight} kgs`}
                            bottomDivider />

                        <ListItem
                            title={'Peso atual:'}
                            subtitle={`${listWeight[listWeight.length - 1].weight} kgs`}
                            bottomDivider />

                        <ListItem
                            title={'Status:'}
                            subtitle={lostWeight > 0 ? `Você perdeu ${lostWeight} kgs.` : 'Você não perdeu peso =('}
                            bottomDivider />

                        <Button
                            title="Ver detalhes"
                            onPress={() => navigation.navigate('Detalhes')}
                        />
                    </View>
                </Card>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    marginBottom15: {
        marginBottom: 15
    },
});

