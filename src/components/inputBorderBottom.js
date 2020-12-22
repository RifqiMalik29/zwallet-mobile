import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

const inputBorderBottom = ({padding, ...rest}) => {
    const [inputActive, setInputActive] = useState(false)

    return (
        <TextInput
            ref={rest.inputref}
            {...rest}
            style={inputActive ? [styles.inputActive, padding ? { paddingHorizontal: padding} : {}] : [styles.input, padding ? { paddingHorizontal: padding} : {}]}
            onFocus={() => {setInputActive(true); rest.setActive(true)}}
            onBlur={() => {setInputActive(false); rest.setActive(false)}}
        />
    )
}

export default inputBorderBottom

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(169, 169, 169, 0.6)',
        width: "100%",
        paddingHorizontal: 38,
        marginBottom: 20,
        fontSize: 16
    },
    inputActive: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#6379F4',
        width: "100%",
        paddingHorizontal: 38,
        marginBottom: 20,
        fontSize: 16
    },
})
