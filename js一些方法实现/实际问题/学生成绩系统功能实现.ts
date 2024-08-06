interface Student {
  name: string;
  scores: {
    chinese: number;
    math: number;
    english: number;
    // 其他科目类型添加
  };
  totalScore?: number;
}

// 成绩系统类
class ScoreSystem {
  // 私有属性
  public students: Student[] = [];

  // 添加学生数据
  addStudent(student: Student) {
    this.students.push(student);
  }

  // 获取单科平均分
  getAveScore(theClass: keyof Student['scores']) {
    let totalScore = 0;
    for (const student of this.students) {
      totalScore += student.scores[theClass];
    }
    return totalScore / this.students.length;
  }

  // 获取总分平均值
  getTotalScoreAve() {
    let totalScore = 0;
    for (const student of this.students) {
      totalScore += Object.values(student.scores).reduce((acc, score) => acc + score, 0);
    }
    return totalScore / this.students.length;
  }

  // 获取所有平均分统一返回
  getAllAve() {
    let res: { [key in keyof Student['scores']]?: number } & { totalAve?: number } = {}
    let classKeys = Object.keys(this.students[0].scores) as (keyof Student['scores'])[];
    classKeys.forEach(item => {
      res[item] = this.getAveScore(item);
    })
    res.totalAve = this.getTotalScoreAve();

    return res
  }

  // 总分排序
  sortByTotalScore(isASC: boolean = true) {
    this.students.sort((a, b) => {
      const totalScore1 = Object.values(a.scores).reduce((acc, score) => acc + score, 0);
      const totalScore2 = Object.values(b.scores).reduce((acc, score) => acc + score, 0);
      return isASC ? totalScore1 - totalScore2 : totalScore2 - totalScore1;
    });
    return this.students;
  }

  //根据单科排序
  sortByClass(theClass: keyof Student['scores']) {
    this.students.sort((a, b) => b.scores[theClass] - a.scores[theClass]);
    return this.students;

  }

  // 获取学生成绩
  findStudentScore(name: string) {
    const student = this.students.find(student => student.name === name);
    if (student) {
      return {
       ...student,
        totalScore: Object.values(student.scores).reduce((acc, score) => acc + score, 0)
      };
    }
    return null;
  }

  // 删除学生
  deleteStudent(name: string) {
    this.students = this.students.filter(student => student.name !== name);
  }
}

const studentScoreSystem = new ScoreSystem();
// 测试数据
const student1: Student = {
  name: '张三',
  scores: {
    chinese: 80,
    math: 90,
    english: 75
  }
};

const student2: Student = {
  name: '李四',
  scores: {
    chinese: 70,
    math: 85,
    english: 90
  }
};

const student3: Student = {
  name: '王五',
  scores: {
    chinese: 85,
    math: 75,
    english: 80
  }
};

const student4: Student = {
  name: '赵六',
  scores: {
    chinese: 90,
    math: 80,
    english: 85
  }
};

const student5: Student = {
  name: '孙七',
  scores: {
    chinese: 75,
    math: 95,
    english: 70
  }
};

studentScoreSystem.addStudent(student1);
studentScoreSystem.addStudent(student2);
studentScoreSystem.addStudent(student3);
studentScoreSystem.addStudent(student4);
studentScoreSystem.addStudent(student5);

console.log(studentScoreSystem.getAllAve());
console.log(studentScoreSystem.sortByTotalScore(true));
console.log(studentScoreSystem.sortByClass('chinese'));
console.log(studentScoreSystem.sortByClass('english'));
console.log(studentScoreSystem.sortByClass('math'));
console.log(studentScoreSystem.findStudentScore('孙七'));

