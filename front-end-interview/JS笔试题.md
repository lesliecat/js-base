# JS笔试题

## JS类型相关

### typeof 没定义的变量会报错吗？typeof let定义了的呢？

- 未声明的变量使用 typeof 返回字符串 "undefined"
- typeof 一个 let 定义的变量会因为暂时性死区报错 [ReferenceError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)（前提：let/const 未声明之前赋值或使用）

```js
var tmp = 123
if (true) {
  tmp = 'abc' // ReferenceError: tmp is not defined
  let tmp
}

console.log(typeof tmp) // ReferenceError: tmp is not defined
let tmp

let tmp
console.log(typeof tmp) // undefined 不会报错
```

### typeof 的值有哪些

7种数据类型（返回的都是字符串形式）：

string, number, function, object, undefined, boolean, symbol（表独一无二的值）

注意：

- null 和 数组 返回的都是 object
- NaN 返回的是 number

### valueOf 和 toString

- toString(): 返回对象的字符串表示。
- valueOf(): 返回对象的字符串、数值或布尔值表示。

## 字符串

### 判断一个单词是否是回文

```js
var str = "mamam"
function checkPalindrom(str) {  
    return str === str.split('').reverse().join('')
}
```

### 验证回文字符串

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

- **输入:** "A man, a plan, a canal: Panama"        **输出:** true
- **输入:** "race a car"                                      **输出:** false

```js
var str = "A man, a plan, a canal: Panama"
var isPalindrome = function (s) {
    var reg = /[^A-Za-z0-9]/g
    var tempStr = s.replace(reg, "")
    var reverseStr = tempStr.split("").reverse().join("")
    return reverseStr.toLowerCase() === tempStr.toLowerCase()
};

console.log(isPalindrome(str))
```

### 统计字符串出现最多的字母

```js
var str = "afjghdfraaaasdenas"

function findMaxDuplicateChar(str) {
    if (str.length == 1) return str
    let charObj = {}
    for (let i = 0; i < str.length; i++) {
        if (!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1
        } else {
            charObj[str.charAt(i)] += 1
        }
    }
    let maxChar = '',
        maxValue = 1
    for (var key in charObj) {
        if (charObj[key] >= maxValue) {
            maxChar = key
            maxValue = charObj[key]
        }
    }
    return maxChar
}
```

### 字符串中的第一个唯一字符

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

- s = "leetcode"          返回 0.
- s = "loveleetcode"    返回 2.

```js
var str = "leetcode"
function firstUniqChar(str) {
  for (var i = 0; i < str.length; i++) {
    var curChar = str[i]
    if (str.lastIndexOf(curChar) === str.indexOf(curChar)) {
      return i
    }
  }
  return -1
}
console.log(firstUniqChar(str))
```

### 有效的字母异位词

即判断字符串中是否只有字符的位置不同，也就是判断两个字符串中包含的字符以及这些字符出现的次数是否相同

- **输入:** *s* = "anagram", *t* = "nagaram"        **输出:** true
- **输入:** *s* = "rat", *t* = "car"                        **输出:** false

```js
var s = "anagram", t = "nagaram"
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  var ss = s.split("").sort().join("")
  var tt = t.split("").sort().join("")
  return ss === tt ? true : false
}
console.log(isAnagram(s, t))
```

### 判断一个给定的字符串是否是同构的

> 输入: s = "egg", t = "add"
> 输出: true
> 输入: s = "foo", t = "bar"
> 输出: false

```js
var isIsomorphic = function(s, t) {
    var i = 0
    while (i < s.length) {
      if (s.indexOf(s[i]) != t.indexOf(t[i])){
        return false
      }
      i++
    }
    return true
}
```

### 报数

报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```shell
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

`1` 被读作  `"one 1"`  (`"一个一"`) , 即 `11`。

`11` 被读作 `"two 1s"` (`"两个一"`）, 即 `21`。

`21` 被读作 `"one 2"`,  "`one 1"` （`"一个二"` ,  `"一个一"`) , 即 `1211`。

