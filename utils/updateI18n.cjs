// V3的API已經失效了 必須使用V4 API + API Key
// 與此處開啟專案與新增API
// https://console.cloud.google.com/apis/dashboard

const https = require('https');
const fs = require('fs');

console.log(require('dotenv').config());

const apiKeyString = process.env.I18N_APIKEY;
const GoogleExceli18n = {
    "docId": "174XiqkVygaFVGWgWDkcL3GSSBeXTtAf4J6uAhldkK60",
    "sheetName": "i18n",
    "range": "A:Z"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${GoogleExceli18n.docId}/values/${GoogleExceli18n.sheetName}!${GoogleExceli18n.range}?&key=${apiKeyString}`


const srcPath = 'src';
const httpsGet = u => {
    return new Promise((resolve, reject) => {
        https.get(u, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
    });
};

function download() {
    console.log(`自${url}下載語言包.`);
    let langs = [];
    return httpsGet(url).then(body => {
        const dataList = body.values; // as Array
        // 第一列是有的欄位名稱
        const parameters = dataList[0];
        dataList.shift();
        langs = parameters;
        // 這邊已經處理成有translationkey, 各用法, 各語言的Array
        return dataList.filter(d => !d[0]?.startsWith('//') && d[0]?.trim().length > 0).map((strings) => {
            return Object.fromEntries(strings.map((s, i) => [parameters[i], s]));
        });
    }).then(keyAndLangs => {

        langs = langs.filter(k => k !== 'key' && !k.startsWith('_')) // ['zh-tw', 'zh-cn'];
        langs.forEach(lang => {
            output = {};
            keyAndLangs.forEach(l => {
                // 避免空值被匯出
                var nestedObject = output;
                var subKeys = l.key.split('.')
                subKeys.forEach((k, index) => {
                    if (index !== subKeys.length - 1) {
                        if (!nestedObject[k]) {
                            nestedObject[k] = {}
                        }
                        nestedObject = nestedObject[k]
                    }
                    else {
                        if ((l[lang] || "").trim().length > 0) {
                            nestedObject[k] = l[lang]
                        }
                    }
                })
            });
            fs.writeFile(`public/assets/i18n/${lang}.json`, JSON.stringify(output), err => {
                if (err)
                    throw (err);
                else
                    console.log(`${lang}.json更新完成.`);
            });
        })
    }).catch((err) => {
        console.error('更新語系失敗：', err);
    });
}
download();