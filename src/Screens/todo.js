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
import { CheckBox } from 'native-base'

class Todo extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            category: '',
            action: false,
            id: '',
            props: ''
        }
    }
    componentDidMount() {
        this.props.handleGetTodos()
        this.setState({
            props: this.props.todo.todo
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            props: nextProps.todo.todo
        })
    }
    handleAdd = async () => {
        const todo = this.props.todo.todo
        const { title } = this.state
        const { category } = this.state
        await this.props.handleAddTodo({
            title,
            isDone: false,
            category
        })
        //For Get back data to database
        await this.props.handleGetTodos()
        this.setState({
            props: this.props.todo.todo
        })
    }
    handleEdit = async (id) => {
        const { title, category } = this.state
        const filter = this.props.todo.todo.filter(function (item, index) {
            const items = id == item.id
            return items
        })
        this.setState({
            title: filter[0].title,
            category: filter[0].category.toString(),
            action: true,
            id
        })
    }
    save = async () => {
        await this.props.handleEditTodo({
            id: this.state.id,
            title: this.state.title,
            category: this.state.category,
        })
        //For Get back data to database
        await this.props.handleGetTodos()
        this.setState({
            props: this.props.todo.todo
        })
    }
    handleDelete = async (id) => {
        await this.props.handleDeleteTodo({
            id
        })
        //For Get back data to database
        await this.props.handleGetTodos()
        this.setState({
            props: this.props.todo.todo
        })
    }
    handleChecked = async (id) => {
        const { todo } = this.props.todo
        const todos = todo.filter(function (item, index) {
            const items = id == item.id
            return items
        })
        const checkedDone = todos[0].isDone
        if (checkedDone == true) {
            this.props.handleChecked({
                id,
                done: false
            })
        } else {
            this.props.handleChecked({
                id,
                done: true
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
                        defaultValue={this.state.title}
                        placeholder='Input your text'
                        onChangeText={(title) => this.setState({ title })}
                    />
                    <TextInput style={styles.input}
                        defaultValue={this.state.category}
                        placeholder='Category'
                        onChangeText={(category) => this.setState({ category })}
                    />
                    {this.state.action == false ?
                        <TouchableOpacity style={styles.buttonAdd}
                            onPress={() => this.handleAdd()}
                        >
                            <Text style={{ color: '#fff' }}>Add</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.buttonAdd}
                            onPress={() => this.save()}
                        >
                            <Text style={{ color: '#fff' }}>Edit</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Text style={styles.text}>Todo</Text>
                <FlatList
                    data={this.state.props}
                    renderItem={({ item, index }) => (
                        <View
                            style={styles.todoItem}
                        >
                            <CheckBox checked={item.isDone}
                                onPress={() => this.handleChecked(item.id)}
                            />
                            <View>
                                <Text style={styles.titleItem}>{item.title}</Text>
                                <Text style={styles.categoryItem}>Category : {item.category}</Text>
                            </View>
                            <Button style={{ height: 40 }} title='Delete' onPress={() => this.handleDelete(item.id)} />
                            <Button style={{ height: 40 }} title='Edit' onPress={() => this.handleEdit(item.id)} />
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