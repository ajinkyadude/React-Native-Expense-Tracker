import { Text, View } from "react-native";
import Styles from "./ExpensesSummaryStyle";

const ExpensesSummary=(props)=>{

    const expensesSum=props.expenses.reduce((sum,expense)=>{
        return sum + expense.amount
    },0);
    return(
        <View style={Styles.container}>
        <Text style={Styles.period}>{props.periodName}</Text>
        <Text style={Styles.sum}>
            ${expensesSum.toFixed(2)}
        </Text>
    </View>
    )
}

export default ExpensesSummary;