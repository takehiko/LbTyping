CREATE TABLE question (
    question_id  SERIAL NOT NULL,
    name         text     UNIQUE,
    Type_content text     NOT NULL,
    count        int      DEFAULT 0,
    difficulty   VARCHAR(10)     DEFAULT 'NONE',
    basename     text     DEFAULT '',
    commentary   text     DEFAULT '',
    url          text     DEFAULT '',
    o_question_id   int      DEFAULT NULL,

    PRIMARY KEY (question_id)
);

CREATE TABLE response (
   response_id  SERIAL NOT NULL,
   student_id   int  NOT NULL,
   question_id  int  NOT NULL,
   start_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   finish_at    TIMESTAMP WITH TIME ZONE,
   miss_count   int  DEFAULT 0,
   note         TEXT DEFAULT '',

   PRIMARY KEY (response_id),
   FOREIGN KEY (question_id)
   REFERENCES  question (question_id)
);

CREATE TABLE model (
    response_id int NOT NULL,

    PRIMARY KEY (response_id),
    FOREIGN KEY (response_id)
    REFERENCES  response (response_id)
);
