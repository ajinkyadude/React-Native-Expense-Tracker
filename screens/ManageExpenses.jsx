import { useContext, useLayoutEffect } from "react";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/Style";
import { ExpensesContext } from "../store/expenses-context";

const { Text, View, StyleSheet } = require("react-native")

const ManageExpense = ({ route, navigation }) => {

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdition = !!editedExpenseId;

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
    const confirmHandler=()=>{

        if(isEdition){
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                description: 'Test!!!!!!',
                amount: 19.12,
                date: new Date('2023-02-21')
            });
        }
        else{
            expensesCtx.addExpense({
                description: 'Test',
                amount: 19.99,
                date: new Date('2022-05-19')
            });
        }

        navigation.goBack();
    }

    return (

        <View style={styles.conatiner}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancleHandler}>Cancle</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEdition ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    }
})