// 状态
let remainingSearches = 4;
let searchedKeywords = new Set();
let isMemoryCorrected = false;
let correctionScheduled = false;
let countdownInterval = null; // 倒计时定时器
// 在脚本开头部分，状态变量声明后，添加一个变量来标记按钮是否已创建
let endButtonCreated = false;

// 第一阶段记忆数据
const memoryData = {
    "李江": "我的<b>哥哥</b>是李江，我们的关系很好，就是性格很腼腆，总是文静的坐在一边，很少说话，他的成绩很好，<b>爸爸妈妈</b>很疼爱他，总是心疼他<b>眼睛度数</b>的增长，经常为他检查视力。",
    
    "李海": "我是<b>李海</b>，小时候身体不是很好总是生病，但性格比较开朗，我有很多朋友，我的学习也很好，<b>爸爸妈妈</b>很<b>关心</b>我，总说我们两兄弟一定能考上<b>A市</b>最好的大学。",
    
    "秦数": "秦数是我的好兄弟，放学了我们经常<b>假装</b>去操场踢球，实则溜到一边看隔壁舞蹈队编排的新节目，<b>李江</b>肯定不会喜欢这种事情，他的眼里只有读书。",
    
    "爸爸妈妈": "爸爸妈妈对我们一视同仁，从不会<b>区别对待</b>，我和哥哥都很爱他们。所以哥哥不小心之后，爸爸妈妈很难过，即使警局的人来家里采集<b>DNA</b>，他们也会追着询问是否有找到哥哥<b>坠崖</b>的消息。",
    
    "DNA": "警局的叔叔阿姨需要采集家里物品上的残留DNA进行提取入库，这样如果未来有找到可能的线索就可以第一时间进行匹配，想到这，我主动去拿了<b>哥哥的牙杯和毛巾</b>交给警官，希望哥哥能<b>平安无事</b>。",
    
    "坠崖": "<b>哥哥</b>坠崖当时，同学和老师<b>认出</b>我，赶来后再找救援也为时已晚，事情发生之后，我们都很受打击，爸爸妈妈看我状态不好，决定离开A市，搬到B市生活。和过去的一切都彻底断联，换了环境，我的状态好多了，只是新的学校新的学习环境也不能医治一切，我的成绩变得<b>平平无奇</b>，最后勉强考上一个B市的大学，在爸爸妈妈和老师的建议下，我选择了会计专业。"
};

// 第二阶段记忆数据
const memoryData2 = {
    "李江": "<i>我是</i>李江，我们的关系很<i><b>差</b></i>，<i>我的</i>性格很腼腆，总是文静的坐在一边，很少说话，<b>我的</b>成绩很好，爸爸妈妈<i>不</i>爱我，总是<i><b>埋怨我</b></i>眼睛度数的增长，经常为他检查视力。",
    
    "李海": "<i>我的弟弟</i>是<b>李海</b>，小时候身体不是很好总是生病，但性格比较开朗，<i>他</i>有很多朋友，<i>他</i>的学习也很好，爸爸妈妈很关心<i>他</i>，总说我们两兄弟一定能考上A市最好的大学。",
    
    "秦数": "秦数是<i>他的</i>好兄弟，放学了他们经常去操场<i>踢球</i>，<i>我并不在意他们去做什么，我只想成绩更好，起码要比李海好</i>。",
    
    "爸爸妈妈": "<i><i><b>爸爸妈妈对我们并<b>不</b>一视同仁</b></i></i>，<span class='memory-blur'>■■■</span>区别对待，<b>我和<i><b>弟弟</b></i>都很爱他们</b>。所以<i><b>弟弟</b></i>不小心坠崖之后，<b>爸爸妈妈很难过</b>，即使警局的人来家里采集DNA，<b>他们也会追着询问是否有找到<i><b>弟弟</b></i>的消息</b>。",
    
    "DNA": "警局的叔叔阿姨需要采集家里物品上的残留DNA进行提取入库，这样如果未来有找到可能的线索就可以第一时间进行匹配，想到这，我主动去拿了<i>弟弟</i>的牙杯和毛巾交给警官，希望<i>弟弟</i><i><b>不要回来</b></i>。",
    
    "坠崖": "<i>弟弟</i>坠崖当时，<i><b>我的眼镜在坠崖的时候随着一起掉落</b></i>，同学和老师<i><b>认错</b></i>我，赶来后再找救援也为时已晚，事情发生之后，我们都很受打击，爸爸妈妈看我状态不好，决定离开A市，搬到B市生活。和过去的一切都彻底断联，换了环境，我的状态好多了，只是新的学校新的学习环境也不能医治一切，<i><b>失去眼镜我并不敢声张，学习不再顺利</b></i>，我的成绩变得平平无奇，最后勉强考上一个B市的大学，在爸爸妈妈和老师的建议下，我选择了会计专业。"
};

