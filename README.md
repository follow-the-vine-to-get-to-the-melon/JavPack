![JavPack](https://s1.ax1x.com/2022/04/01/q5lzYn.png)

# JavPack

> 一些（最小化）脚本

## 脚本

| 名称             | 描述           | 安装                                                                                 |
| :--------------- | :------------- | :----------------------------------------------------------------------------------- |
| 115.delDir       | 播放页删除目录 | [安装](https://github.com/bolin-dev/JavPack/raw/main/115/115.delDir.user.js)         |
| JavDB.style      | 样式调整       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.style.user.js)      |
| JavDB.layout     | 布局调整       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.layout.user.js)     |
| JavDB.search     | 快捷搜索       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.search.user.js)     |
| JavDB.nav        | 快捷翻页       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.nav.user.js)        |
| JavDB.openTab    | 新标签页打开   | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.openTab.user.js)    |
| JavDB.quickLook  | 快速查看       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.quickLook.user.js)  |
| JavDB.scroll     | 滚动加载       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.scroll.user.js)     |
| JavDB.filter     | 影片筛选       | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.filter.user.js)     |
| JavDB.trailer    | 预告片         | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.trailer.user.js)    |
| JavDB.match115   | 115 网盘匹配   | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.match115.user.js)   |
| JavDB.sprite     | 雪碧图         | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.sprite.user.js)     |
| JavDB.offline115 | 115 网盘离线   | [安装](https://github.com/bolin-dev/JavPack/raw/main/javdb/JavDB.offline115.user.js) |

## 使用

- JavDB.search

  - 快捷键 `/` 选取搜索框

  - 快捷键 `Ctrl` + `/` 搜索粘贴板首项

- JavDB.nav

  - 方向键左右翻页

- JavDB.openTab

  - 鼠标左键前台新标签页打开，右键后台新标签页

- JavDB.quickLook

  - 鼠标悬停后，空格键弹窗预览影片详情，再次键入空格 / `Esc` 以关闭弹窗

  - 预览时键入 `Enter` 访问详情页

- JavDB.offline115

  > 用于离线下载的路径目录需设置时间排序（注：各目录可单独设置排序

  - `config[].name` 按钮名称；必填

  - `config[].color` 按钮样式；参考 [Bulma](https://bulma.io/documentation/elements/button/#colors)；默认 `is-info`

  - `config[].desc` 按钮描述；默认 `离线路径`

  - `config[].type` 按钮类型，支持 `plain` `genres` `actors`，默认 `plain`

  - `config[].match` 类型匹配；仅 `genres` `actors` 模式下支持

  - `config[].exclude` 类型排除；仅 `genres` `actors` 模式下支持

  - `config[].magnetOptions.filter` 磁链筛选；默认 200MB < `size` < 15GB

  - `config[].magnetOptions.sort` 磁链排序；默认 `zh` ➡️ `crack` ➡️ `size`

  - `config[].magnetOptions.max` 磁链最大数；默认 5

  - `config[].dir` 离线路径；支持动态参数 `code` `prefix` `create` `title` `date` `director` `maker` `publisher` `series` `genres` `actors`，`genres` `actors` 模式下分别额外支持 `genre` `actor`；默认 `云下载`

  - `config[].verifyOptions.max` 离线验证最大次数；默认 10

  - `config[].verifyOptions.clean` 离线验证失败清理；默认 `true`

  - `config[].rename` 离线重命名；支持动态参数；默认 `${zh}${crack} ${code} ${title}`

  - `config[].tags` 自动打标；默认 `["genres", "actors"]`

  - `config[].clean` 文件清理；默认 `true`

  - `config[].upload` 图片上传；默认 `["cover"]`

## 许可

The GPL-3.0 License.
