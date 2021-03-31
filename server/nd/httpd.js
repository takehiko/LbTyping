const Http = require('http')
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

Http.createServer(function (req, res) {
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
            text: 'select q.question_id as question_id,name,(select count(*) from response where q.question_id=response.question_id and student_id=$1) as cnt from question q order by q.question_id;',
          values: [sid]
        }
        doQuery(q, r => res.end(JSON.stringify(r.rows)))
    }

    const startResponse = async (qid, sid) => {
        const q1 = {
            text: 'INSERT INTO response(student_id,question_id) VALUES($1,$2)',
            values: [sid, qid]
        }
        const q2 = {
            text: 'SELECT MAX(response_id) as rid FROM response'
        }
        let result_json = '{"rid":-1}';
        const client = initClient()
        await client.connect()

        try {
          await client.query("begin")
          await client.query(q1)
          await client.query(q2)
                .then(r => {
                    result_json = JSON.stringify({"rid":r.rows[0].rid})
                })
          await client.query("commit")
        } catch (e) {
          await client.query('ROLLBACK')
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

    const u = Url.parse(req.url, true)
    if (u.pathname == '' || u.pathname == '/' || u.pathname == '/1') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
        res.end("sorry")
    } else if (u.pathname == '/db') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        const Fs = require('fs')
        const html = Fs.readFileSync("db.html")
        res.end(html)
    } else if (u.pathname.match(/\.html$/)) {
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
        /* 他のhtmlファイルを読み出したい場合はその都度else ifを書く */
        } else {
            res.end("<body>sorry</body>")
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
        if (u.pathname == '/getq' && u.query.id) {
            getQuestion(u.query.id)
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
        //} else if (u.pathname == '/get' && u.query.id) {
        //    getValue(u.query.id)
        //} else if (u.pathname == '/add' && u.query.val) {
        //    addValue(u.query.val)
        } else {
            // res.end("sorry -- " + req.protocol + '://' + req.headers.host + req.url)
            res.end("sorry")
        }
    }
}).listen(sv_settings.port)
