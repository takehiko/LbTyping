const Url = require('url')
const { Client } = require('pg');
const err_msg = '{"error":1}'
const pg_settings = { host: 'cnpg', port: 5432 } // 「cnpg」はdocker-compose.ymlに記載されているコンテナ名
const sv_settings = { port: 80 }
const tab_read = 'table1'
const tab_write = 'table2'

const initClient = () => {
    return new Client({
        user: 'postgres',
        database: 'postgres',
        host: pg_settings.host,
        port: pg_settings.port
    })
}

const express = require('express')
const app = express()
const server = app.listen(sv_settings.port, () => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Request-Method', '*')
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
        res.setHeader('Access-Control-Allow-Headers', '*')

        const doQuery = (q, callback) => {
            const client = initClient()
            client.connect()
            client.query(q)
                .then(callback)
                .catch(e => {
                    console.error(e.stack)
                    res.end(err_msg)
                })
                .then(() => client.end())
        }

        const registerQuestion = (id,qname,source,count,basename,comment,paiza,diff) => {
            const q = {
                text: 'INSERT INTO question(question_id,name,Type_content,count,difficulty,basename,commentary,url) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
                values : [id,qname,source,count,diff,basename,comment,paiza]
            }

            doQuery(q, r => res.end(JSON.stringify({"ok":1})))
        }

        const getALLQuestionID = () => {
            const q = {
                text :'SELECT question_id FROM question' 
            }

            doQuery(q, (r) =>{
                let array = [];

                for(let i = 0; i < r.rows.length; i++){
                    array.push(r.rows[i].question_id);
                }

                return res.end(JSON.stringify(array));
            })
        }


        const getALLBasename= () => {
            const q = {
                text :'SELECT basename FROM question' 
            }

            doQuery(q, (r) =>{
                let array = [];

                for(let i = 0; i < r.rows.length; i++){
                    array.push(r.rows[i].basename);
                }

                return res.end(JSON.stringify(array));
            })
        }

        const getALLPaizaio= () => {
            const q = {
                text :'SELECT url FROM question' 
            }

            doQuery(q, (r) =>{
                let array = [];

                for(let i = 0; i < r.rows.length; i++){
                    array.push(r.rows[i].url);
                }

                return res.end(JSON.stringify(array));
            })
        }
    
        const getQuestion = (id) => {
            const q = {
                text: 'select question_id,name,Type_content,count,difficulty from question where question_id=$1',
                values: [id]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const getQuestion2 = (id) => {
            const q = {
                text: 'select * from question where question_id=$1',
                values: [id]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const showTable = (tab) => {
            const q = {
                text: `select * from ${tab}`
            }
            doQuery(q, r => res.end(JSON.stringify(r.rows)))
        }
    
        const showTableSorted = (tab, key) => {
            const q = {
                text: `select * from ${tab} order by ${key}`
            }
            doQuery(q, r => res.end(JSON.stringify(r.rows)))
        }
    
        const showTableBySid = (sid) => {
            const q = {
                text: 'select q.question_id as question_id,name,(select count(*) from response where q.question_id=response.question_id and student_id=$1 and finish_at is not null) as cnt from question q order by q.question_id;',
            values: [sid]
            }
            doQuery(q, r => res.end(JSON.stringify(r.rows)))
        }
    
        const startResponse = async (qid, sid) => {
            const q = {
                text: 'INSERT INTO response(student_id,question_id) VALUES($1,$2) RETURNING response_id AS rid',
                values: [sid, qid]
            }
            let result_json = '{"rid":-1}';
            const client = initClient()
            await client.connect()
    
            try {
            await client.query(q)
                    .then(r => {
                        result_json = JSON.stringify({"rid":r.rows[0].rid})
                    })
            } catch (e) {
            throw e
            } finally {
            client.end()
            }
    
            res.end(result_json)
        }
    
        const endResponseOld = (id, miss) => {
            const q = {
                text: 'update response set finish_at=current_timestamp, miss_count=$1 where response_id=$2',
                values: [miss, id]
            }
            doQuery(q, r => {
                res.end(JSON.stringify({"rid":id, "miss":miss}))
            })
        }
    
        const endResponse = async (id, miss, note) => {
            note = decodeURIComponent(note || '');
            const q1 = {
                text: 'update response set finish_at=current_timestamp, miss_count=$1, note=$2 where response_id=$3',
                values: [miss, note, id]
            }
            const q2 = {
                text: 'select * from response where response_id=$1',
                values: [id]
            }
            let result_json = '{"rid":-1}';
            const client = initClient()
            await client.connect()
    
            try {
            await client.query(q1)
            await client.query(q2)
                    .then(r => {
                        result_json = JSON.stringify(r.rows[0])
                    })
            } catch (e) {
            throw e
            } finally {
            client.end()
            }
    
            res.end(result_json)
        }
    
        const showResponse = (sid) => {
            const q = {
                text: "select * from response where student_id=$1",
                values: [sid]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows))
                }
            })
        }
    
        const getResponse = (rid) => {
            const q = {
                text: "select response_id,student_id,response.question_id as question_id,start_at,finish_at,miss_count,extract(epoch from (finish_at-start_at)) as time,note,name from response,question where question.question_id=response.question_id and response_id=$1",
                values: [rid]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const getCommentary1 = (rid) => {
            const q = {
                text: "select question.question_id as qid,commentary,url from response,question where response_id=$1 and response.question_id=question.question_id",
                values: [rid]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const getCommentary2 = (rid) => {
            const q = {
                text: "select count(*) as trial from response where student_id=(select student_id from response where response_id=$1) and question_id=(select question_id from response where response_id=$2)",
                values: [rid, rid]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const showHistory = (sid) => {
            const q = {
                text: "select question_id,count(*) as count,min(miss_count) as miss,min(extract(epoch from (finish_at-start_at))) as time,max(finish_at) as last from response where student_id=$1 and finish_at is not null group by question_id order by question_id",
                values: [sid]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0 && false) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows))
                }
            })
        }
    
        const getValue = (id) => {
            const q = {
                text: 'select val from ' + tab_read + ' where id=$1',
                values: [id]
            }
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                } else {
                    res.end(JSON.stringify(r.rows[0]))
                }
            })
        }
    
        const addValue = (val) => {
            const q = {
                text: 'insert into ' + tab_write + '(val) values($1)',
                values: [val]
            }
            doQuery(q, r => res.end(JSON.stringify({"set":val})))
        }

        const getResponseByQid = (qid) => {
            const q = {
                text: "select * from response where question_id=$1",
                values: [qid]
            }
            const fileName = 'response.xlsx'
            const path = 'response/' + fileName
            res.writeHead(200, {'Content-Disposition': `attachment; filename=${fileName}`})
            doQuery(q, r => {
                if (r.rowCount <= 0) {
                    res.end(err_msg)
                    return;
                }
                const XLSX = require('xlsx')
                const book = XLSX.utils.book_new()
                const sheet = XLSX.utils.aoa_to_sheet(
                    [['response_id'], ['student_id'], ['question_id'], ['start_at'], ['finish_at'], ['miss_count']],
                    {origin: {r: 1, c: 1}}
                )

                let cols = [{width: 10}]
                let correctStr = ''
                r.rows.forEach((row, i) => {
                    XLSX.utils.sheet_add_aoa(sheet, [[i + 1]], {origin: {r: 0, c: i * 3 + 2}}) // ナンバリング
                    XLSX.utils.sheet_add_aoa(sheet, [['wrong']], {origin: {r: 7, c: i * 3 + 1}})
                    XLSX.utils.sheet_add_aoa(sheet, [['time per type']], {origin: {r: 7, c: i * 3 + 2}})
                    XLSX.utils.sheet_add_aoa(sheet, [['wrong count']], {origin: {r: 7, c: i * 3 + 3}})
                    cols.push({width: 10}, {width: 20}, {width: 10})
                    let cnt = 1
                    for (const [key, val] of Object.entries(row)) {
                        if (key == 'note') {
                            const times = val.split(';').map(s => {t = s.split(','); return [String.fromCharCode(parseInt(t[0].substring(0,2), 16)) + (t[0].length > 2 ? t[0].substring(2) : ''), parseFloat(t[1])]})
                            let _correctStr = ''
                            let missStr = ''
                            let missTime = 0
                            for (const [char, time] of times) {
                                if (char == 'RET' || char == 'SPC' || char == 'BS') {
                                    missTime += time
                                } else if (char.length == 1) {
                                    _correctStr += char
                                    let missCnt = missStr.length
                                    if (missCnt == 0) missCnt = ''
                                    XLSX.utils.sheet_add_aoa(sheet, [[missStr, time + missTime, missCnt]], {origin: {r: ++cnt, c: i * 3 + 1}})
                                    missStr = ''
                                    missTime = 0
                                } else {
                                    missStr += char[0]
                                    missTime += time
                                }
                            }
                            correctStr = _correctStr
                        } else {
                            XLSX.utils.sheet_add_aoa(sheet, [[val]], {origin: {r: cnt++, c: i * 3 + 2}, dateNF: 'yyyy/mm/dd hh:mm:ss'})
                        }
                    }
                })
                let cnt = 7
                XLSX.utils.sheet_add_aoa(sheet, [['correct']], {origin: {r: cnt++, c: 0}})
                for (const char of correctStr) {
                    XLSX.utils.sheet_add_aoa(sheet, [[char]], {origin: {r: cnt++, c: 0}}) // 正解の文字列を書き込む
                }

                sheet['!cols'] = cols
                XLSX.utils.book_append_sheet(book, sheet)
                XLSX.writeFile(book, path)
                
                const Fs = require('fs')
                const file = Fs.readFileSync(path)
                res.end(file)
            })
        }

        const u = Url.parse(req.url, true)
        if (u.pathname == '' || u.pathname == '/' || u.pathname == '/1') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
            res.end("sorry")
        } else if (u.pathname == '/db') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            const Fs = require('fs')
            const html = Fs.readFileSync("db.html")
            res.end(html)
        } else if (u.pathname == '/register') {
            console.log("question register called");
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            const Fs = require('fs')
            const html = Fs.readFileSync("register/register.html")
            res.end(html)
        } else if (u.pathname.match(/\.(html|js)$/)) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            if (u.pathname == "/top.html") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/top.html")
                res.end(html)
            } else if (u.pathname == "/choice.html") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/choice.html")
                res.end(html)
            } else if (u.pathname == "/typing.html") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/typing.html")
                res.end(html)
            } else if (u.pathname == "/result.html") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/result.html")
                res.end(html)
            } else if (u.pathname == "/commentary.html") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/commentary.html")
                res.end(html)
            } else if (u.pathname == "/axios.min.js") {
                const Fs = require('fs')
                const html = Fs.readFileSync("user/axios.min.js")
                res.end(html)
                /* 他のhtmlファイルを読み出したい場合はその都度else ifを書く */
            } else {
                res.end("<body>sorry</body>")
            }
        } else if (u.pathname == '/respbyq' && u.query.qid) {
            getResponseByQid(u.query.qid)
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
            if (u.pathname == '/getq' && (u.query.id || u.query.qid)) {
                getQuestion(u.query.qid ? u.query.qid : u.query.id)
            } else if (u.pathname == '/getq2' && (u.query.id || u.query.qid)) {
                getQuestion2(u.query.qid ? u.query.qid : u.query.id)
            } else if (u.pathname == '/startr' && u.query.qid && u.query.sid) {
                startResponse(u.query.qid, u.query.sid)
            } else if (u.pathname == '/endr' && u.query.id && u.query.miss) {
                endResponse(u.query.id, u.query.miss, u.query.note)
            } else if (u.pathname == '/show' && u.query.tab) {
                showTable(u.query.tab)
            } else if (u.pathname == '/showsort' && u.query.tab) {
                showTableSorted(u.query.tab, u.query.tab + '_id')
            } else if (u.pathname == '/showsid' && u.query.sid) {
                showTableBySid(u.query.sid)
            } else if (u.pathname == '/resp' && u.query.sid) {
                showResponse(u.query.sid)
            } else if (u.pathname == '/hist' && u.query.sid) {
                showHistory(u.query.sid)
            } else if (u.pathname == '/getr' && (u.query.id || u.query.rid)) {
                getResponse(u.query.rid ? u.query.rid : u.query.id)
            } else if (u.pathname == '/getc1' && (u.query.id || u.query.rid)) {
                getCommentary1(u.query.rid ? u.query.rid : u.query.id)
            } else if (u.pathname == '/getc2' && (u.query.id || u.query.rid)) {
                getCommentary2(u.query.rid ? u.query.rid : u.query.id)
            } else if (u.pathname == '/register_question'){
                console.log("register_questionに関するqueryを受信");
                console.log(u.query);
                if(u.query.qid && u.query.qname && u.query.source && u.query.count && u.query.basename && u.query.comment && u.query.paiza && u.query.diff){
                    console.log("if passed");
                    registerQuestion(u.query.qid,u.query.qname,u.query.source,u.query.count,u.query.basename,u.query.comment,u.query.paiza,u.query.diff);
                }
            } else if (u.pathname == '/getALLQuestionID'){
                getALLQuestionID();
            } else if (u.pathname == '/getALLBasename'){
                getALLBasename();
            } else if (u.pathname == '/getALLPaizaio'){
                getALLPaizaio();
            //} else if (u.pathname == '/get' && u.query.id) {
            //    getValue(u.query.id)
            //} else if (u.pathname == '/add' && u.query.val) {
            //    addValue(u.query.val)
            } else {
                // res.end("sorry -- " + req.protocol + '://' + req.headers.host + req.url)
                res.end("sorry")
            }
        }
        next()
    })
})
