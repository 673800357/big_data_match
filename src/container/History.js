import React, {Component} from 'react'
import {Tabs, Button, Input, Table,Modal} from 'antd';
import './History.css';
import {connect} from 'react-redux';
import {setHistory} from '../actions/index';
import {api} from '../const'
const TabPane = Tabs.TabPane;
const columns = [
    {
        title: '问题',
        dataIndex: 'question',
        key: 'question'
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time'
    }, {
        title: '回答',
        dataIndex: 'answer',
        key: 'answer'
    }
];
class History extends Component {
    state = {
        questions: [],
        hot: []
    }
    ask = (question) => () => {
        fetch(`${api}/GetSimi`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({question,age:20,sex:'男'}),
              mode: 'cors'
            }).then(res => res.json()).then(data => Modal.info({content:data.HD,title:'回答'})).catch(e => console.log(e))
    }
    componentDidMount = () => {
        this
            .props
            .setHistory('history');
        fetch(`/history/get?user=${this.props.user === '游客'
            ? window.localStorage.getItem('user')
            : this.props.user}`)
            .then(res => res.json())
            .then(data => {
                this.setState({questions: data.result})
            })
            .catch(e => console.log(e));
        fetch(`${api}/GetRedian`)
            .then(res => res.json())
            .then(data => this.setState({
                hot: Object
                    .keys(data)
                    .map((item,key) =><li onClick={this.ask(data[item])} style={{fontSize:'16px',cursor:'pointer'}}>{key +1}、{data[item]}</li>)
            }))
            .catch(e => console.log(e))
    }

    render() {
        const {questions,hot} = this.state;
        console.log(questions)
        const tabledata = questions.map((item,key) => {
            return {
                question: item.question,
                time: new Date(Number(item.time)).toLocaleTimeString(),
                answer: item.answer || '小邮回答不了',
                key
            }
        })
        return (
            <div className='history_container'>
                <h2>热门问题：</h2>
                <ul>{hot}</ul>
                <h2 style={{
                    margin: '10px 0 10px'
                }}>历史提问：</h2>
                <Table columns={columns} dataSource={tabledata}/>
                <Button type='primary' onClick={() => this.props.router.push('/info')}>发起新问题</Button>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {user: state.user.user}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setHistory: (history) => {
            dispatch(setHistory(history))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History)