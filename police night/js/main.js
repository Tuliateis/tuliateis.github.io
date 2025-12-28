// 主应用入口
async function initApp() {
    console.log('初始化应用...');
    
    try {
        // 1. 加载登录界面
        console.log('加载登录界面...');
        const loginResponse = await fetch('partials/login.html');
        const loginHTML = await loginResponse.text();
        document.getElementById('login-container').innerHTML = loginHTML;
        
        // 2. 加载系统界面
        console.log('加载系统界面...');
        const systemResponse = await fetch('partials/system.html');
        const systemHTML = await systemResponse.text();
        document.getElementById('system-container').innerHTML = systemHTML;
        
        // 初始隐藏系统界面
        document.getElementById('system-container').style.display = 'none';
        
        // 3. 初始化登录功能
        console.log('初始化登录...');
        if (typeof initLogin === 'function') {
            initLogin();
        }
        
        console.log('应用初始化完成');
    } catch (error) {
        console.error('应用初始化失败:', error);
        alert('页面加载失败，请刷新重试');
    }
}

// 全局工具函数
async function loadHTML(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            return true;
        }
        return false;
    } catch (error) {
        console.error(`加载 ${url} 失败:`, error);
        return false;
    }
}