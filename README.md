# 简中文档 / zhcndoc

[简中文档](https://www.zhcndoc.com) 是一个开源项目的文档平台，收录并维护了 Nuxt、Bun、OpenClaw 等主流开源项目的简体中文翻译文档站点。

## 项目结构

本项目采用 pnpm 单仓库（monorepo）管理：

```
zhcndoc/
├── website/          # 主站 Nuxt 4 应用
│   ├── app/          # 应用代码（页面、组件、布局）
│   ├── content/      # 内容数据
│   │   ├── projects/ # 各项目元数据（*.yml）
│   │   └── blog/     # 博客文章
│   ├── server/       # 服务端 API（分析、项目数据）
│   └── shared/       # 共享类型与工具函数
├── scripts/          # 工具脚本
├── vercel.json       # Vercel 部署配置
└── zbpack.json       # Zeabur 部署配置
```

## 技术栈

- **框架**：[Nuxt 4](https://nuxt.com)（兼容性版本 5）
- **UI**：[@nuxt/ui](https://ui.nuxt.com) + [Tailwind CSS v4](https://tailwindcss.com)
- **内容**：[@nuxt/content](https://content.nuxt.com)
- **图表**：[ECharts](https://echarts.apache.org)（通过 nuxt-echarts）
- **包管理**：[pnpm](https://pnpm.io) workspace

## 开发约定

### 时间处理

所有时间相关的处理都应该使用 [Luxon](https://moment.github.io/luxon/) 库实现：

- **日期格式化**：使用 `DateTime` 对象的 `toFormat()` 方法
- **时间戳转换**：使用 `DateTime.fromMillis()` 或 `DateTime.fromISO()` 等方法
- **时区处理**：通过 `setZone()` 方法处理不同时区

**示例**：

```typescript
import { DateTime } from 'luxon'

// 格式化 ISO 字符串
DateTime.fromISO(post.date).toFormat('yyyy 年 MM 月 dd 日')

// 格式化时间戳
DateTime.fromMillis(timestamp)
  .setZone('Asia/Shanghai')
  .setLocale('zh-CN')
  .toFormat('yyyy 年 MM 月 dd 日 HH:mm')
```

> ⚠️ 不应使用 `new Date().toLocaleDateString()` 等原生 JavaScript Date API

## 本地开发

安装依赖：

```bash
pnpm install
```

启动开发服务器（`http://localhost:3000`）：

```bash
pnpm --filter @zhcndoc/website dev
```

## 构建与预览

构建生产版本：

```bash
pnpm --filter @zhcndoc/website build
```

预览生产构建：

```bash
pnpm --filter @zhcndoc/website preview
```

## 部署

### Vercel

项目通过 `vercel.json` 配置，构建完成后将 Nitro 的 Vercel Build Output API 产物从 `website/.vercel/output` 复制到仓库根目录，Vercel 可自动识别并部署 SSR：

```json
{
  "buildCommand": "pnpm --filter @zhcndoc/website build && cp -r website/.vercel/output .vercel/output",
  "installCommand": "pnpm install"
}
```

直接连接 GitHub 仓库后，Vercel 会自动完成构建与部署。

### Zeabur

通过 `zbpack.json` 配置，使用 `node-server` 预设以持久服务器模式运行：

```json
{
  "build_command": "NITRO_PRESET=node-server pnpm --filter @zhcndoc/website build",
  "start_command": "cd website && node .output/server/index.mjs"
}
```

## 添加项目

在 `website/content/projects/` 目录下新增 `<name>.yml` 文件：

```yaml
name: project-name
description: 一句话描述该项目的功能（约 400px 宽度内）。
type: mirror
upstream:
  owner: github-org
  repo: repo-name
  branch: main
  link: https://project-official-site.com
```

## 脚本工具

- `scripts/api-to-csv.mjs` — 将项目 API 数据导出为 CSV
- `scripts/measure.mjs` — 测量项目描述文本宽度
- `scripts/test-desc.mjs` — 测试项目描述字段
- `scripts/clearWorkflowRuns.ts` — 清理 GitHub Actions 工作流运行记录
