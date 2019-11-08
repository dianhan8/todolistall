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
        const { name } = this.state
        const { category } = this.state
        this.props.handleAddTodo({
            id: todo.legth + 1,
            name,
            complate: false,
            category
        })
        await this.props.handleGetTodos()
    }
    handleEdit = async(id) => {
        const { title, category } = this.state
        this.props.handleEditTodo({
            id,
            title,
            category
        })
        await this.props.handleGetTodos()
    }
    handleDelete = async(id) => {
        this.props.handleDeleteTodo({
            id
        })
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
        await this.props.handleGetTodos()
    }
    filterData = () => {
        if (this.props.todo.isLoading == false) {
            const { todo } = this.props.todo
            const todos = todo.slice(0, 10)
            return todos
        }
    }
    render() {
        return (
            <View>
                <View style={styles.formAdd}>
                    <TextInput style={styles.input}
                        placeholder='Input your text'
                    />
                    <TouchableOpacity style={styles.buttonAdd}
                        onPress={()=> this.handleAdd()}
                    >
                        <Text style={{ color: '#fff' }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Todo</Text>
                <FlatList
                    data={this.filterData()}
                    renderItem={({ item, index }) => (
                        <View
                            style={styles.todoItem}
                        >
                            <CheckBox checked={item.completed}
                            onPress={()=> this.handleChecked(item.id)}
                            />
                            <View>
                                <Text style={styles.titleItem}>{item.title}</Text>
                                <Text style={styles.categoryItem}>category</Text>
                            </View>
                            <View>
                                <Button title='Delete' onPress={()=> this.handleEdit(item.id)}/>
                                <Button title='Edit' onPress={()=> this.handleDelete(item.id)}/>
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
        handleAddTodo: () => dispatch(actionTodo.handleAddTodo()),
        handleEditTodo: () => dispatch(actionTodo.handleEditTodo()),
        handleDeleteTodo: () => dispatch(actionTodo.handleDeleteTodo()),
        handleChecked: () => dispatch(actionTodo.handleChecked())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo)