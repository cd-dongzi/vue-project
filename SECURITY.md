# Security Policy

## Supported code

安全修复仅面向默认分支 `master`。仓库没有正式版本发布，历史在线演示和 Fork 不在维护范围内。

本项目使用较旧的 Vue 2 和 Webpack 3 依赖，目前正在进行安全现代化。它是教学项目，不应被视为生产级身份认证或敏感数据处理系统。

## Reporting a vulnerability

请不要为未公开漏洞创建公开 Issue。请使用 GitHub 的 **Security → Report a vulnerability** 私下提交报告：

https://github.com/cd-dongzi/vue-project/security/advisories/new

报告请尽量包含：

- 受影响的文件、依赖或提交；
- 可复现步骤或最小验证代码；
- 实际影响和所需攻击条件；
- 已测试的 Node.js、浏览器和操作系统版本；
- 如有建议修复，请说明兼容性影响。

请勿在未经许可的情况下访问、修改或删除他人数据，也不要对历史演示服务进行破坏性测试。维护者确认并验证问题后，会协调修复和披露时间；本项目暂不承诺固定响应 SLA。

## Security-sensitive areas

审查时请特别关注：

- npm 安装脚本和传递依赖的供应链风险；
- Axios 外部请求、跨域凭证和新增网络域名；
- Cookie、localStorage 和 sessionStorage 中的数据；
- 模板渲染、动态 URL、图片和视频来源引发的 XSS 或隐私风险；
- Webpack/Node 构建脚本的文件系统读写和删除范围；
- 第三方或 AI 生成贡献中的隐藏行为、虚构内容和凭证泄露。
