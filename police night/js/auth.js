// 登录功能
const CORRECT_USERNAME = '秦数';
const CORRECT_PASSWORD = '0032981';

function initLogin() {
    console.log('初始化登录功能...');
    
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('login-error');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (!loginBtn || !usernameInput || !passwordInput) {
        console.error('登录元素未找到');
        setTimeout(initLogin, 100);
        return;
    }
    
    // 登录按钮点击事件
    loginBtn.addEventListener('click', handleLogin);
    
    // 回车键登录
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // 登录处理函数
    function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log('尝试登录:', username);
        
        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            // 登录成功
            console.log('登录成功！');
            
            // 隐藏登录界面
            loginScreen.style.display = 'none';
            
            // 显示主系统界面
            mainScreen.style.display = 'flex';
            
            // 初始化系统功能
            setTimeout(() => {
                if (typeof initSystem === 'function') {
                    initSystem();
                }
                
                // 初始化对话系统
                if (typeof initDialogue === 'function') {
                    setTimeout(() => {
                        initDialogue();
                    }, 300);
                }
            }, 100);
            
        } else {
            // 登录失败
            console.log('登录失败');
            if (errorMessage) {
                errorMessage.textContent = '用户名或密码错误';
                errorMessage.style.color = '#f5222d';
            }
            
            // 清空密码
            passwordInput.value = '';
            usernameInput.focus();
        }
    }
    
    // 自动聚焦
    usernameInput.focus();
}