```js
var countAndSay = function (n) {
    // 从1开始报数
    var result = '1'
    // 循环第 N 次
    for (let i = 1; i < n; i++) {
        // 默认当前连续的数字的次数为1
        var repeatCount = 1
        var str = ''
        // 循环当前数字
        for (let j = 0; j < result.length; j++) {
            console.log(result[j], result[j + 1])
            // 当前数字和后面一个是否相同，相同则重复数计数+1
            if (result[j] === result[j+1]) {
                repeatCount++
            } else {
                // 否则就把到目前为止的报数“读出来”
                str += repeatCount + result[j]
                repeatCount = 1
            }
        }
        // 当前第N次报数的结果，下次报数以此为准
        result = str
    }
    return result
}
```

### 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 `""`。

- **输入:** ["flower","flow","flight"]    **输出:** "fl"
- **输入:** ["dog","racecar","car"]      **输出:** ""

```js
var arr = ["flower", "flow", "flight"]
function longestCommonPrefix(arr) {
    if (!arr.length) return ""
    var firstStr = arr[0]
    var result = ""

    for (var i = 0; i < firstStr.length; i++) {
        for (var j = 1; j < arr.length; j++) {
            if (firstStr[i] !== arr[j][i]) {
                return result
            }
        }
        result += firstStr[i]
    }
    return result
}
console.log(longestCommonPrefix(arr))
```

### 生成指定长度的随机字母数字字符串

```js
function getRandomStr(len) {
    var str = ""
    for (var i = 0; i < len; i++ ) {
        str += Math.random().toString(36).substring(2)
    }
    return str.substring(0, len)
}
```

## 数组

### 判断数组的方法

```js
var arr = [1, 2, 3]

arr instanceof Array

Object.prototype.toString.call(arr) === '[object Array]'

Array.isArray(arr)

arr.constructor === Array // 前提是保证 constructor 不会被更改
// 不能使用 typeof 因为 它返回的是个 'object'
```

### JS数组去重

```js
var arr = [1, 1, "1", "1", NaN, NaN, {}, NaN]

// 方法1：indexOf去重（无法对 对象，NaN 识别去重）
// → indexOf 不认 NaN，遇到NaN就返回 -1
function myDistinct(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i])
        }
    }
    return result
}
// 返回数组：[ 1, '1', NaN, NaN, {}, {}, NaN ]
// 原数组：[ 1, 1, '1', '1', NaN, NaN, {}, {}, NaN ]

// 方法2：filter + indexOf（对 对象 和 NaN 无效）
function myDistinct(arr) {
    var result = arr.filter((item, index, arr) => {
        // 重复的值的索引肯定大于第一次出现这个值的索引，不会被返回
        return arr.indexOf(item) === index
    });
    return result
}
// 返回数组：[ 1, '1', {}, {} ]
// 原数组：[ 1, 1, '1', '1', NaN, NaN, {}, {}, NaN ]

// 方法3：filter 升级版（解决了 对象 和 NaN 的问题）
function myDistinct(arr) {
    var obj = {}
    return arr.filter((item, index) => {
        // 由于对象的键值只能是字符串，导致 1 和 '1' 被认为是相同的值，所以下方使用 typeof item + item 拼成字符串作为 key 值来避免这个问题
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) 
              ? false 
              : obj[typeof item + JSON.stringify(item)] = true
    })
}
// 返回数组：[ 1, '1', NaN, {} ]
// 原数组：[ 1, 1, '1', '1', NaN, NaN, {}, {}, NaN ]

// 方法4：for循环（解决了 对象 和 NaN 的问题）
~function() {
    var arr = [1, 1, "1", "1", NaN, NaN, {}, NaN]

    var prop = Array.prototype
    prop.myDistinct = function myDistinct() {
        var hash = {}
        for (var i = 0; i < this.length; i++) {
            var temp = typeof this[i] + JSON.stringify(this[i])
            if (hash[temp]) {
                this[i] = this[this.length - 1]
                this.length--
                i--
                continue
            }
            hash[temp] = true
        }
        return this
    }
    console.log(arr.myDistinct())
}()
```

