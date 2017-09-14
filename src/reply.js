const replys = ['小邮没学过呢，让我去翻下书行不？',
    '小邮不太懂你问的啥，换种问法呀',
    'T T 小邮不会这个问题嘛'
]
const reply = () => replys[ Math.floor(Math.random() * replys.length) ]
export default reply