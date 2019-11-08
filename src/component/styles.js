import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    input:{
        height: 40,
        borderWidth: 1,
        borderColor: '#3d3d3d',
        padding: 10,
        margin: 10,
        borderRadius:10,
        width: 350
    },
    text:{
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    todoItem: {
        padding: 10,
        height: 100,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width:50,
        height: 40,
        position: 'absolute',
        backgroundColor: '#3d3d3d',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 370,
        marginTop: 10
    },
    formAdd:{
        justifyContent: 'space-between',
    },
    titleItem:{
        marginLeft: 15,
        fontSize: 20,
        width: 300
    }
})