### 两个数组比较，判断是否有相同元素（交集）

```js
var a = [1, 2, 3, 4, 5, NaN]
var b = [2, 4, 6, 8, 10, NaN]

// 方法1：filter + indexOf（支持 NaN）
var c = a.filter(v => b.indexOf(v) > -1) // []
var aHasNaN = a.some(v => isNaN(v))
var bHasNaN = b.some(v => isNaN(v))
var c = a.filter(v => b.indexOf(v) > -1)
          .concat(aHasNaN && bHasNaN ? [NaN] : [])

// 若下面 a、b 情况，上面方法会导致结果为 [2, 2]，但按正常逻辑预期应该是 [2] )
var a = [1, 2, 2, 1, NaN]
var b = [2, NaN]

var aHasNaN = a.some(v => isNaN(v))
var bHasNaN = b.some(v => isNaN(v))
return a.filter(v => {
        var index = b.indexOf(v)
        if (index > -1) {
            b.splice(index, 1)
            return true
        }
    }).concat(aHasNaN && bHasNaN ? [NaN] : [])

// 方法2：es7 includes
var c = a.filter(v => b.includes(v))
```

### 如何实现数组的随机排序？

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 方法1：随机交换数组内的元素
function result(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 随机索引【Math.random()返回一个浮点,  伪随机数在范围[0，1)】
        let randomIndex = parseInt(Math.random() * arr.length)
        // 存下当前正常索引值对应的数字
        let curNum = arr[i]
        // 将其重新赋值为随机索引对应的数字
        arr[i] = arr[randomIndex]
        // 将随机索引对应的数字替换为当前正常索引值对应的数字
        arr[randomIndex] = curNum
    }
    return arr
}

// 方法2：sort() 可以调用一个函数做为参数，如果这个函数返回的值为负数表示数组中的 a 项排在 b 项前
arr.sort(function() {
  return Math.random() - .5
})
console.log(arr)
```

### 找出正数组中的最大差值

```js
var arr = [10,5,11,7,8,9]; // 11-5=6

function getMaxProfit(arr) {
  var min = max = arr[0];
  for(var i=0; i<arr.length; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
  }
  return Math.abs(max - min);
}
```

### 从排序数组中删除重复项

```js
// 若 nums = [1,1,2], 则函数应返回长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
// 若 nums = [0,0,1,1,1,2,2,3,3,4], 则返回 5, 并且原数组被修改为 0, 1, 2, 3, 4。
var nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
function removeDuplicates(nums) {
  for (var i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) {
      nums.splice(i - 1, 1)
      i--
    }
  }
  return nums.length
}
```

### 找出数组中出现次数最多的元素，并给出其出现过的位置

```js
var arr = [1, 1, 2, 1, 10, 10, 11, 1, 7]

function fn(arr) {
    var bestItem, indexs = [], obj = {}
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i].toString()
        obj[item] ? obj[item].push(i) : obj[item] = [].concat([i])
    }
  
    var tempArr = Object.entries(obj)
    bestItem = parseInt(tempArr[0][0])
    indexs = tempArr[0][1]
  
    for (const [key, value] of tempArr) {
        if (indexs.length < value.length) {
            bestItem = parseInt(key)
            indexs = value
        }
    }

    return { bestItem, indexs }
}
console.log(fn(arr))
```

### 买卖股票的最佳时机

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意**：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

输入: [7,1,5,3,6,4]         输出: 7

解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

```js
var arr = [7, 1, 5, 3, 6, 4]
function maxProfit(arr) {
    var income = 0;
    for (var i = 1, len = arr.length; i < len; i++) {
        var gap = arr[i] - arr[i - 1] // 后一个与前一个比较，大于零则赚
        if (gap > 0) {
            income += gap
        }
    }
    return income
}
console.log(maxProfit(arr))
```

### 旋转数组

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

输入: [1,2,3,4,5,6,7] 和 k = 3          输出: [5,6,7,1,2,3,4]

解释:

向右旋转 1 步: [7,1,2,3,4,5,6]

向右旋转 2 步: [6,7,1,2,3,4,5]

向右旋转 3 步: [5,6,7,1,2,3,4]

```js
var arr = [1, 2, 3, 4, 5, 6, 7]

