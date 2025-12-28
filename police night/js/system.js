// 主系统功能
function initSystem() {
    console.log('初始化主系统...');
    
    // 初始化左侧菜单
    initNavigation();
    
    // 初始化右侧标签
    initRightTabs();
    
    // 初始化搜索功能
    initSearch();
    
    console.log('主系统初始化完成');
}

// 初始化导航菜单
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContent = document.getElementById('tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮激活状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新标签页内容
            updateTabContent(tabId);
        });
    });
}

// 更新标签页内容
function updateTabContent(tabId) {
    const tabContent = document.getElementById('tab-content');
    
    // 根据标签ID生成不同的内容
    let content = '';
    
    switch(tabId) {
        case 'personnel':
            content = `
                <div class="tab-pane active" id="personnel-tab">
                    <h2 class="tab-title">人员资料管理</h2>
                    <div class="search-section">
                        <div class="search-box">
                            <label>姓名</label>
                            <input type="text" id="search-name" placeholder="请输入姓名">
                            <button id="search-personnel" class="search-btn">搜索</button>
                        </div>
                    </div>
                    <div class="results-section">
                        <div id="personnel-results" class="results-container">
                            <div class="empty-state">请输入姓名进行搜索</div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'traffic':
            content = `
                <div class="tab-pane active" id="traffic-tab">
                    <h2 class="tab-title">交通信息管理</h2>
                    <div class="search-section">
                        <div class="search-box">
                            <label>车牌号</label>
                            <input type="text" id="search-plate" placeholder="请输入车牌号">
                            <button id="search-traffic" class="search-btn">搜索</button>
                        </div>
                    </div>
                    <div class="results-section">
                        <div id="traffic-results" class="results-container">
                            <div class="empty-state">请输入车牌号进行搜索</div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'cases':
            content = `
                <div class="tab-pane active" id="cases-tab">
                    <h2 class="tab-title">过往案件资料管理</h2>
                    <div class="search-section">
                        <div class="search-box">
                            <label>关键字</label>
                            <input type="text" id="search-keyword" placeholder="请输入关键字">
                            <button id="search-cases" class="search-btn">搜索</button>
                        </div>
                    </div>
                    <div class="results-section">
                        <div id="cases-results" class="results-container">
                            <div class="empty-state">请输入关键字进行搜索</div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    tabContent.innerHTML = content;
    
    // 重新绑定搜索事件
    initSearch();
}

// 初始化右侧标签
function initRightTabs() {
    const tabButtons = document.querySelectorAll('.right-tab-btn');
    const tabContents = document.querySelectorAll('.right-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-right-tab');
            
            // 更新按钮激活状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的内容
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + '-tab') {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 初始化搜索功能
function initSearch() {
    // 人员搜索
    const personnelBtn = document.getElementById('search-personnel');
    if (personnelBtn) {
        personnelBtn.onclick = () => searchKeyword('personnel');
    }
    
    const nameInput = document.getElementById('search-name');
    if (nameInput) {
        nameInput.onkeypress = (e) => {
            if (e.key === 'Enter') searchKeyword('personnel');
        };
    }
    
    // 交通搜索
    const trafficBtn = document.getElementById('search-traffic');
    if (trafficBtn) {
        trafficBtn.onclick = () => searchKeyword('traffic');
    }
    
    const plateInput = document.getElementById('search-plate');
    if (plateInput) {
        plateInput.onkeypress = (e) => {
            if (e.key === 'Enter') searchKeyword('traffic');
        };
    }
    
    // 案件搜索
    const casesBtn = document.getElementById('search-cases');
    if (casesBtn) {
        casesBtn.onclick = () => searchKeyword('cases');
    }
    
    const keywordInput = document.getElementById('search-keyword');
    if (keywordInput) {
        keywordInput.onkeypress = (e) => {
            if (e.key === 'Enter') searchKeyword('cases');
        };
    }
}

// 显示行车记录仪详情
// 显示行车记录仪详情
function showMemoryCard() {
    // 在新窗口打开行车记录仪页面
    const newWindow = window.open('memorycard.html', '_blank', 'width=900,height=700');
    
    // 解锁对话阶段1
    setTimeout(() => {
        if (dialogueSystem && dialogueSystem.unlockStage1) {
            dialogueSystem.unlockStage1();
        }
    }, 1000);
}
// 打开背包物品
function openBackpackItems() {
    const evidenceList = document.getElementById('evidence-list');
    if (!evidenceList) return;
    
    // 找到背包元素
    const backpackItem = document.querySelector('.evidence-item:nth-child(2)');
    if (!backpackItem) return;
    
    // 隐藏背包
    backpackItem.style.display = 'none';
    
    // 添加三个新物品
    const newItems = `
        <div class="evidence-item" onclick="showPhone()">
            <h3>老旧的手机</h3>
            <p>一部黑色智能手机，屏幕碎裂但不影响使用</p>
            <span class="evidence-time">点击查看详情</span>
        </div>
        <div class="evidence-item" onclick="showYGPhone()">
            <h3>高档手机</h3>
            <p>一部白色智能手机，看上去是最新的型号，但屏幕也碎了</p>
            <span class="evidence-time">点击查看详情</span>
        </div>

        <div class="evidence-item" onclick="showWallet()">
            <h3>摩托车车主的钱包</h3>
            <p>棕色皮革钱包，内含身份证、银行卡等物品</p>
            <span class="evidence-time">点击查看详情</span>
        </div>
        <div class="evidence-item" onclick="showBag()">
            <h3>一个沉甸甸的小包裹</h3>
            <p>用黑色塑料袋包裹的物品，手感沉重</p>
            <span class="evidence-time">点击查看详情</span>
        </div>
    `;
    
    // 在背包后面插入新物品
    backpackItem.insertAdjacentHTML('afterend', newItems);
}

// 显示老旧的手机详情
function showPhone() {
    window.open('phone.html', '_blank', 'width=900,height=700');
}
// 显示高档手机详情
function showYGPhone() {
    window.open('YGphone.html', '_blank', 'width=900,height=700');
}

// 显示钱包详情
function showWallet() {
    window.open('wallet.html', '_blank', 'width=900,height=700');
}

// 显示包裹详情
function showBag() {
    window.open('bag.html', '_blank', 'width=900,height=700');
}
