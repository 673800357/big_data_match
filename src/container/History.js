import React, {Component} from 'react'
import {Tabs, Button, Input} from 'antd';
import './History.css';
import {connect} from 'react-redux';
const TabPane = Tabs.TabPane;
class History extends Component {
    state = {
        questions:[]
    }
    componentDidMount = () => {
      fetch(`/history/get?user=${this.props.user}`).then(res =>res.json()).then(data =>{
          this.setState({questions:data.result})
      }).catch(e => console.log(e));
    }
    
    render() {
        const {questions} = this.state;
        return (
            <div className='history_container'>
                <h2>热门问题：</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="内科" key="1">
                        <ul>
                            <li>xxxxxxxxx</li>
                            <li>xxxxxxxxx</li>
                            <li>xxxxxxxxx</li>
                            <li>xxxxxxxxx</li>
                        </ul>
                    </TabPane>
                    <TabPane tab="外科" key="2">
                        <ul>
                            <li>xxxxdasdasxxxxx</li>
                            <li>xxxxasdasdxxxxx</li>
                            <li>xxxxxaaaxxxx</li>
                            <li>xxxxxxssssxxx</li>
                        </ul>
                    </TabPane>
                    <TabPane tab="儿科" key="3">
                        <ul>
                            <li>xxxxxqweqwexxxx</li>
                            <li>xxxqweqwexxxxxx</li>
                            <li>xxxxxxeqwexxx</li>
                            <li>xxxxxxeqweqwexxx</li>
                        </ul>
                    </TabPane>
                </Tabs>
                <h2>历史提问：</h2>
                <ul>
                    {questions.map(item => <li>问题：{item.question} 时间：{item.updatedAt}</li>)}
                </ul>
                <Button type='primary' onClick={() => this.props.router.push('/info')}>发起新问题</Button>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History)