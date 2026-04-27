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

- **框架**：[Nuxt 4](https://nuxt.com)
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

根目录脚本会转发到 `@zhcndoc/website` workspace 包执行；如果你进入 `website/`，也可以直接运行同名脚本。

安装依赖：

```bash
pnpm install
```

启动开发服务器（`http://localhost:3000`）：

```bash
pnpm run dev
```

## 构建与预览

构建生产版本：

```bash
pnpm run build
```

预览生产构建：

```bash
pnpm run preview
```

## 部署

### Vercel

项目通过 `vercel.json` 配置，从仓库根目录调用 workspace 脚本；构建完成后会将 Nitro 的 Vercel Build Output API 产物从 `website/.vercel/output` 复制到仓库根目录，Vercel 可自动识别并部署 SSR：

```json
{
  "buildCommand": "pnpm run build:vercel",
  "installCommand": "pnpm install"
}
```

直接连接 GitHub 仓库后，Vercel 会自动完成构建与部署。

### Zeabur

通过 `zbpack.json` 配置，从仓库根目录构建，并使用 workspace 过滤到 `website` 包启动 `node-server` 产物：

```json
{
  "build_command": "NITRO_PRESET=node-server pnpm run build",
  "start_command": "NITRO_HOST=0.0.0.0 pnpm --filter @zhcndoc/website exec node .output/server/index.mjs"
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

如果上游仓库过大，不适合完整镜像到 `zhcndoc/<name>`，可以为项目增加 `sparse` 配置，只同步文档相关路径：

```yaml
name: project-name
description: 一句话描述该项目的功能（约 400px 宽度内）。
type: translate
upstream:
  owner: github-org
  repo: repo-name
  branch: main
  link: https://project-official-site.com
  sparse:
    - .gitignore
    - docs
    - LICENSE
    - README.md
```

`sparse` 中的路径都按仓库根目录理解。当前工作流会在运行时自动补齐前导 `/`，并在提交时对这些路径执行 `git add -f`，所以像 `openclaw` 这类会把 `/.gitignore` 自己忽略掉的仓库也能正常同步。

## Sparse 仓库迁移

### 旧项目迁移到 sparse

适用场景：

- `zhcndoc/<name>` 已经存在
- 远端 `main` 分支里已经有中文翻译内容
- 需要把 `upstream` 和 `main` 都切换成 docs-only 历史

推荐步骤：

1. 先在 `website/content/projects/<name>.yml` 里补上 `upstream.sparse`
2. 用 sparse 模式分别拉取当前 `main` 和官方上游仓库
3. 重建远端 `upstream` 分支为 docs-only 快照
4. 基于新的 `upstream` 重建远端 `main`，再把当前中文内容同步回去

迁移模板：

```bash
# 删除旧的临时工作目录，避免上次执行残留文件影响这次迁移
rm -rf "/tmp/zhcndoc-sparse-<name>"

# 创建新的临时工作目录
mkdir -p "/tmp/zhcndoc-sparse-<name>"

# 进入临时工作目录
cd "/tmp/zhcndoc-sparse-<name>"

# 写入需要保留的根目录路径列表
printf '%s\n' "/docs" "/LICENSE" "/README.md" "/.gitignore" > sparse-paths.txt

# 以 sparse 模式克隆 zhcndoc/<name> 的 main 分支，用来保留当前中文仓库里的 docs-only 内容
git clone --filter=blob:none --sparse --branch main "https://github.com/zhcndoc/<name>.git" current

# 只在 current 工作区展开需要保留的路径
git -C current sparse-checkout set --no-cone --stdin < sparse-paths.txt

# 以浅克隆 + sparse 模式拉取官方上游仓库
git clone --depth=1 --filter=blob:none --sparse --branch "<upstream-branch>" "https://github.com/<owner>/<repo>.git" upstream

# 只在 upstream 工作区展开需要保留的路径
git -C upstream sparse-checkout set --no-cone --stdin < sparse-paths.txt

# 记录上游当前提交 SHA，后续写入同步提交信息
UPSTREAM_SHA=$(git -C upstream rev-parse HEAD)

# 再克隆一份 zhcndoc/<name>，用来重写 upstream 和 main 分支
git clone --filter=blob:none --no-checkout "https://github.com/zhcndoc/<name>.git" rewrite

# 进入重写用的工作区
cd rewrite

# 设置提交用户名为 GitHub Actions bot
git config user.name "github-actions[bot]"

# 设置提交邮箱为 GitHub Actions bot
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

# 创建全新的 orphan upstream 分支，不继承旧的 upstream 历史
git switch --orphan upstream

# 用官方上游的 docs-only 内容覆盖当前工作区
rsync -a --delete --exclude='.git' ../upstream/ ./

# 将所有变更加入暂存区
git add -A

# 按 sparse 路径强制加入被 .gitignore 忽略的文件
sed 's#^/##' ../sparse-paths.txt | git add -f --pathspec-from-file=-

# 提交新的 docs-only upstream 快照
git commit -m "sync upstream <owner>/<repo>@${UPSTREAM_SHA}"

# 强制推送新的 docs-only upstream 分支到 zhcndoc/<name>
git push origin upstream --force

# 基于刚刚生成的 upstream 分支重建 main 分支
git checkout -B main upstream

# 清空 main 分支当前工作区内容
git rm -r --ignore-unmatch . >/dev/null 2>&1 || true

# 清理未跟踪文件，确保工作区完全干净
git clean -fdx

# 把当前中文仓库里保留的 docs-only 内容同步回 main 分支
rsync -a --delete --exclude='.git' ../current/ ./

# 将 main 分支的变更加入暂存区
git add -A

# 按 sparse 路径强制加入被 .gitignore 忽略的文件
sed 's#^/##' ../sparse-paths.txt | git add -f --pathspec-from-file=-

# 如果 main 分支内容有变化，就创建一个重建提交
git diff --cached --quiet || git commit -m "chore: rebuild docs-only main"

# 强制更新远端 main 分支，同时保留 lease 保护
git push origin main --force-with-lease
```

### 新增新的 sparse 仓库

适用场景：

- 新项目还没有迁移到 `zhcndoc/<name>`
- 上游仓库体积过大，不适合做完整镜像

推荐步骤：

1. 先在 `website/content/projects/<name>.yml` 中写好 `upstream.sparse`
2. 初始化 `zhcndoc/<name>` 仓库
3. 先执行一次上面的迁移模板，建立 docs-only 的 `upstream` 和 `main`
4. 再启用 `.github/workflows/sync-upstream.yml` 进行后续自动同步

注意事项：

- `main` 和 `upstream` 都应该使用 docs-only 历史，否则后续 `main...upstream` 的增量比较会失真
- 如果已经迁移到 sparse，就不要删除 `upstream` 分支后重跑 workflow；应优先回退到共同历史上的旧提交
- 如果上游根目录文件会被自己的 `.gitignore` 忽略，迁移脚本和 workflow 都必须保留 `git add -f --pathspec-from-file=-`

## 脚本工具

- `scripts/api-to-csv.mjs` — 将项目 API 数据导出为 CSV
- `scripts/measure.mjs` — 测量项目描述文本宽度
- `scripts/test-desc.mjs` — 测试项目描述字段
- `scripts/clearWorkflowRuns.ts` — 清理 GitHub Actions 工作流运行记录
