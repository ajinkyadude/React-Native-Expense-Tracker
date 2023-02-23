import { FlatList, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import Styles from "./ExpensesOutputStyle";


function ExpensesOutput({expenses, expensesPeriod}){
    return (
        <View style={Styles.container}>
           <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            <ExpensesList expenses={expenses} />
        </View>
    )
}

export default ExpensesOutput;