let savedID = "";

/**
 * المرحلة الأولى: التحقق من الدخول
 */
function validateLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const btnText = document.getElementById('loginText');
    const error = document.getElementById('error');
    const card = document.getElementById('loginCard');

    // شرط بسيط: الرقم 12 خانة والباسورد ليس فارغاً
    if (/^\d{12}$/.test(user) && pass !== "") {
        savedID = user;
        btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
        
        setTimeout(() => {
            // إخفاء صفحة الدخول وإظهار صفحة الأدوار
            document.getElementById('login-page').style.display = 'none';
            const rolePage = document.getElementById('role-page');
            rolePage.style.display = 'flex';
            rolePage.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 1200);
    } else {
        card.style.animation = "shake 0.4s ease";
        error.style.display = 'block';
        setTimeout(() => card.style.animation = "", 400);
    }
}

/**
 * المرحلة الثانية: الدخول للوحة التحكم بناءً على الدور
 */
function enterDashboard(role) {
    const rolePage = document.getElementById('role-page');
    rolePage.style.opacity = '0';
    rolePage.style.transform = 'scale(0.9)';

    setTimeout(() => {
        rolePage.style.display = 'none';
        const app = document.getElementById('app-dashboard');
        app.style.display = 'block';
        
        // تخصيص البيانات
        document.getElementById('user-role-title').innerText = `بوابة الـ ${role}`;
        document.getElementById('user-display-id').innerText = `رقم التعريف: ${savedID}`;
        document.getElementById('welcome-msg').innerText = `مرحباً بك سيادة الـ ${role}`;
    }, 500);
}

// دعم زر Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('login-page').style.display !== 'none') {
        validateLogin();
    }
});
// دالة لإرسال البيانات إلى السيرفر الذي أنشأناه على رندر
async function sendDataToServer(data) {
    try {
        const response = await fetch('https://ensti-1.onrender.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('نجح الاتصال:', result);
        alert('تم حفظ البيانات بنجاح في قاعدة البيانات!');
    } catch (error) {
        console.error('فشل الاتصال:', error);
        alert('حدث خطأ أثناء الاتصال بالسيرفر');
    }
}
// لنفترض أن زر الإرسال في الـ HTML له id اسمه "submitBtn"
const myButton = document.getElementById('submitBtn');

if(myButton) {
    myButton.addEventListener('click', () => {
        const dataToSave = { 
            message: "مرحباً، هذه أول معلومة أخزنها!", 
            time: new Date() 
        };
        sendDataToServer(dataToSave);
    });
}
