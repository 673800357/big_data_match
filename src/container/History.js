import React, {Component} from 'react'
import {Tabs, Button, Input} from 'antd';
import './History.css';
const TabPane = Tabs.TabPane;
export default class History extends Component {
    render() {
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
                    <li>xxxxxqweqwexxxx</li>
                    <li>xxxqweqwexxxxxx</li>
                    <li>xxxxxxeqwexxx</li>
                    <li>xxxxxxeqweqwexxx</li>
                </ul>
                <Button type='primary' onClick={() => this.props.router.push('/info')}>发起新问题</Button>
            </div>
        )
    }
}
