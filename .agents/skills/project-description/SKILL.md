---
name: project-description
description: 将 `content/projects/*.yml` 中的 `description` 字段保持在约 400px，避免禁用词，并使用简洁且准确的一句项目描述。
---

# 项目描述文案规范

新增或修改 `content/projects/*.yml` 文件中的 `description` 字段时，必须遵守以下规范。

## 宽度目标

描述文案的渲染宽度需控制在 **400px ± 5px** 范围内。

使用 `scripts/measure.mjs` 脚本检测所有项目描述的宽度；使用 `scripts/test-desc.mjs` 脚本检测单条描述的宽度：

```bash
# 检测所有项目描述宽度
node scripts/measure.mjs

# 检测单条描述宽度
node scripts/test-desc.mjs "描述文案内容"
```

度量基于 `@chenglou/pretext` 库，字体为 `14px ui-sans-serif, system-ui, sans-serif`。

## 内容要求

1. **介绍项目本身**，而非介绍翻译/镜像后的中文内容。
2. **禁用词**：描述中不得出现 `官方`、`文档`、`资料`、`站点` 等词汇。
3. 使用一句完整的中文句子，以句号结尾。
4. 准确描述项目的核心功能和定位。

## 宽度调节技巧

- 一个中文汉字约 **14px**，一个 ASCII 字母约 **7-8px**。
- 400px 大约相当于 **25-29 个中文字符**（含标点），或等量的中英文混合内容。
- 调整宽度时优先增减修饰词（如"高效"、"灵活"、"的"等），避免改变核心语义。
- 由于中文字符宽度固定约 14px，部分描述可能只能达到 ±6-8px，这属于可接受范围。

## 验证流程

1. 编写或修改描述文案。
2. 运行 `node scripts/test-desc.mjs "文案内容"` 验证宽度。
3. 若不在 ±5px 范围内，调整措辞后重新验证。
4. 最终运行 `node scripts/measure.mjs` 确认所有项目均在范围内。

## 示例

```yaml
# ✓ 好的描述 (400.29px, delta: +0)
description: 轻量级 HTTP 处理框架，适用于 Nitro，提供高效 API 开发能力。

# ✗ 坏的描述 - 包含禁用词"官方"和"文档"
description: 官方 Nuxt 文档，提供详细的框架指南和 API 参考。

# ✗ 坏的描述 - 宽度偏差过大 (274px, delta: -126)
description: 官方 Nuxt 示例，展示最佳实践和项目模板。
```
