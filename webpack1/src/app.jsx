import React from 'react'
import ReactDom from 'react-dom'
import Header from  './components/header'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date().getTime(),
            a: '2',
            childValue: 100
        }
        
    }
    chageVauleA() {
        this.setState({a: this.state.a +1})
    }
    changeFromChild() {
        this.setState({childValue: this.state.childValue +1})
    }

    render() {
        // let map1 = new Map()

        // map1.set('key1', 'this value is key1')

        // console.log(map1.get('key1'))

        var arr1 = [1,2, 3]

        //实现es6 map方法
        arr1.map1 = function(cb) {
            var newValues = []
            for(var i = 0; i< this.length; i++) {
                newValues.push(cb(this[i], i, this))
            }
            return newValues
        }
        
        var ttt = arr1.map1(function(item, index, arr) {
            console.log(item, index, arr)
            return item + 1
        })
        console.log(ttt)

        var ttt1 = arr1.map(function(item, index, arr) {
            console.log(item, index, arr)
            return item == 1
        })
        console.log(ttt1)


        Function.prototype.bind1 = function(zhizhen) {
            this = zhizhen
        }

        var k = function() {

        }

       


        return (
            <div>
                <Header nowtime = {this.state.date} changeFromChild={this.changeFromChild.bind(this)}/>
                <span onClick= {this.chageVauleA.bind(this)}>{this.state.a}</span>
                <span>{this.state.childValue}</span>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'))