import { Text, TextInput, View } from "react-native";
import Styles from "./InputStyle";

const Input=({label,style,invalid, textInputConfig})=>{

    const inputStyle=[Styles.input];

    if(textInputConfig && textInputConfig.multiline)
    {
        inputStyle.push(Styles.inputMultiline)
    }

    if(invalid)
    {
        inputStyle.push(Styles.invalidInput)
    }

    return(
        <View style={[Styles.inputContainer,style]}>
            <Text style={[Styles.label,invalid && Styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig} />
        </View>
    )
}

export default Input;