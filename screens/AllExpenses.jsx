import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses=({navigation})=>{

    const expensesCtx=useContext(ExpensesContext);

    navigation.setOptions({
        tabBarIcon: ({color,size})=> <Icon name="calendar" color={color} size={size} />
    })


    return(<ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total"/>)
}

export default AllExpenses;