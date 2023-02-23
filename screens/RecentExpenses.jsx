import { useContext } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../Util/getFormatedDate";

const RecentExpenses=({navigation})=>{

    const expensesCtx =useContext(ExpensesContext);

    const recentExpenses=expensesCtx.expenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })

    navigation.setOptions({
        tabBarIcon: ({color,size})=> <Icon name="hourglass" color={color} size={size} />
    })

    return(
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
    )
}

export default RecentExpenses;