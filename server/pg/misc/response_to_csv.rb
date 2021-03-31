#!/home/takehiko/.rbenv/shims/ruby

require "pg"

class Response_To_Csv
  def initialize
    @csv_a = []
    @csv_a << ["typed_char", "time1", "time2", "response_id", "question_id", "student_id", "start_at", "miss_count"]
  end

  def start
    connect_and_inquire
    make_table
    save_csv("response.csv")
    puts "save as response.csv"
  end

  def connect_and_inquire
    @conn = PG.connect(host: "localhost",
                       port: 25432,
                       user: "postgres",
                       dbname: "postgres")
    @res = @conn.exec("select * from response where start_at >= '2020-01-27 00:00:00'")
  end

  def make_table
    @res.each_row do |row|
      # [response_id, student_id, question_id, start_at, finish_at, miss_count, note]．nilまたは文字列
      puts row.inspect
      response_id, student_id, question_id, start_at, finish_at, miss_count, note = row
      next if finish_at.nil?
      @csv_a << [""] * 3 + [response_id, question_id, student_id, start_at.sub(/\..*$/, ""), miss_count]
      @csv_a += note_to_row(note)
    end
  end

  def save_csv(filename = "response.csv")
    open(filename, "w") do |f_out|
      f_out.print @csv_a.map { |line| line.join(",") }.join("\r\n") + "\r\n"
    end
  end

  def note_to_row(note)
    # "66x,5.455;6Fx,0.114;72x,0.16;42S,0.479;42S,0.175;42S,0.194;69,0.432;66,0.095;28,0.337;6E,0.608;75,0.081;6D,0.222;62,0.258;65,0.067;72,0.203;3E,0.367;30,0.786;53PC,0.241;29,0.353;7B,0.96;52ET,0.238;70,0.704;72,0.16;69,0.128;6E,0.082;74,0.08;66,0.224;28,0.369;22,0.142;25,0.944;64,0.305;5C,0.147;6E,0.898;22,0.219;2C,0.238;53PC,0.529;6E,0.415;75,0.081;6D,0.19;62,0.227;65,0.065;72,0.206;29,0.288;3B,0.382;52ET,0.353;7D,0.367"
    # "069,7.811;066,0.149;027x,0.257;028x,0.017;042S,0.879;042S,0.144;028,0.761;06E,0.472;075,0.119;06D,0.168;062,0.52;065,0.152;072,0.104;03E,1;030,1.16;029,0.999;07B,0.777;070,1.623;072,0.144;069,0.128;06E,0.216;074,0.424;066,0.512;028,0.367;022,1.2;025,3.976;064,1.056;05C,1.224;06E,0.32;022,0.952;02C,0.904;06E,0.904;075,0.144;06D,0.144;062,0.24;065,0.136;072,0.096;029,0.984;03B,0.784;07D,1.48"
    # return eval(note) if /^\[\[/ =~ note
    # puts "DEBUG: note=#{note}"
    result_a = []
    note_a = note.split(/;/)
    t_last = 0.0
    note_a.each { |item|
      c, t = item.split(/,/)
      c.sub!(/^0/, "")
      c1 = c[0, 2].to_i(16).chr
      c2 = c[2..-1] || ""
      # c1 == "+", c2 == "x"のとき，c3 = "x+"
      # (Excelで「+x」のみのセルを作ることができないため，
      # 打ち間違いは先頭文字を「x」にする)
      if c2 == "x"
        c3 = '"' + c2 + (c1 == '"' ? (c1 + c1) : c1) + '"'
      else
        c3 = '"' + (c1 == '"' ? (c1 + c1) : c1) + c2 + '"'
      end
      # 打ち込むべき文字の経過時間
      if c2.empty?
        t2 = "%.3f" % [t_last + t.to_f]
        t_last = 0.0
      else
        t2 = nil
        t_last += t.to_f
      end
      # puts "DEBUG: c=#{c}, t=#{t}; c1=#{c1}, c2=#{c2}, c3=#{c3}"
      result_a << (t2 ? [c3, t, t2] : [c3, t])
    }

    result_a
  end
end

if __FILE__ == $0
  Response_To_Csv.new.start
end
