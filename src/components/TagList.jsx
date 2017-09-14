import React from 'react'
import { Tag} from 'antd';
import {api} from '../const.js';
export const TagList = ({tagData,click,tuling}) => {
    let colors =['pink','pink','orange','green']
    return(
        <div>
            <div className='head_tag'> {tagData.map((item,index) => <Tag key={index} onClick={()=>{
                fetch(`${api}/GetTuLing?word=${item}是什么`).then(res =>res.text()).then(data =>{
                    click(data);
                }).catch(e =>console.log(e))
                }} style={{fontSize:'17px'}} color={colors[ Math.round(Math.random()*4)]}>{item}</Tag>)}</div>
            <div className='robot'>
                {tuling}
            </div>
        </div>
    )
}

export default TagList