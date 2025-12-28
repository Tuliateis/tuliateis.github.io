// 搜索功能
function searchKeyword(tabType) {
    let keyword = '';
    let inputId = '';
    let resultsArea = document.getElementById(`${tabType}-results`);
    
    if (!resultsArea) return;
    
    // 获取搜索关键词
    if (tabType === 'personnel') {
        keyword = document.getElementById('search-name').value.trim();
    } else if (tabType === 'traffic') {
        keyword = document.getElementById('search-plate').value.trim().toUpperCase();
    } else if (tabType === 'cases') {
        keyword = document.getElementById('search-keyword').value.trim();
    } else if (tabType === 'evidence') {
        keyword = document.getElementById('search-evidence').value.trim();
    }
    
    if (!keyword) {
        resultsArea.innerHTML = '<div class="empty-state">请输入搜索条件</div>';
        return;
    }
    
    // 显示搜索中
    resultsArea.innerHTML = '<div class="empty-state">搜索中...</div>';
    
    // 延迟显示结果
    setTimeout(() => {
        let resultHTML = '';
        
        if (tabType === 'personnel') {
            if (keyword === '李林峰' || keyword === '李海') {
                resultHTML = `
                    <div class="evidence-item" onclick="showPersonnelDetail('李林峰')">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看李林峰的基本资料</p>
                    </div>
                `;
            } else if (keyword === '秦数') {
                resultHTML = `
                    <div class="evidence-item" onclick="showPersonnelDetail('秦数')">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看秦数的基本资料</p>
                    </div>
                `;
            } else if (keyword === '李江') {
                resultHTML = `
                    <div class="evidence-item" onclick="showLiJiangDetail()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看李江的基本资料</p>
                    </div>
                `;
            } else if (keyword === '刘建国') {
                resultHTML = `
                    <div class="evidence-item" onclick="showJianGuoDetail()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看刘建国的基本资料</p>
                    </div>
                `;
            } else if (keyword === '赵永贵') {
                resultHTML = `
                    <div class="evidence-item" onclick="showYongGuiDetail()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看赵永贵的基本资料</p>
                    </div>
                `;
            
            } else {
                resultHTML = '<div class="empty-state">未找到相关记录</div>';
            }
        } 
        else if (tabType === 'traffic') {
            if (keyword === 'JC932Q') {
                resultHTML = `
                    <div class="evidence-item" onclick="showPlateDetail()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看车牌号信息</p>
                    </div>
                `;
           
            } else {
                resultHTML = '<div class="empty-state">未找到相关记录</div>';
            }
        }
        else if (tabType === 'cases') {
            if (keyword === '李江失踪' || keyword === '李江失踪案') {
                resultHTML = `
                    <div class="evidence-item" onclick="showMissingCase()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看案件详情</p>
                    </div>
                `;
            } else if (keyword === '加油站杀人' || keyword === '加油站杀人案') {
                resultHTML = `
                    <div class="evidence-item" onclick="showGasMurder()">
                        <h3>查询到一条相关信息</h3>
                        <p>点击查看加油站杀人案详情</p>
                    </div>
                `;
            } else {
                resultHTML = '<div class="empty-state">请输入关键字进行搜索</div>';
            }
        }
        
        resultsArea.innerHTML = resultHTML;
    }, 500);
}

// 显示李林峰详情并触发阶段2对话
function showPersonnelDetail(name) {
    if (name === '李林峰') {
        // 打开页面
        window.open('character2.html', '_blank', 'width=900,height=700');
        
        // 等待3秒后触发阶段2对话
        setTimeout(() => {
            if (dialogueSystem && dialogueSystem.unlockStage2) {
                dialogueSystem.unlockStage2();
            }
        }, 3000);
    } 
    else if (name === '秦数') {
        window.open('character1.html', '_blank', 'width=900,height=700');
    }
}

// 显示李江详情
function showLiJiangDetail() {
    window.open('character3.html', '_blank', 'width=900,height=700');
}
// 显示刘建国详情
function showJianGuoDetail() {
    window.open('character4.html', '_blank', 'width=900,height=700');
}

// 显示赵永贵详情
function showYongGuiDetail() {
    window.open('character5.html', '_blank', 'width=900,height=700');
}

// 显示车牌详情
function showPlateDetail() {
    window.open('JC932Q.html', '_blank', 'width=900,height=700');
}

// 显示失踪案详情并触发阶段3对话
function showMissingCase() {
    // 打开页面
    window.open('incident1.html', '_blank', 'width=900,height=700');
    
    // 等待3秒后触发阶段3对话
    setTimeout(() => {
        if (dialogueSystem && dialogueSystem.unlockStage3) {
            dialogueSystem.unlockStage3();
        }
    }, 3000);
}
// 显示加油站杀人案详情
function showGasMurder() {
    window.open('incident2.html', '_blank', 'width=900,height=700');
}