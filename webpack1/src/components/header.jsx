import React from 'react'

export default class Header extends React.Component {
    constructor(){
        super()
        console.log(Header.name)
    }
    static name = {  //该方法还未被发布
        a: 'jake'
    }
    render() {
        return (
            <div>
                <h3>这是react头部</h3>
                <span>father传来的时间{this.props.nowtime}</span>
                <span>{this.props.chageVauleA}</span>
                <p onClick={this.props.changeFromChild}>子改变父的值</p>
            </div>
        )
    }
}