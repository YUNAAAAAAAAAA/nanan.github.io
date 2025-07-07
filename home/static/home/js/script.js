document.addEventListener('DOMContentLoaded', () => {

    // --- 부드러운 스크롤 로직 ---

    const sections = document.querySelectorAll('section');
    const container = document.querySelector('.container');
    const topBtn = document.getElementById('top-btn');
    let currentIndex = 0;
    let isScrolling = false;
    
    // 애니메이션 총 시간 (밀리초 단위, 1000 = 1초)
    const animationDuration = 900; 

    const scrollToSection = (index) => {
        if (isScrolling || index < 0 || index >= sections.length) {
            return;
        }

        isScrolling = true;
        
        const startPosition = container.scrollTop;
        const targetPosition = sections[index].offsetTop;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Easing 함수 (애니메이션에 가속/감속 효과를 줌)
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            const run = easeInOutQuad(timeElapsed, startPosition, distance, animationDuration);
            container.scrollTop = run;

            if (timeElapsed < animationDuration) {
                requestAnimationFrame(animation);
            } else {
                container.scrollTop = targetPosition; // 정확한 위치로 보정
                currentIndex = index;
                isScrolling = false;
            }
        };

        requestAnimationFrame(animation);
    };


    const handleWheel = (e) => {
        if (isScrolling) {
            e.preventDefault();
            return;
        }
        e.preventDefault();

        if (e.deltaY > 0) {
            scrollToSection(currentIndex + 1);
        } else {
            scrollToSection(currentIndex - 1);
        }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });


    topBtn.addEventListener('click', () => {
            scrollToSection(0);
        });

        // 스크롤 위치에 따라 Top 버튼 보이기/숨기기
        container.addEventListener('scroll', () => {
            // 첫 번째 페이지의 절반 이상 스크롤되면 버튼을 보여줌
            if (container.scrollTop > window.innerHeight / 2) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        });

    // --- 기존의 페이드인 애니메이션 로직 ---
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    }
});