function rotate(arr, k) {
    var len = arr.length
    for (var i = 0; i < k; i++) {
        var temp = arr.pop()
        arr.unshift(temp)
    }
    return arr
}

console.log(rotate(arr, 3))
```

### 判断数组是否存在重复

给定一个整数数组，判断是否存在重复元素。

如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

输入: [1,2,3,1]        输出: true

输入: [1,2,3,4]        输出: false

```js
var arr = [1, 2, 3, 1]
function containsDuplicate(arr) {
    var obj = {}
    for (var i = 0, len = arr.length; i < len; i++) {
        if (obj[arr[i]]) {
            return true
        } else {
            obj[arr[i]] = true
        }
    }
    return false
}

// or

function containsDuplicate(arr) {
  return [...new Set(arr)].length !== arr.length
}

console.log(containsDuplicate(arr))
```

### 找出只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

```js
var arr = [4, 1, 2, 1, 2]

function singleNumber(arr) {
    var tempArr = arr
    tempArr.sort()
    var onceNumber = null
    for (var i = 0, len = tempArr.length - 1; i < len; i++) {
        if (tempArr[i] !== tempArr[i + 1]) {
            onceNumber = tempArr[i]
        } else {
            ++i
        }
    }
    // 有可能排序后最后一个才是单着的数字，所以直接赋值为数组最后一个值
    return onceNumber !== null ? onceNumber : tempArr[tempArr.length - 1]
}

// or

function singleNumber(arr) {
    const a = [...new Set(arr)].reduce((total, cur) => total + cur, 0)
    const b = arr.reduce((total, cur) => total + cur, 0)
    return 2 * a - b
}

console.log(singleNumber(arr))
```

### 加一

给定一个由**整数**组成的**非空**数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1:**

```shell
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```

**示例 2:**

```shell
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```

```js
var arr = [9, 9, 9] // 预期：[1, 0, 0, 0]
function plusOne(arr) {
    var count = arr.length - 1
    // 从末尾往前倒
    while (count > -1) {
        // 只要当前位+1大于9，就把当前位置为0，count--
        if (arr[count] + 1 > 9) {
            arr[count] = 0
            count--
        } else {
            // 一旦当前位+1不大于9，就放心+1，且直接退出，不用再算更高位的了
            arr[count]++
            break;
        }
    }
    // 如果while后，第一位还是0，证明这个数组所有数字都为9.这个时候往数组最前面加个1就好
    if (arr[0] === 0) {
        arr.unshift(1)
    }
    return arr;
};
console.log(plusOne(arr))
```

### 移动零

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```shell
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

```js
var arr = [0, 1, 0, 3, 12] // 预期：[ 1, 3, 12, 0, 0 ]
var moveZeroes = function (nums) {
    // 长度提取出来
    var len = nums.length
    for (var i = 0; i < len; i++) {
        // 从头往后遍历，遇到0则删掉追放到尾部，
        // 同时让i--，因为头部删了个0；同时len--，因为不再判断追加后的
        if (nums[i] === 0) {
            nums.splice(i, 1)
            nums.push(0)
            i--
            len--
        }
    }
    return nums
}
console.log(moveZeroes(arr))
```

### 两数之和

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例:**

```shell
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

```js
var nums = [2, 7, 11, 15], target = 9
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    // 第二个数索引
    const targetIndex = nums.indexOf(target - num)
    // 确保存在第二个数，且不为当前遍历的数
    if (targetIndex > -1 && targetIndex !== i) {
      return [i, targetIndex]
    }
  }
}
console.log(twoSum(nums, target))
```

### 旋转图像

给定一个 *n* × *n* 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

**说明：**

你必须在**原地**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。

**示例 1:**

```shell
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2:**

