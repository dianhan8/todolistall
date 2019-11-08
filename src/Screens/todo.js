import React from 'react'
import {
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    Button
} from 'react-native'
import * as actionTodo from './../redux/actions/actionsTodo'
import { connect } from 'react-redux'
import { styles } from './../component/styles'
import {CheckBox} from 'native-base'

class Todo extends React.Component {
    constructor(){
        super()
        this.state = {
            title : '',
            category: ''
        }
    }
    componentDidMount() {
        this.props.handleGetTodos()
    }
    handleAdd = async() => {
        const todo = this.props.todo.todo
        const { title } = this.state
        const { category } = this.state
        this.props.handleAddTodo({
            title,
            isDone: false,
            category
        })
        //For Get back data to database
        await this.props.handleGetTodos()
    }
    handleEdit = async(id) => {
        const { title, category } = this.state
        this.props.handleEditTodo({
            id,
            title,
            category
        })
        // const filter = this.props.todo.todo.map(function(item, index){

        // })
        // this.setState({
        //     title: 
        // })
        //For Get back data to database
        await this.props.handleGetTodos()
    }
    handleDelete = async(id) => {
        this.props.handleDeleteTodo({
            id
        })
        //For Get back data to database
        await this.props.handleGetTodos()
    }
    handleChecked = async(id) => {
        const {todo} = this.props.todo
        const todos = todo.map(function(item, index){
            const items = id == item.id
            return items 
        })
        const checkedDone = todos[0].complete
        if(checkedDone == true){
            this.props.handleChecked({
                done: false
            })
        }else{
            this.props.handleChecked({
                done:true
            })
        }
        //For Get back data to database
        await this.props.handleGetTodos()
    }
    render() {
        return (
            <View>
                <View style={styles.formAdd}>
                    <TextInput style={styles.input}
                        placeholder='Input your text'
                        onChangeText={(title)=>this.setState({title})}
                    />
                    <TextInput style={styles.input}
                        placeholder='Category'
                        onChangeText={(category)=>this.setState({category})}
                    />
                    <TouchableOpacity style={styles.buttonAdd}
                        onPress={()=> this.handleAdd()}
                    >
                        <Text style={{ color: '#fff' }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Todo</Text>
                <FlatList
                    data={this.props.todo.todo}
                    renderItem={({ item, index }) => (
                        <View
                            style={styles.todoItem}
                        >
                            <CheckBox checked={item.isDone}
                            onPress={()=> this.handleChecked(item.id)}
                            />
                            <View>
                                <Text style={styles.titleItem}>{item.title}</Text>
                                <Text style={styles.categoryItem}>Category : {this.category}</Text>
                            </View>
                            <View>
                                <Button title='Delete' onPress={()=> this.handleDelete(item.id)}/>
                                <Button title='Edit' onPress={()=> this.handleEdit(item.id)}/>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        todo: state.todo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetTodos: () => dispatch(actionTodo.handleGetTodo()),
        handleAddTodo: (params) => dispatch(actionTodo.handleAddTodo(params)),
        handleEditTodo: (params) => dispatch(actionTodo.handleEditTodo(params)),
        handleDeleteTodo: (params) => dispatch(actionTodo.handleDeleteTodo(params)),
        handleChecked: (params) => dispatch(actionTodo.handleChecked(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo)