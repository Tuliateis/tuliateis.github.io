// 对话系统 - 状态控制版本
let dialogueSystem = {
    // 对话数据库
    dialogues: {
        // 阶段1：行车记录仪触发后的询问
        stage1: [
            { 
                sender: '秦警官', 
                message: '你叫什么名字', 
                type: 'police'
            },
            { 
                sender: '轿车司机', 
                message: '我叫李林峰', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '...英宏山的盘山路不太好走，为什么凌晨开车去那里', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '..嗯，我是B市人，来A市是有些事要处理，处理完了我想赶紧赶回去，所以就走了夜路', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '摩托车驾驶员你认识吗？以前是否见过？', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '不认识，完全没见过。就是突然冲出来，我也吓坏了。', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '...行，你先稍等一下', 
                type: 'police'
            }
        ],
        
        // 阶段2：查看李林峰个人信息后的询问
        stage2: [
            { 
                sender: '秦警官', 
                message: '...你之前叫李海?是不是在A市横江路小学上过学？', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '你...你怎么知道？', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '嘿！是我，秦数，你忘了？', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '秦数？是那个我...是我的小学同学吗', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '什么同学，生分成这样了，那时候咱俩是穿一条裤子的兄弟，你一声不吭地转学走了，我哭得眼睛都肿了被笑话了好几天，哎对了，你为什么转学啊', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '...啊，是你啊，我想起来了，你总是放学来找我踢球的，我...我家里发生了些事，爸妈带着我去了B市生活...', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '逗死了哪里是踢球，每次都抱着球坐在操场边上看旁边舞蹈队的女孩排节目，都把你哥撇下不管...你哥他....对不起我说错话了', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '......没事，都过去这么多年了', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '（说起来李江当时没找到尸体，应该一直被定为失踪状态的...）', 
                type: 'police'
            }
        ],
        
        // 阶段3：查看李江失踪案后的询问
        stage3: [
            { 
                sender: '秦警官', 
                message: '说起来，都这么多年了，你哥找到了吗', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '...嗯，其实我这次来A市就是为了处理我哥的事，那边的警局通知我们在岐山附近的工地找到了尸骨，经过DNA比对确认了', 
                type: 'driver'
            },
            { 
                sender: '秦警官', 
                message: '？！这...怎么不多留几天？', 
                type: 'police'
            },
            { 
                sender: '李林峰', 
                message: '...我爸妈也来了，后面的事交给他们了，我...我还有事，就打算先回去', 
                type: 'driver'
            }
        ],
        
        // 阶段4：查看小包裹后的询问
        stage4: [
            { 
                sender: '秦警官', 
                message: '我们在现场发现了一些银块，这和你有关吗？', 
                type: 'police'
            },
            { 
                sender: '轿车司机', 
                message: '我不知道你在说什么...', 
                type: 'driver'
            }
        ]
    },
    
    // 当前状态
    currentStage: 0, // 0: 未开始, 1: 阶段1, 2: 阶段2, 3: 阶段3, 4: 阶段4
    currentIndex: 0,
    isTyping: false,
    isLocked: true, // 初始锁定状态
    typingTimer: null,
    
    // 初始化
    init: function() {
        console.log('初始化对话系统...');
        
        this.dialogueContent = document.getElementById('dialogue-content');
        if (!this.dialogueContent) {
            console.error('对话内容元素未找到');
            return false;
        }
        
        // 设置固定高度
        this.setDialogueHeight();
        window.addEventListener('resize', () => this.setDialogueHeight());
        
        // 初始状态：显示提示
        this.showInitialPrompt();
        
        return true;
    },
    
    setDialogueHeight: function() {
        if (!this.dialogueContent) return;
        const availableHeight = window.innerHeight - 60 - 50;
        this.dialogueContent.style.height = availableHeight + 'px';
        this.dialogueContent.style.maxHeight = availableHeight + 'px';
    },
    
    // 显示初始提示
    showInitialPrompt: function() {
        this.dialogueContent.innerHTML = '';
        
        const promptDiv = document.createElement('div');
        promptDiv.className = 'dialogue-prompt';
        promptDiv.innerHTML = `
            <div class="prompt-content">
                <div class="prompt-icon">🔍</div>
                <h3>请先查看行车记录</h3>
                <p>点击右侧"证物收集"中的行车记录仪存储卡</p>
            </div>
        `;
        
        this.dialogueContent.appendChild(promptDiv);
    },
    
    // 解锁对话并开始阶段1
    unlockStage1: function() {
        if (this.currentStage !== 0) return; // 只允许从初始状态解锁
        
        console.log('解锁对话阶段1');
        this.currentStage = 1;
        this.currentIndex = 0;
        this.isLocked = false;
        
        // 清空提示
        this.dialogueContent.innerHTML = '';
        
        // 等待5秒后开始对话
        setTimeout(() => {
            this.startStage(1);
        }, 3000);
    },
    
    // 解锁阶段2
    unlockStage2: function() {
        if (this.currentStage !== 1) {
            console.log('无法解锁阶段2：需要先完成阶段1');
            return;
        }
        
        console.log('解锁对话阶段2');
        this.currentStage = 2;
        this.currentIndex = 0;
        this.isLocked = false;
        
        this.startStage(2);
    },
    
    // 解锁阶段3
    unlockStage3: function() {
        if (this.currentStage !== 2) return; // 必须先完成阶段2
        
        console.log('解锁对话阶段3');
        this.currentStage = 3;
        this.currentIndex = 0;
        this.isLocked = false;
        
        this.startStage(3);
    },
    
    // 解锁阶段4
    unlockStage4: function() {
        if (this.currentStage !== 3) return; // 必须先完成阶段3
        
        console.log('解锁对话阶段4');
        this.currentStage = 4;
        this.currentIndex = 0;
        this.isLocked = false;
        
        this.startStage(4);
    },
    
    // 开始指定阶段的对话
    startStage: function(stage) {
        const stageKey = 'stage' + stage;
        if (!this.dialogues[stageKey]) return;
        
        this.currentIndex = 0;
        this.showNextMessage(stageKey);
    },
    
    // 显示下一条消息
    showNextMessage: function(stageKey) {
        if (this.isLocked) return;
        
        const dialogues = this.dialogues[stageKey];
        if (this.currentIndex >= dialogues.length) {
            // 阶段完成，锁定对话
            this.isLocked = true;
            console.log(`阶段${this.currentStage}完成，对话锁定`);
            
            // 添加完成提示
            setTimeout(() => {
                this.showStageCompleteHint();
            }, 1000);
            return;
        }
        
        const dialogue = dialogues[this.currentIndex];
        
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${dialogue.type}`;
        messageDiv.innerHTML = `
            <div class="message-header">${dialogue.sender}</div>
            <div class="message-content"></div>
        `;
        
        this.dialogueContent.appendChild(messageDiv);
        this.scrollToBottom();
        
        // 显示打字效果
        this.typeText(dialogue.message, messageDiv);
        this.currentIndex++;
    },
    
    // 打字效果
    typeText: function(text, element) {
        const messageContent = element.querySelector('.message-content');
        let i = 0;
        
        this.isTyping = true;
        
        const type = () => {
            if (i < text.length) {
                messageContent.textContent += text.charAt(i);
                i++;
                this.scrollToBottom();
                this.typingTimer = setTimeout(type, 30);
            } else {
                this.isTyping = false;
                element.classList.remove('typing');
                this.typingTimer = null;
                
                // 自动显示下一条消息
                setTimeout(() => {
                    this.showNextMessage('stage' + this.currentStage);
                }, 1000);
            }
        };
        
        // 清除可能存在的旧计时器
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        
        element.classList.add('typing');
        this.typingTimer = setTimeout(type, 100);
    },
    
    // 跳过当前打字
    skipTyping: function() {
        if (!this.isTyping || this.isLocked) return;
        
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
            this.typingTimer = null;
        }
        
        const lastMessage = this.dialogueContent.lastChild;
        if (lastMessage) {
            const messageContent = lastMessage.querySelector('.message-content');
            if (messageContent) {
                const stageKey = 'stage' + this.currentStage;
                const currentDialogue = this.dialogues[stageKey][this.currentIndex - 1];
                messageContent.textContent = currentDialogue.message;
                lastMessage.classList.remove('typing');
                this.isTyping = false;
                this.scrollToBottom();
                
                // 立即显示下一条
                setTimeout(() => {
                    this.showNextMessage(stageKey);
                }, 300);
            }
        }
    },
    
    // 显示阶段完成提示
    showStageCompleteHint: function() {
        const hintDiv = document.createElement('div');
        hintDiv.className = 'stage-hint';
        
        let hintText = '';
        
        switch(this.currentStage) {
            case 1:
                hintText = '询问暂时结束，请继续查看其他线索';
                break;
            case 2:
                hintText = '询问暂时结束，请继续查看其他线索';
            
                break;
            case 3:
                hintText = '询问暂时结束，请继续查看其他线索';
                break;
            case 4:
                hintText = '询问暂时结束，请继续查看其他线索';
                break;
        }
        
        if (hintText) {
            hintDiv.innerHTML = `
                <div class="hint-content">
                    <p>🔍 ${hintText}</p>
                </div>
            `;
            this.dialogueContent.appendChild(hintDiv);
            this.scrollToBottom();
        }
    },
    
    // 滚动到底部
    scrollToBottom: function() {
        if (this.dialogueContent) {
            setTimeout(() => {
                this.dialogueContent.scrollTop = this.dialogueContent.scrollHeight;
            }, 10);
        }
    }
};

// 初始化对话
function initDialogue() {
    return dialogueSystem.init();
}

// 全局点击对话区域跳过打字
document.addEventListener('DOMContentLoaded', function() {
    const dialogueContent = document.getElementById('dialogue-content');
    if (dialogueContent) {
        dialogueContent.addEventListener('click', function() {
            if (dialogueSystem && dialogueSystem.skipTyping) {
                dialogueSystem.skipTyping();
            }
        });
    }
});