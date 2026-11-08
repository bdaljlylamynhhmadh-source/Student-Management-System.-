// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // 2. دوال التحليل الأكاديمي (Methods)
  calculateAverage() {
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  getGradeLetter(avg) {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    if (avg >= 50) return 'E';
    return 'F';
  }

  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(1, "أحمد محمد", [85, 90, 88], 90),
  new Student(2, "سارة علي", [42, 45, 48], 80),
  new Student(3, "محمود خالد", [60, 65, 70], 70),
  new Student(4, "فاطمة عمر", [44, 46, 45], 85)
];

// عناصر الـ DOM لعرض النتائج في الصفحة
const studentsContainer = document.getElementById('students-reports');
const mercyContainer = document.getElementById('mercy-reports');

console.log("=== تقرير أداء الطلاب بالجامعة ===");

// 5. المخرجات (Console Logging & DOM Rendering)
studentsList.forEach(student => {
  const avg = student.calculateAverage();
  const letter = student.getGradeLetter(avg);
  const status = student.getFinalStatus();
  
  // طباعة في الـ Console
  console.log(`الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${letter} | النتيجة: ${status}`);
  
  // عرض في صفحة المتصفح
  const card = document.createElement('div');
  card.className = 'student-card';
  card.innerHTML = `<strong>الاسم:</strong> ${student.name} | <strong>المتوسط:</strong> ${avg.toFixed(2)} | <strong>التقدير:</strong> ${letter} | <strong>النتيجة:</strong> ${status}`;
  studentsContainer.appendChild(card);
});

// 4. لجنة الرأفة (Array Methods)
const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg < 50;
});

const boostedStudents = strugglingStudents.map(student => {
  const oldAvg = student.calculateAverage();
  const newAvg = oldAvg + 5;
  return {
    ...student,
    originalAverage: oldAvg,
    adjustedAverage: newAvg,
    adjustedGradeLetter: student.getGradeLetter(newAvg)
  };
});

console.log("\n=== مصفوفة الطلاب المتعثرين المشمولين بالرأفة (+5 درجات) ===");
console.table(boostedStudents);

const totalAdjustedAverages = boostedStudents.reduce((sum, student) => sum + student.adjustedAverage, 0);
const mercyAverage = boostedStudents.length > 0 ? totalAdjustedAverages / boostedStudents.length : 0;

console.log(`\nالمتوسط العام لدرجات الطلاب المتعثرين بعد الرأفة: ${mercyAverage.toFixed(2)}`);

// عرض نتائج لجنة الرأفة في الصفحة
let mercyHTML = `<h3>الطلاب المتعثرون بعد الرأفة (+5 درجات):</h3>`;
boostedStudents.forEach(st => {
  mercyHTML += `<p>• <strong>${st.name}</strong> - المتوسط القديم: ${st.originalAverage.toFixed(2)} ➔ <strong>المتوسط الجديد: ${st.adjustedAverage.toFixed(2)} (${st.adjustedGradeLetter})</strong></p>`;
});
mercyHTML += `<p><strong>المتوسط العام للمتعثرين بعد الرأفة:</strong> ${mercyAverage.toFixed(2)}</p>`;
mercyContainer.innerHTML = mercyHTML;
