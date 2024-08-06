const fs = require('fs');
const path = require('path');

function generateMdFromTree(treeData) {
    return new Promise((resolve, reject) => {
        let mdContent = '';
        mdContent += `# ${treeData.data.title}\n`;
        mdContent += `${treeData.data.content}\n\n`;

        const generateChildrenMd = (data, level, indexStr = '') => {
            if (level > 1) {
                mdContent += `${'#'.repeat(level)} ${indexStr}. ${data.data.title}\n`;
                mdContent += `${data.data.content}\n\n`;
            }
            data.children.forEach((child, childIndex) => {
                const newIndexStr = indexStr ? `${indexStr}.${childIndex + 1}` : `${childIndex + 1}`;
                generateChildrenMd(child, level + 1, newIndexStr);
            });
        };

        generateChildrenMd(treeData, 1);
        // 方法一：使用日期对象和字符串拼接
        let currentDate = new Date();
        let timestamp = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
        let fileName = `created_${timestamp}.md`;
        let filePathWithTimestamp = path.join(__dirname, `../createdFile/${fileName}`);


        try {
            fs.writeFileSync(filePathWithTimestamp, mdContent);
            resolve({ success: true, fileName: fileName });
        } catch (err) {
            reject({ success: false, error: err });
        }
    });
}

module.exports = {
    generateMdFromTree,
}