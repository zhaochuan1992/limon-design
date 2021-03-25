# limon-design

## 使用 React+typescript 搭建的基础组件库

[![NPM version][npm-image]][npm-url]

### 安装

```javascript
npm install limon-design --save
```

### 使用

```javascript
// 加载样式
import "limon-design/dist/index.css";
// 引入按钮组件
import { Button } from "limon-design";

<Button disabled> disabled </Button>
<Button onClick={(e) => { alert('ddd') }}> 点击事件 </Button>
<Button btnType='primary' size='lg'> 默认 </Button>
<Button btnType='danger' size='sm'> 警告 </Button>
<Button btnType='link' size='sm'> link </Button>
```

### 开发计划（已完成）

- Button 按钮
- Alert 悬浮框
- Menu 导航条
- Tabs 切换
- Input 输入框
- AutoComplete 关联搜索
- Progress 进度条
- Upload 上传

### 后续计划

- DatePicker 日期选择器
- 更多的业务组件。。
