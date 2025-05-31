function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.prepend(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}



// Обработка мобильного меню
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Блокировка прокрутки при открытом меню
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню при клике на overlay
    navOverlay.addEventListener('click', function () {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Анимации при скролле
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // Флаг для отслеживания инициализации
    let animationInitialized = false;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            // Проверяем, что элемент пересекается и анимация ещё не применялась
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const animationClass = entry.target.getAttribute('data-animation');
                const delay = entry.target.getAttribute('data-animation-delay') || '0s';

                entry.target.style.animationDelay = delay;
                entry.target.classList.add('animate__animated', animationClass, 'animated');

                // Прекращаем наблюдение за элементом
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Инициализация только после небольшой задержки
    setTimeout(() => {
        animationInitialized = true;
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }, 300); // 300ms задержка для инициализации
});



document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const BOT_TOKEN = '7964416791:AAEnhL9BeTD8WZDtK1vq7ZFC38fYeaUgpSU';
    const CHAT_ID = '-4782276187';
    
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Отправка...
    `;

    const formData = new FormData(form);
    const name = formData.get('name');
    let phone = formData.get('phone');
    const product = formData.get('product');
    const message = formData.get('message') || 'не указана';

    if (!name || !phone || !product) {
        alert('Заполните все обязательные поля');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
    }

    // Очищаем номер для ссылки tel:
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Формируем сообщение с HTML-разметкой
    const telegramMessage = `📢 <b>Новая заявка на сетку</b>\n
👤 <b>Имя:</b> ${name}\n
📞 <b>Телефон:</b> <a href="tel:${cleanPhone}">${phone}</a>\n
🛍️ <b>Тип сетки:</b> ${product}\n
📝 <b>Доп. информация:</b> ${message}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
            disable_web_page_preview: true
        })
    })

    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('✅ Заявка отправлена!');
            form.reset();
        } else {
            throw new Error(data.description || 'Ошибка отправки');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('❌ Ошибка: ' + error.message);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
});

// Обработка клика по телефону (если нужно что-то дополнительное)
document.querySelectorAll('.phone-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Можно добавить аналитику или другие действия
        console.log('Phone number clicked');
    });
});





