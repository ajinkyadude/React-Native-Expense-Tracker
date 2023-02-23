import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constant/Style";

const ExpenseForm = ({onCancle, onSubmit, submitButtonLabel, defaultValue}) => {
    const [inputValues,setInputValues]=useState({
        amount: {value: defaultValue ? defaultValue.amount.toString() : '',
                isValid: true},
        date: {value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '',
                isValid: true},
        description: {value: defaultValue ? defaultValue.description : '',
                    isValid: true}
    });


    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues)=>{
            return{
                ...curInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }
    function submitHandler(){
        const expenseData={
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid)
        {
            //Alert.alert('Invalid input','Please check your input values')
            setInputValues((curInputs)=>{
                return{
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }


        onSubmit(expenseData);
    }

    const formIsValid = !inputValues.amount.isValid || 
                        !inputValues.date.isValid ||
                        !inputValues.description;



    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input invalid={!inputValues.amount.isValid} style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this,'amount'),
                    value: inputValues.amount.value,
                }} />
                
                <Input invalid={!inputValues.date.isValid} style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLegth: 10,
                    onChangeText: inputChangeHandler.bind(this,'date'),
                    value: inputValues.date.value,
                }} />
            </View>
            <Input invalid={!inputValues.description.isValid} label="Description" textInputConfig={{
                multiline: true,
                //autoCapitalize: none
                //autocorrect: false, //default is true
                onChangeText: inputChangeHandler.bind(this,'description'),
                value: inputValues.description.value,
            }} />
            {formIsValid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancle}>Cancle</Button>
                <Button style={styles.button} onPress={submitHandler}>
                {/* {isEdition ? 'Update' : 'Add'} */}
                {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    form:{
        marginTop: 80
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        marginVertical: 24,
        textAlign :"center"
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex: 1
    },
    buttons:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})

export default ExpenseForm;