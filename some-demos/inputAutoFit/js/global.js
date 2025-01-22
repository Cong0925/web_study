
/**
 * @description: 输入框自动推荐补全
 * @param {Sting} textareaSelector
 * @param {Sting} data
 * @param {Sting} suggestionsSelector
 */
function initializeAutocomplete(textareaSelector, data, suggestionsSelector) {
    // 点击空白处 取消推荐提示
    $(document).off('click.removeSuggestions').on('click.removeSuggestions', function (e) {
        $suggestions.hide();
    });
    // 滚动条滚动时移除提示列表
    $(textareaSelector).scroll(function () {
        $suggestions.hide();
    });

    const $textarea = $(textareaSelector);  // 文本框元素
    const $suggestions = $(suggestionsSelector);    // 推荐列表元素
    // 获取.inputArea 的宽度
    const inputAreaWidth = $('.inputArea').innerWidth();
    // 设置宽度到 $suggestions
    $suggestions.css('width', inputAreaWidth);
    const fontSize = parseInt($textarea.css('font-size'), 10);  // 文本框文字字号
    const lineHeight = parseInt($textarea.css('line-height'), 10) || fontSize;  // 根据字号获取行高

    // 创建画布 跟踪光标
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${$textarea.css('font-family')}`;

    /**
     * @description: 获取光标坐标偏移量
     * @param {String} text 光标所在行内容
     * @param {String} caretPos 光标所在行内容长度
     */
    function getCaretOffset(text, caretPos) {
        let totalWidth = text.split('\n').length * parseFloat($textarea.css('padding')); // 字符初始总宽度，每行都有左侧的padding需要加上
        const currentLineText = text.split('\n').pop(); // 获取光标所在行的内容

        for (let i = 0; i < caretPos; i++) {
            const char = currentLineText[i] || ' '; // 避免超出范围
            totalWidth += ctx.measureText(char).width; // 累加字符宽度

        }
        return totalWidth;
    }

    /**
     * @description :获取 光标前的最后一个 非字母数字 字符的索引值
     */
    function getIndexOfSpace() {
        const inputValue = $textarea.val();  // 输入的内容
        const caretPosition = $textarea.prop('selectionEnd');  // 光标所在位置索引

        let indexofspace = -1;  // 光标前最后一个 非字母数字 字符的索引，用于确定选中推荐后的覆盖部分

        // 通过循环获取 光标前的最后一个 非字母数字 字符的索引值
        for (let index = 0; index < caretPosition; index++) {
            if (!/[a-zA-Z0-9]/.test(inputValue[index])) {
                indexofspace = index;
            }
        }
        return indexofspace
    }
    let selectedIndex = 0; //当前选中推荐的索引

    $textarea.on('input', function () {
        const $textCursorStatistics = $('.textCursorStatistics')
        $textCursorStatistics.empty() // 先清空辅助定位元素的内容

        const inputValue = $textarea.val();  // 输入的内容
        $textCursorStatistics.html(inputValue) // 设置辅助定位元素的内容

        const caretPosition = $textarea.prop('selectionEnd');  // 光标所在位置索引

        let indexofspace = getIndexOfSpace()

        let matchingItems = ''  // 符合输入筛选条件的推荐项

        $suggestions.empty();  // 清除上一次的推荐内容
        selectedIndex = 0;  // 每次输入 重置默认选择推荐项 为第一个

        let tempInputVal = inputValue.slice(indexofspace + 1, caretPosition)  // 获取特殊字符 到 光标所在部分 输入的 字母数字内容，用于匹配推荐项
        matchingItems = data.filter(item => PinyinHelper.convertToPinyinString(item.checkName).toLowerCase().startsWith(tempInputVal.toLowerCase()));  // 从所有备选数据中 筛选出来 符合的内容用于推荐

        if (matchingItems.length > 0) {
            matchingItems.forEach((item, index) => {
                let html = `<div class="suggestion-item" index='${index}' checkName='${item.checkName}'  checkKey='${item.checkKey}'  the-type='${item["the-type"]}' value='${JSON.stringify(item.value)}'>
                    <span style="border:1px solid #c2d8e1;background-color: #c9e4ef;display: inline-block;width: 30px;padding: 0 2px;border-radius: 6px;margin-right:2px">tab:</span>
                    <i class='PA self-grid-col-icon ${item["the-type"]}' style='height:18px;'></i>
                    <span class="PA" style="left:55px">${item.checkName}</span>
                </div>`;
                $suggestions.append(html);
            });
            $('.suggestion-item')
                .on('click', function () {
                    const beforeCaret = inputValue.slice(0, indexofspace + 1);
                    const afterCaret = inputValue.slice(caretPosition);
                    $textarea.val(beforeCaret + $(this).attr('checkName') + afterCaret);
                    $suggestions.hide();
                })
                .off('mouseover.suggestion-item').on('mouseover.suggestion-item', function () {
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    selectedIndex = $(this).attr('index')
                    if ($(this).attr('the-type') == 'method') {
                        let html = `<div class="suggestion-tip" style="width: 270px;position: absolute;background-color: #ddd9d9;z-index: 11;">
                            <span>${JSON.parse($(this).attr('value')).remark}</span>
                        </div>`;
                        $('.inputArea').append(html);
                        let $tip = $(".suggestion-tip");
                        $tip.offset({
                            left: $(this).offset().left + $(this).outerWidth(),
                            top: $(this).offset().top
                        });
                    }
                })
                .off('mouseout.suggestion-item').on('mouseout.suggestion-item', function () {
                    $('.suggestion-tip').remove();
                });

            // 每次显示时自动将滚动条置顶
            $suggestions.scrollTop(0);

            // 自动默认选择第一个
            updateSelectedItem();

            // 检测回车换行
            const rows = inputValue.slice(0, caretPosition).split('\n'); // 获取从开始到光标位置 根据回车分割，得到行数
            const currentRow = rows.length - 1; // 当前行，这里取最后一项的索引，及光标之前的最后一行，也是光标所在行
            const currentCol = rows[currentRow].length; // 光标所在行的字符数

            // 这是当前行 光标距离左侧的总距离
            let offsetLeft = getCaretOffset(rows[currentRow], currentCol);

            // 计算当前 推荐列表 应该设置的 top值 计算方法：当前输入框距离父元素顶部距离+输入框的padding值+(当前光标行数+1)*行高
            let offsetTop = $textarea.offset().top + parseFloat($textarea.css('padding')) + (currentRow + 1) * lineHeight - $textarea.scrollTop();

            let curAutoLineWrap = Math.floor(offsetLeft / (inputAreaWidth - parseFloat($textarea.css('padding'))))
            let preAutoLineWrap = 0
            // 计算当前行之前有多少自动换行
            for (let index = 0; index < getLineNum() - 1; index++) {
                let currentDisLeft = getCaretOffset(rows[index], rows[index].length)
                preAutoLineWrap += Math.floor(currentDisLeft / (inputAreaWidth - parseFloat($textarea.css('padding'))))
            }
            offsetTop += curAutoLineWrap * 20 + preAutoLineWrap * 20

            offsetLeft = curAutoLineWrap > 0 ? offsetLeft % (inputAreaWidth - parseFloat($textarea.css('padding'))) + parseFloat($textarea.css('padding')) : offsetLeft % inputAreaWidth

            $suggestions.css({
                display: 'block',
                top: offsetTop + 'px',
                left: offsetLeft + 'px'
            });

        } else {
            $suggestions.hide()
        }

    });

    // 键盘事件处理
    $textarea.on('keydown', function (e) {
        if (!$('.suggestions').is(":hidden")) {
            const inputValue = $textarea.val();
            let caretPosition = $textarea.prop('selectionStart'); // 当前光标位置

            if (e.key === 'ArrowDown') {
                // 向下键
                const items = $('.suggestion-item');
                if (selectedIndex < items.length - 1) {
                    selectedIndex++;
                    updateSelectedItem();
                    scrollToSelectedItem(); // 滚动到选中的项
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                // 向上键
                const items = $('.suggestion-item');
                if (selectedIndex > 0) {
                    selectedIndex--;
                    updateSelectedItem();
                    scrollToSelectedItem(); // 滚动到选中的项
                }
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                // 向右键
                if (caretPosition < inputValue.length) {
                    caretPosition++; // 手动更新光标位置
                    setTimeout(() => {
                        showSuggestions(inputValue, caretPosition); // 延迟执行以确保光标位置更新
                    }, 0);
                }
            } else if (e.key === 'ArrowLeft') {
                // 向左键
                if (caretPosition > 0) {
                    caretPosition--; // 手动更新光标位置
                    setTimeout(() => {
                        showSuggestions(inputValue, caretPosition); // 延迟执行以确保光标位置更新
                    }, 0);
                }
            } else if (e.key === 'Tab') {
                // Enter 或 Tab 键触发选择
                const items = $('.suggestion-item');
                if (selectedIndex !== -1) {
                    const selectedItem = items.eq(selectedIndex);
                    selectItem(selectedItem);
                }
                e.preventDefault();
            }
        }
    });

    /**
     * @description: 更新选择的推荐元素
     */
    function updateSelectedItem() {
        const items = $('.suggestion-item');
        $('.selected').removeClass('selected')
        if (selectedIndex !== -1) {
            items.eq(selectedIndex).addClass('selected');
        }
    }

    /**
     * @description: 选中推荐项
     */
    function selectItem($item) {
        let indexofspace = getIndexOfSpace()

        const checkName = $item.attr('checkName'); //选中推荐项
        const caretPosition = $textarea.prop('selectionEnd');  //光标位置
        const inputValue = $textarea.val(); // 输入框内容
        const beforeCaret = inputValue.slice(0, indexofspace + 1);  // 隔断之前的内容
        const afterCaret = inputValue.slice(caretPosition); // 光标之后内容
        $textarea.val(beforeCaret + checkName + afterCaret);
        $suggestions.hide();
    }

    /**
     * @description: 滚动条滚动时更新推荐项
     */
    function scrollToSelectedItem() {
        $(".suggestion-tip").remove();
        const items = $('.suggestion-item');
        const selectedItem = items.eq(selectedIndex);

        const containerHeight = $suggestions.height();
        const itemTop = selectedItem.position().top;
        const itemHeight = selectedItem.outerHeight();

        if ($(selectedItem).attr('the-type') == 'method') {
            let html = `<div class="suggestion-tip" style="width: 270px;position: absolute;background-color: #ddd9d9;z-index: 11;">
                <span>${JSON.parse($(selectedItem).attr('value')).remark}</span>
            </div>`;
            $('.inputArea').append(html);
            let $tip = $(".suggestion-tip");
            $tip.offset({
                left: $(selectedItem).offset().left + $(selectedItem).outerWidth(),
                top: $(selectedItem).offset().top
            });
        }

        // 滚动条滚动
        if (itemTop < 0) {
            $suggestions.scrollTop($suggestions.scrollTop() + itemTop);
        } else if (itemTop + itemHeight > containerHeight) {
            $suggestions.scrollTop($suggestions.scrollTop() + (itemTop + itemHeight - containerHeight));
        }
    }

    //获取光标当前行数
    function getLineNum() {
        let caretPosition = $textarea.prop('selectionStart'); // 当前光标位置
        let text = $textarea.val()
        let count = 1
        for (let index = 0; index < caretPosition; index++) {
            if (text[index] == '\n') {
                count++
            }
        }
        return count
    }

    /**
     * @description: 显示推荐项列表
     */
    function showSuggestions(inputValue, caretPosition) {
        const charAtCaret = inputValue.charAt(caretPosition - 1).toLowerCase(); // 获取光标前的字符

        $suggestions.empty();
        if (charAtCaret) {
            const matchingItems = data.filter(item => item.checkName.toLowerCase().startsWith(charAtCaret));


            if (matchingItems.length > 0) {
                matchingItems.forEach(item => {
                    const $item = $('<div>')
                        .addClass('suggestion-item')
                        .attr('checkName', item.checkName)
                        .attr('checkKey', item.checkKey)
                        .attr('value', JSON.stringify(item.value))
                        .text(item.checkName)
                        .on('click', function () {
                            const beforeCaret = inputValue.slice(0, caretPosition - 1);
                            const afterCaret = inputValue.slice(caretPosition);
                            $textarea.val(beforeCaret + item.checkName + afterCaret);
                            $suggestions.hide();
                        });
                    $suggestions.append($item);
                });

                $suggestions.show();
                selectedIndex = -1; // 重置选中项
            } else {
                $suggestions.hide();
            }
        } else {
            $suggestions.hide();
        }
    }

}

/**
 * @description: 绑定事件
 */
function bindEvents() {
    // 表达式输入框 使用提示
    $('.inputArea .inputHelp').off('mouseover.inputHelp').on('mouseover.inputHelp', function () {
        $('.inputHelp-box').show()
    }).off('mouseout.inputHelp').on('mouseout.inputHelp', function (e) {
        if ($(e.relatedTarget).closest('.inputHelp-box').length == 0 && $(e.relatedTarget).closest('.inputHelp').length == 0) {
            $('.inputHelp-box').hide()
        }
    })
    $('.inputArea .inputHelp-box').off('mouseout.inputHelp').on('mouseout.inputHelp', function (e) {
        if ($(e.relatedTarget).closest('.inputHelp-box').length == 0 && $(e.relatedTarget).closest('.inputHelp').length == 0) {
            $('.inputHelp-box').hide()
        }
    })

    // 
    $('.testBtn').on('click',function(){
        tipPop({ text: 'F12 控制台查看 内容解析', type: 'success' });
        console.log(getInputFuncParams('.expressionInput'));
         
    })
}

/**
 * @description: 文本框 表达式输入内容解析
 * @param {String} targetInput 需要处理的输入框元素筛选条件 '.className' / '#idName'
 * @returns {Object} {funcName / 函数名, arr1 / 引用字段, arr2 / 自定义输入内容, arr3 / 函数嵌套, allArr / 按照数序排列的参数}
 */
function getInputFuncParams(targetInput) {
    let input = $(targetInput).val();
    const openIndex = input.indexOf('(');
    const closeIndex = input.lastIndexOf(')');
    if (openIndex === -1 || closeIndex === -1 || closeIndex <= openIndex) {
        tipPop({ text: '表达式格式不正确，请参照帮助内容格式', type: 'failed' });
        return false;
    }
    const paramStr = input.substring(openIndex + 1, closeIndex);
    let funcName = input.slice(0, openIndex);
    let arr1 = []; // 存储未使用双引号包裹的字段
    let arr2 = []; // 存储使用双引号包裹的字段
    let arr3 = []; // 存储函数形式的字段
    let allArr = []; // 按照数序排列的参数
    let currentParam = '';
    let inQuotes = false;
    let inFunction = false;
    for (let i = 0; i < paramStr.length; i++) {
        const char = paramStr[i];
        if (char === '"' && (i === 0 || paramStr[i - 1] !== '\\')) {
            inQuotes = !inQuotes;
        }
        if (char === '(' && !inQuotes) {
            inFunction = true;
        }
        if (char === ')' && !inQuotes) {
            inFunction = false;
        }
        if (char === ',' && !inQuotes && inFunction) {
            let trimmedParam = currentParam.trim();
            if (trimmedParam.startsWith('"') && trimmedParam.endsWith('"')) {
                arr2.push(trimmedParam.slice(1, -1));
                allArr.push(trimmedParam.slice(1, -1));
            } else if (trimmedParam.includes('(')) {
                arr3.push(trimmedParam);
                allArr.push(trimmedParam);
            } else {
                arr1.push(trimmedParam);
                allArr.push(trimmedParam);
            }
            currentParam = '';
        } else {
            currentParam += char;
        }
    }
    if (currentParam) {
        let trimmedParam = currentParam.trim();
        if (trimmedParam.startsWith('"') && trimmedParam.endsWith('"')) {
            arr2.push(trimmedParam.slice(1, -1));
            allArr.push(trimmedParam.slice(1, -1));
        } else if (trimmedParam.includes('(')) {
            arr3.push(trimmedParam);
            allArr.push(trimmedParam);
        } else {
            arr1.push(trimmedParam);
            allArr.push(trimmedParam);
        }
    }
    return { funcName, arr1, arr2, arr3, allArr };
}

/**
 * @description 显示提示弹窗
 * @param {Object} options 提示弹窗配置项
 * 属性有 text: 提示文字; type: 类型 success/failed/warn/info; removeTime: 持续时间
 */
function tipPop(options) {
    let tipBox = $('<div class="tip-box '+options.type+'"></div>');
    let tipText = $('<div class="tip-text '+ options.type + '"></div>');
    tipText.html(options.text);
    tipBox.append(tipText);
    $('body').append(tipBox);
    let tipBoxW = tipBox.outerWidth();
    // let w = $('body').width() / 2 - tipBoxW / 2;
    // $('.tip-box').css('left', w + 'px');
    setTimeout(function () {
        $(tipBox).remove();
    }, options.removeTime? options.removeTime : 3000);
}

export default {initializeAutocomplete,bindEvents,getInputFuncParams}