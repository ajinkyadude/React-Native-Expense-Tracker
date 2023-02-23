import { Pressable, Text, View } from "react-native";
import { getFormatedDate } from "../../Util/getFormatedDate";
import Styles from "./ExpenseItemStyle";
import {useNavigation} from '@react-navigation/native'

const ExpenseItem = ({description, amount, date, id}) => {

    const navigation=useNavigation();

    function expensePressHandler(){
        navigation.navigate('ManageExpense',{
            expenseId: id 
        })
    }
    //console.log("********Expense Item****"+description, amount, date,"id", id)

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && Styles.pressed} >
            <View style={Styles.exprenseItem}>
                <View>
                    <Text style={[Styles.textbase,Styles.description]}>{description}</Text>
                    <Text style={Styles.textbase}>{getFormatedDate(date)}</Text>
                </View>
                <View style={Styles.amountContainer}> 
                <Text style={Styles.amount}>{amount && amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;