```shell
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

```js
var matrix = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16]
]

function rotate(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var tempArr = arr[j][i]
            arr[j][i] = arr[i][j]
            arr[i][j] = tempArr
        }
        arr[i].reverse()
    }
    return arr
}

console.log(rotate(matrix))
```

### 如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』？

```js
var num = 12000000.11

// 方法1：利用 toLocaleString() 返回某语言系统下数字的表示字符串 IE6+
num.toLocaleString()

// 方法2
function toThousands(num) {
    if (typeof num !== 'number') return 0
    // 判断 num 是否小于 0 ，小于则设 flag 为 "-" 并且把 num 转为绝对值
    if (num < 0) {
        flag = "-"
        num = Math.abs(num)
    }
    // 转为数组 e.g. [ '12000000', '11' ]
    var arr = num.toString().split(".")
    // 分别把「.」左边和右边存起来
    var left = [...arr[0]]
    var right = ""
    // 如果 num 不是个整数的情况
    if (arr.length > 1) {
        right = "." + arr[1]
    }
    var count = left.length - 1
    // 操作左边整数部分，逆向遍历并且逢3前面加个「,」 ，最后 i-1
    while (count > 0) {
        // [1,2,0,0,0,0]
        // 例如如果数组长度为6，则一开始 count=5 ，不加
        // count=3 时，就需要在前面加个「,」
        if (count % 3 === 0) {
            left.splice(-count, 0, ',')
        }
        count--
    }
    // 正负符号 + 左边 + 小数点和右边
    return flag + left.join("") + right
}

