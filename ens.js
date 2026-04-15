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