# AccountingGPTmom

AccountingGPTmom 是一个基于 React Native 的移动应用项目。

## 环境设置

在开始之前，请确保您的开发环境满足以下要求。

### 先决条件

- Node.js（推荐版本 v18.18.2）
- npm（推荐版本 10.2.3）
- React Native CLI
- Android Studio（包含 Android SDK）
- 对于 macOS 用户：Xcode

### 推荐版本

本项目建议使用以下版本：

- React: 18.2.0
- React Native: 0.72.6
- Node.js: v18.18.2
- npm: 10.2.3

### 安装步骤

#### Windows

1. **安装 Node.js 和 npm**：
   - 访问 [Node.js 官网](https://nodejs.org/) 并下载安装推荐版本的 Node.js，这将同时安装 npm。

2. **安装 React Native CLI**：
   - 在命令行中运行以下命令来安装 React Native CLI：
     ```sh
     npm install -g react-native-cli
     ```

3. **安装 Android Studio**：
   - 访问 [Android Studio 官网](https://developer.android.com/studio) 并下载安装。
   - 在安装过程中，确保包含了 Android SDK 和 Android Studio 默认的 SDK 工具。
   - 设置环境变量 `ANDROID_HOME` 指向您的 Android SDK 位置，并将 Android SDK 的 `platform-tools` 目录添加到系统路径中。

#### macOS

1. **安装 Homebrew**：
   - 在终端运行以下命令安装 Homebrew（macOS 的包管理器）：
     ```sh
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - 完成后，按照终端中的说明添加 Homebrew 到您的 PATH。

2. **通过 Homebrew 安装 Node.js 和 npm**：
   - 运行以下命令：
     ```sh
     brew install node
     ```
   - 这将同时安装 Node.js 和 npm。

3. **安装 React Native CLI**：
   - 在终端中运行：
     ```sh
     npm install -g react-native-cli
     ```

4. **安装 Xcode**（用于 iOS 开发）：
   - 通过 Mac App Store 安装 Xcode。
   - 安装完成后，运行 Xcode 并同意许可协议。
   - 在 Xcode 的 "Preferences" > "Locations" 中，确保 Command Line Tools 设置正确。

5. **安装 Android Studio**：
   - 访问 [Android Studio 官网](https://developer.android.com/studio) 并下载安装。
   - 在安装过程中，选择 "Android Studio" 默认的 SDK 工具和必要的 SDK 平台。
   - 设置环境变量 `ANDROID_HOME` 指向您的 Android SDK 位置。您可以在终端中加入以下行到 `~/.bash_profile` 或 `~/.zshrc`：
     ```sh
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/tools/bin
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```
   - 执行 `source ~/.bash_profile` 或 `source ~/.zshrc` 来使更改生效。

## 项目设置

1. **克隆仓库**：
   - 在命令行中运行以下命令来克隆项目：
     ```sh
     git clone https://github.com/your-username/AccountingGPTmom.git
     ```
   - 替换 `your-username` 为您的 GitHub 用户名。

2. **安装项目依赖**：
   - 进入项目目录：
     ```sh
     cd AccountingGPTmom
     ```
   - 运行以下命令安装依赖：
     ```sh
     npm install
     ```

## 运行应用

1. **启动 Android 模拟器**（Windows 和 macOS）：
   - 通过 Android Studio 启动您的模拟器。

2. **运行 React Native 应用**：
   - 在项目根目录下运行以下命令：
     ```sh
     npx react-native run-android
     ```

3. **运行 iOS 应用**（仅限 macOS）：
   - 在项目根目录下运行以下命令：
     ```sh
     npx react-native run-ios
     ```