// 方法3：正则
function toThousands(num) {
  return num && num
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
    return $2 + ','
  })
}
```

## 随机数 / 数字

### 如何获取0-9的随机数

- **Math.round(num)**：将 **num** 四舍五入取整
- **Math.floor(num)**：将 **num** 向下取整，即返回 **num** 的整数部分。当然我们也可以使用 **parseInt()** 方法代替。
- **Math.ceil(num)**：向上取整

```js
// (min, max)：
return Math.round(Math.random() * (max - min - 2) + min + 1)
// [min, max]：
return Math.round(Math.random() * (max - min) + min)
// (n, m]：
return Math.ceil(Math.random() * (max - min) + min)
// [n, m)：
return Math.floor(Math.random() * (max - min) + min)
```

### 随机获取数组中的元素

```js
var arr = ["前端", "后端", "全栈"]
function fn(arr) {
    return arr[parseInt(Math.random() * arr.length)]
}
var i = 0
while (i<10) {
    console.log(fn(arr))
    i++
}
```

### 打乱数组顺序

```js
var arr = [1,2,3,4,5,6,7,'a','dsfs',8,9,'v']
function fn(arr) {
  for(var i = 0; i < arr.length; i++) {
    var randomIndex = parseInt(Math.random() * arr.length)
    var temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}
```

### 保留指定小数位

```js
var num =4.345678
num = num.toFixed(4) // 4.3457 第四位小数位以四舍五入计算
```

### 如何将字符串转化为数字，例如'12.3b'？

```js
parseFloat('12.3b')
// 12.3
```

### 如何检查一个数字是否为整数？

> 将它对 1 进行取模，看看是否有余数。

```js
function isInt(num) {
  return num % 1 === 0
}

console.log(isInt(4)) // true
console.log(isInt(12.2)) // false
console.log(isInt(0.3)) // false
```

### 为什么0.1+0.2不等于0.3？在什么场景下遇到这个问题，如何解决？

> 二进制模拟十进制进行计算时 的精度问题

```js
// 方法1：ES6的 Number.EPSILON ，这个值无限接近于0。0.1 + 0.2的精度误差在这个值的范围内
function numbersEqual(a,b) {
    return Math.abs(a - b) < Number.EPSILON
}
var a = 0.1 + 0.2, b=0.3
console.log(numbersEqual(a,b))    //true


// 方法2：parseFloat + 内置函数 toFixed
function formatNum(num, fixed = 10) {
    // a.toFixed(fixed) 先转为小数点10位的字符串 "0.3000000000"
    return parseFloat(a.toFixed(fixed)) // 然后通过parseFloat转为浮点数
}
var a = 0.1 + 0.2;
console.log(formatNum(a)) //0.3

// 方法3：内置函数toPrecision(中文：精确，精度)
// 参数是精度.比如 5.1234 ，传 2 返回 5.1 ，传 1 返回 5 ；0.2 + 0.1 传 2 返回 0.30
(0.1 + 0.2).toPrecision(10) == 0.3 // true
```

参考：

- [0.1 + 0.2不等于0.3？为什么JavaScript有这种“骚”操作？](https://juejin.im/post/5b90e00e6fb9a05cf9080dff)
- [JavaScript的设计缺陷?浮点运算：0.1 + 0.2 != 0.3](https://blog.csdn.net/nineteen73/article/details/51184387)

## 对象 & 原型 & 原型链

### 写一下浅/深拷贝

> 深拷贝和浅拷贝针对的是引用类型，JS中的变量类型分为值类型（基本类型）和引用类型；对值类型进行复制操作会对值进行一份拷贝，而对引用类型复制，则会进行地址的拷贝，最终两个变量指向同一份数据。对于引用类型，会导致a b指向同一份数据，此时如果对其中一个进行修改，就会影响到另外一个，有时候这可能不是我们想要的结果。

#### 浅拷贝

```js
// 实现一个浅拷贝，就是遍历源对象，然后在将对象的属性的属性值都放到一个新对象里就ok了

// 方法1：遍历
function copy(obj) {
  if (!obj || typeof obj !== 'object') return

  var newObj = obj.constructor === Array ? [] : {}
  for (var key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}
var a = {b: 'bb', c: 'cc',  d: {e: 'ee'}}
var b = copy(a)
console.log(b) // { b: 'bb', c: 'cc', d: { e: 'ee' } }

// 方法2：原生方法 Object.assign
var a = {a : 'old', b : { c : 'old'}}
var b = Object.assign({}, a)
b.a = 'new'
b.b.c = 'new'
console.log(a) // { a: 'old', b: { c: 'new' } }
console.log(b) // { a: 'new', b: { c: 'new' } }
```

#### 深拷贝

```js
// 方法1：转 JSON 再转回来
var obj1 = {a: {name: '小红'}, b: 2}
var obj2 = JSON.parse(JSON.stringify(obj1))
obj1.a.name = '被修改了'
obj2   //{"a":{"name":"小红"},"b":2}  《---没有被修改

// JSON方法的缺点：
//  不能复制 function、正则、Symbol
//  循环引用报错
//  相同的引用会被重复复制

// 方法2：递归的方法
function copy(obj) {
    // 递归退出条件
    // 拷贝对象不存在或不是数组或不是对象
    if (!obj || typeof obj !== 'object') return obj

    var newObj = obj.constructor === Array ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 如果是数组或者对象
            if (typeof obj[key] === 'object') {
                // 递归
                newObj[key] = copy(obj[key])
            } else {
                // 否则直接返回
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

var old = { a: 'old', b: { c: 'old' } }
var newObj = copy(old)
newObj.b.c = 'new'
console.log(old) // { a: 'old', b: { c: 'old' } }
console.log(newObj) // { a: 'old', b: { c: 'new' } }
```

参考：

- [浅探js深拷贝和浅拷贝](https://segmentfault.com/a/1190000016970483)
- [深拷贝的终极探索](http://www.cnblogs.com/zhangycun/p/9799787.html)

### JavaScript 中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

**hasOwnProperty**

hasOwnProperty 返回一个布尔值，指出一个对象是否具有指定名称的属性。此方法不会检查该对象的原型链中是否具有该属性；该属性必须是对象本身的一个成员。

使用方法： object.hasOwnProperty(proName) 其中参数 object 是必选项，一个对象的实例；proName 是必选项。一个属性名称的字符串值。 如果 object 具有指定名称的属性，那么 JavaScript 中 hasOwnProperty 函数方法返回 true，反之则返回 false。

### instanceof 的实现原理

> 思路：只要右边变量的 prototype 在左边变量的原型链上即可。

```js
function myInstanceOf(leftValue, rightValue) {
    let rightProto = rightValue.prototype // 取右表达式的 prototype 值
    leftValue = leftValue.__proto__ // 取左表达式的 __proto__ 值
    while (true) {
        if (leftValue === null) {
            return false
        }
        if (leftValue === rightProto) {
            return true
        }
        leftValue = leftValue.__proto__
    }
}
```

参考：[浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)

### 实现一个单例

```js
var SingleTest = (function () {
    var _instance = null
    SingleInstance.prototype._init = function(ops) {
        for (let i in ops) {
            this[i]=ops[i]
        }
    }
    function SingleInstance(args) {
        if (_instance == null) {
            _instance=this
        }
        _instance._init(args)
        return _instance
    }
    return SingleInstance
})()

var i1=new SingleTest({name:"lance1"})
var i2=new SingleTest({name:"lance2"})
console.log(i1===i2)  // 结果是true
console.log(i1.name)  // 结果是escapist3
```

## Event Loop & setTimeout

### setTimeout 的机制

等到当前脚本的同步任务和 "任务队列" 中已有的事件，全部处理完以后，才会执行 setTimeout 指定的任务。

参考：[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

### Event Loop

有关 Event Loop 相关的概念和面试题可参考我的博客：[Event Loop 学习笔记](https://evestorm.github.io/posts/10505/)

## DOM

### getElementsByClassName 和 querySelectorAll 的区别

- 参数上：querySelectorAll 方法接收的参数是一个 CSS 选择符。而 getElementsBy 系列接收的参数只能是单一的 className、tagName 和 name

    ```js
    var c1 = document.querySelectorAll('.b1 .c')
    var c2 = document.getElementsByClassName('c')
    var c3 = document.getElementsByClassName('b2')[0].getElementsByClassName('c')
    ```

- 返回值上：querySelectorAll 返回的是一个 Static Node List，而 getElementsBy 系列的返回的是一个 Live Node List

参考：

- [querySelectorAll 方法相比 getElementsBy 系列方法有什么区别？](https://www.zhihu.com/question/24702250)
- [静态NodeList 和 动态NodeList的区别](https://segmentfault.com/a/1190000008829267)

### 原生 JS 添加类

- element.setAttribute("class", 'Lance')
- element.className = "lance awesome"
- 追加类：element.setAttribute("class", element.getAttribute("class") + " " + "lance")

### 编写一个可拖拽的 div

> HTML

```html
<div id="sw"></div>
```

> CSS

```css
#sw { position: absolute; }
```

> JS

```js
var flag = false
var position = null
var sw = document.querySelector("#sw")
sw.addEventListener("mousedown", function (e) {
    flag = true
    position = [e.clientX, e.clientY]
    console.log(e.clientX, e.clientY)
})
// 这里监听 document ，如果监听 sw 则会有快速拖动导致鼠标「脱离」 div 的 bug
document.addEventListener("mousemove", function (e) {
    if (!flag) return
    var x = e.clientX
    var y = e.clientY
    var moveX = x - position[0]
    var moveY = y - position[1]
    var left = parseInt(sw.style.left || 0)
    var top = parseInt(sw.style.top || 0)
    // 注意 style.left 带 px 单位
    sw.style.left = left + moveX + 'px'
    sw.style.top = top + moveY + 'px'
    position = [x, y]
})
document.addEventListener("mouseup", function() {
    flag = false
})
```

## 算法题

我面的都不是什么大公司，所以很少被问到算法，不过对于前端来说，了解一些基本的算法还是很有必要的，起码最常见的排序算法得掌握，例如冒泡和快排。这部分内容可参考我的博客：

- [常见排序算法](https://evestorm.github.io/posts/59937/)