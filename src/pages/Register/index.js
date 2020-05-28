import React, { useState, useEffect } from 'react';

import { View, AsyncStorage, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { Message } from './style';

import Navbar from '../../components/Navbar';

import Moment from 'moment';
import 'moment/locale/pt-br';

export default function Register({ navigation }) {

    const DEFAULT_STORAGE = 'register-regime';

    const [listStorage, setlistStorage] = useState('0');
    const [weight, setWeight] = useState('0');
    const [error, setError] = useState(false);
    const [date, setDate] = useState(new Date());


    LocaleConfig.locales['pt-BR'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set.', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: 'Hoje'
    }
    LocaleConfig.defaultLocale = 'pt-BR';

    useEffect(() => {
        async function getListStorage() {
            let result;

            try {
                result = await AsyncStorage.getItem(DEFAULT_STORAGE);
                setlistStorage(result)
            } catch (error) {
                console.log("Error to get storage " + error)
            }
        }

        getListStorage();
    }, []);

    submit = async () => {
        if (!weight || Number(weight) === 0) {
            setError(true);
            return false;
        }

        try {

            if (listStorage !== null) {
                let storageToPush = JSON.parse(listStorage);
                storageToPush.push({ 'idRegister': new Date().getTime(), 'weight': weight, date: date });
                await AsyncStorage.setItem(DEFAULT_STORAGE, JSON.stringify(storageToPush));
            } else {
                await AsyncStorage.setItem(DEFAULT_STORAGE, JSON.stringify([{ 'idRegister': new Date().getTime(), 'weight': weight, date: date }]));
            }

            setWeight('0');

        } catch (e) {
            console.log("Error to register weight " + e)
        }

        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <Navbar />

                    <Card title="Novo registro no regime">
                        <View>

                            {error && <Message>Preencha os campos</Message>}

                            <Input
                                label="Cadastrar novo peso"
                                placeholder="Digite aqui seu novo peso"
                                value={weight}
                                onChange={() => setError(false)}
                                onChangeText={weight => setWeight(weight)}
                            />

                            <Input
                                label="Data"
                                placeholder="Digite aqui seu novo peso"
                                value={Moment(date).format('DD/MM/YYYY')}
                            />

                            <Calendar
                                // Initially visible month. Default = Date()
                                current={Date()}
                                minDate={'2020-01-01'}
                                maxDate={'2050-12-31'}
                                onDayPress={date => { setDate(date.dateString) }}
                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                monthFormat={'MMM'}
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                hideArrows={false}
                                hideExtraDays={true}
                                disableMonthChange={true}
                                firstDay={1}
                                hideDayNames={false}
                                showWeekNumbers={false}
                                onPressArrowLeft={substractMonth => substractMonth()}
                                onPressArrowRight={addMonth => addMonth()}
                                disableArrowLeft={false}
                                disableArrowRight={false}
                                markingType={'marked'}
                                markedDates={{
                                    date: {
                                        customStyles: {
                                            container: {
                                                backgroundColor: '#007bff',
                                                elevation: 2
                                            },
                                            text: {
                                                color: '#fff'
                                            }
                                        }
                                    }
                                }}
                            />

                            <Button
                                title="Cadastrar"
                                onPress={submit}
                            />
                        </View>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    }
});


