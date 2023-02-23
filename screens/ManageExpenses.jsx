import { useContext, useLayoutEffect } from "react";
import ExpenseForm from "../components/Expense Manage/ExpenseForm";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/Style";
import { ExpensesContext } from "../store/expenses-context";
import { View, StyleSheet, Text } from "react-native";

// const { Text, View, StyleSheet } = require("react-native")

const ManageExpense = ({ route, navigation }) => {

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdition = !!editedExpenseId;

    const selectedExpenses=expensesCtx.expenses.find(
        (expense)=> expense.id === editedExpenseId
        )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEdition ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEdition])

    function deleteExpenseHandler(){
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    const cancleHandler=()=>{
        navigation.goBack();
    }
    const confirmHandler=(expenseData)=>{

        if(isEdition){
            expensesCtx.updateExpense(
                editedExpenseId,expenseData
            //     {
            //     description: 'Test!!!!!!',
            //     amount: 19.12,
            //     date: new Date('2023-02-21')
            // }
            );
        }
        else{
            expensesCtx.addExpense(expenseData
                // description: 'Test',
                // amount: 19.99,
                // date: new Date('2022-05-19')
            );
        }

        navigation.goBack();
    }

    return (

        <View style={styles.conatiner}>
            <ExpenseForm 
            onCancle={cancleHandler}
            onSubmit={confirmHandler}
            submitButtonLabel={isEdition ? 'Update' : 'Add'}
            defaultValue={selectedExpenses}
            />

            {isEdition && <View style={styles.deleteContainer}><IconButton icon="trash" color={GlobalStyles.colors.error500} size={24} onPress={deleteExpenseHandler} /></View>}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
  
})