// 会降低理智的关键词
const sanityDecreaseKeywords = ["李海", "爸爸妈妈", "DNA", "坠崖"];

// 初始化
function init() {
    updateProgress();
    document.body.className = 'darkness-0';
    addBackgroundGlitch();
    
    // 确保重置消息是隐藏的
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.classList.remove('show');
    resetMessage.style.opacity = '0';
    resetMessage.style.display = 'none';
}

// 添加背景glitch效果
function addBackgroundGlitch() {
    setInterval(() => {
        if (!isMemoryCorrected && Math.random() > 0.7) {
            const glitch = document.createElement('div');
            glitch.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, rgba(255, 0, 0, 0.1), transparent);
                z-index: 1;
                pointer-events: none;
                animation: glitchEffect 0.3s linear;
            `;
            document.body.appendChild(glitch);
            setTimeout(() => glitch.remove(), 300);
        }
    }, 3000);
}

// 处理键盘事件
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchMemory();
    }
}

// 搜索记忆
function searchMemory() {
    const input = document.getElementById('searchInput');
    const keyword = input.value.trim();
    const resultContent = document.getElementById('resultContent');
    
    if (!keyword) {
        resultContent.innerHTML = '<span class="typing-effect">请输入搜索关键词</span>';
        return;
    }
    
    const currentMemoryData = isMemoryCorrected ? memoryData2 : memoryData;
    
    if (currentMemoryData[keyword]) {
        // 检查是否是降低理智的关键词
        const isSanityDecreaseKeyword = sanityDecreaseKeywords.includes(keyword);
        
        // 如果是新的降低理智的关键词，并且理智值大于0
        if (isSanityDecreaseKeyword && !searchedKeywords.has(keyword) && remainingSearches > 0) {
            // 减少理智值
            remainingSearches--;
            searchedKeywords.add(keyword);
            
            // 更新进度和背景
            updateProgress();
            updateBackground();
            
            // 添加搜索特效
            addSearchEffect();
            
            // 闪白效果
            triggerFlash();
        } else if (!searchedKeywords.has(keyword)) {
            // 非理智关键词，只添加到已搜索集合
            searchedKeywords.add(keyword);
            addSubtleEffect(); // 轻微特效
        } else {
            // 旧关键词搜索时的轻微特效
            addSubtleEffect();
        }
        
        // 显示记忆（无论是否搜索过都显示）
        resultContent.innerHTML = currentMemoryData[keyword];
        
        // 如果搜索了全部4个降低理智的关键词，并且还没有触发记忆修正，延时8秒触发
        if (searchedKeywords.size >= 4 && !isMemoryCorrected && !correctionScheduled) {
            // 检查是否所有降低理智的关键词都搜索过了
            const allSanityKeywordsSearched = sanityDecreaseKeywords.every(key => searchedKeywords.has(key));
            
            if (allSanityKeywordsSearched) {
                correctionScheduled = true;
                
                // 开始倒计时
                startCountdown();
            }
        }
        
    } else {
        resultContent.innerHTML = '<span style="color:#ff6b6b;text-shadow:0 0 5px #ff0000;">未找到相关记忆碎片，请尝试其他关键词。</span>';
    }
    
    input.value = '';
}

// 开始倒计时
function startCountdown() {
    const resultContent = document.getElementById('resultContent');
    let countdown = 3;
    
    // 显示初始倒计时
    resultContent.innerHTML += '<br><br><span id="countdown" style="color:#ff6666;font-size:16px;font-style:italic;">记忆正在重构... 3秒后修正</span>';
    
    // 更新倒计时显示
    countdownInterval = setInterval(() => {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdown--;
            if (countdown > 0) {
                countdownElement.textContent = `记忆正在重构... ${countdown}秒后修正`;
            } else {
                clearInterval(countdownInterval);
                countdownElement.textContent = '记忆正在重构... 修正中';
                
                // 触发记忆修正
                setTimeout(() => {
                    triggerMemoryCorrection();
                }, 1000);
            }
        }
    }, 1000);
}

// 搜索特效
function addSearchEffect() {
    const container = document.querySelector('.result-container');
    const glitch = document.createElement('div');
    glitch.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(255, 0, 0, 0.2), transparent);
        animation: searchGlitch 0.5s linear;
        pointer-events: none;
        border-radius: 10px;
    `;
    container.appendChild(glitch);
    setTimeout(() => glitch.remove(), 500);
}

// 轻微特效
function addSubtleEffect() {
    const container = document.querySelector('.result-container');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'subtleShake 0.3s linear';
    }, 10);
    setTimeout(() => {
        container.style.animation = '';
    }, 300);
}

// 更新进度条
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = (remainingSearches / 4) * 100;
    progressFill.style.height = progressPercentage + '%';
}

