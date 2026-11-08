// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades; // مصفوفة تحتوي على 3 درجات
        this.attendance = attendance; // نسبة الحضور
    }

    // دالة حساب المتوسط (استخدام reduce)
    calculateAverage() {
        const sum = this.grades.reduce((total, current) => total + current, 0);
        return sum / this.grades.length;
    }

    // دالة التقدير بناءً على المتوسط
    getGradeLetter(avg) {
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        if (avg >= 50) return 'E';
        return 'F';
    }

    // دالة النتيجة النهائية (ناجح / يحتاج مراجعة)
    getFinalResult() {
        const avg = this.calculateAverage();
        if (avg >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 2. مصفوفة الطلاب (Objects Array)
const studentsList = [
    new Student(1, "أحمد محمد", [85, 90, 88], 90),
    new Student(2, "سارة علي", [42, 45, 44], 80),  // متعثر (بين 40 و 49)
    new Student(3, "محمود خالد", [60, 65, 70], 70),
    new Student(4, "منى أحمد", [46, 48, 47], 85)   // متعثر (بين 40 و 49)
];

// 3. طباعة التقرير في Console وفي واجهة الموقع (DOM)
const studentsContainer = document.getElementById("students-list");
let htmlContent = "";

console.log("--- تقرير أداء الطلاب بالكامل ---");
studentsList.forEach(student => {
    const avg = student.calculateAverage();
    const grade = student.getGradeLetter(avg);
    const result = student.getFinalResult();
    
    // الطباعة في Console
    console.log(`الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${grade} | النتيجة: ${result}`);
    
    // التنسيق للظهور في الصفحة
    htmlContent += `
        <div class="student-item">
            <strong>${student.name}</strong> - 
            المتوسط: <span>${avg.toFixed(2)}</span> | 
            التقدير: <span>${grade}</span> | 
            الحالة: <span class="${result === 'ناجح' ? 'pass' : 'review'}">${result}</span>
        </div>
    `;
});
if (studentsContainer) studentsContainer.innerHTML = htmlContent;

// 4. لجنة الرأفة (Array Methods)
// أ. filter: استخراج الطلاب المتعثرين بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg < 50;
});

// ب. map: إضافة 5 درجات رأفة لمتوسطاتهم
const updatedStrugglingAverages = strugglingStudents.map(student => {
    let newAvg = student.calculateAverage() + 5;
    return { name: student.name, newAverage: newAvg };
});

console.log("\n--- الطلاب المتعثرين بعد تطبيق درجات الرأفة (+5) ---");
console.log(updatedStrugglingAverages);

const graceContainer = document.getElementById("grace-list");
let graceHtml = "";
updatedStrugglingAverages.forEach(item => {
    graceHtml += `
        <div class="student-item grace">
            الطالب: <strong>${item.name}</strong> | المتوسط الجديد بعد (+5): <span>${item.newAverage.toFixed(2)}</span>
        </div>
    `;
});
if (graceContainer) graceContainer.innerHTML = graceHtml;

// جـ. reduce: حساب المجموع والمتوسط العام بعد الرأفة
const totalNewAverages = updatedStrugglingAverages.reduce((sum, item) => sum + item.newAverage, 0);
const count = updatedStrugglingAverages.length;
const overallGraceAverage = count > 0 ? (totalNewAverages / count) : 0;

console.log(`\nالمتوسط العام للمتعثرين بعد الرأفة: ${overallGraceAverage.toFixed(2)}`);

const summaryContainer = document.getElementById("grace-summary");
if (summaryContainer) {
    summaryContainer.innerHTML = `📌 <strong>المتوسط العام للمتعثرين بعد درجات الرأفة:</strong> ${overallGraceAverage.toFixed(2)}`;
  }