// 更新背景颜色
function updateBackground() {
    if (isMemoryCorrected) {
        document.body.className = 'darkness-4';
    } else {
        const darknessLevel = 4 - remainingSearches;
        document.body.className = `darkness-${darknessLevel}`;
    }
}

// 闪白效果
function triggerFlash() {
    const flashOverlay = document.getElementById('flashOverlay');
    flashOverlay.classList.remove('active');
    void flashOverlay.offsetWidth;
    flashOverlay.classList.add('active');
}

// 触发记忆修正
function triggerMemoryCorrection() {
    isMemoryCorrected = true;
    correctionScheduled = false;
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    // 更新背景为黑色
    updateBackground();
    
    // 显示重置消息
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.style.display = 'block';
    resetMessage.style.fontSize = '28px';
    resetMessage.classList.remove('show');
    void resetMessage.offsetWidth;
    resetMessage.classList.add('show');
    
    // 添加恐怖修正效果
    addCorrectionEffects();
    
    // 清除搜索结果
    setTimeout(() => {
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = '<span class="typing-effect" style="color:#ff6666;">记忆已修正，请输入关键词重新搜索...</span>';
        
        // 隐藏重置消息
        setTimeout(() => {
            resetMessage.classList.remove('show');
            setTimeout(() => {
                resetMessage.style.display = 'none';
            }, 1000);
            
            // 10秒后显示结束按钮
            setTimeout(addEndButton, 10000);
            
        }, 3000);
    }, 1000);
}

// 替换原来的 addEndButton 函数
function addEndButton() {
    if (!endButtonCreated) {
        endButtonCreated = true;
        
        // 创建结束按钮容器，使用fixed定位使其始终在底部
        const endButtonContainer = document.createElement('div');
        endButtonContainer.id = 'endButtonContainer';
        endButtonContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            text-align: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        // 创建按钮元素
        const endButton = document.createElement('button');
        endButton.id = 'endButton';
        endButton.innerHTML = '查看结束，感谢游玩';
        endButton.style.cssText = `
            padding: 12px 30px;
            background: linear-gradient(45deg, #8b0000, #660000);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
            z-index: 1;
            display: block;
            margin: 0 auto;
        `;

        // 添加按钮悬停效果
        endButton.addEventListener('mouseover', function() {
            this.style.background = 'linear-gradient(45deg, #660000, #440000)';
            this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
        });
        
        endButton.addEventListener('mouseout', function() {
            this.style.background = 'linear-gradient(45deg, #8b0000, #660000)';
            this.style.boxShadow = 'none';
        });

        // 添加按钮点击事件
        endButton.addEventListener('click', function() {
            // 跳转到prework.html
            window.location.href = 'index.html';
        });

        // 将按钮添加到容器
        endButtonContainer.appendChild(endButton);
        // 将容器添加到页面body
        document.body.appendChild(endButtonContainer);
        
        // 延迟显示按钮（淡入效果）
        setTimeout(() => {
            endButtonContainer.style.opacity = '1';
        }, 100);
    }
}

// 修正时的恐怖特效
function addCorrectionEffects() {
    // 多次闪白
    for (let i = 0; i < 5; i++) {
        setTimeout(() => triggerFlash(), i * 1000);
    }
    
    // 文字扭曲特效
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (el.id !== 'resetMessage' && el.id !== 'flashOverlay') {
            el.style.animation = 'textDistort 0.1s linear';
            setTimeout(() => {
                el.style.animation = '';
            }, 1000);
        }
    });
    
    // 添加额外的glitch效果
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const glitch = document.createElement('div');
            glitch.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, 
                    ${i % 2 === 0 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)'}, 
                    transparent);
                z-index: 9999;
                pointer-events: none;
                animation: glitchEffect 0.2s linear;
            `;
            document.body.appendChild(glitch);
            setTimeout(() => glitch.remove(), 200);
        }, i * 300);
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', init);

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes glitchEffect {
        0% { transform: translateX(-5px) skewX(-5deg); opacity: 0.3; }
        50% { transform: translateX(5px) skewX(5deg); opacity: 0.5; }
        100% { transform: translateX(0) skewX(0); opacity: 0; }
    }
    
    @keyframes searchGlitch {
        0% { 
            opacity: 0.5; 
            transform: translateX(5px) skewX(-3deg);
            background: linear-gradient(45deg, transparent, rgba(255, 0, 0, 0.3), transparent);
        }
        50% { 
            opacity: 0.8; 
            transform: translateX(-5px) skewX(3deg);
            background: linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.5), transparent);
        }
        100% { 
            opacity: 0; 
            transform: translateX(0) skewX(0);
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }
    }
    
    @keyframes subtleShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-1px); }
        50% { transform: translateX(1px); }
        75% { transform: translateX(-1px); }
    }
`;

document.head.appendChild(style);
