document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer를 지원하는지 확인
    if ('IntersectionObserver' in window) {
        // 옵저버 생성
        const observer = new IntersectionObserver((entries) => {
            // entries는 관찰되는 모든 요소를 담은 배열입니다.
            entries.forEach(entry => {
                // isIntersecting은 요소가 뷰포트와 교차하는지(보이는지) 여부를 나타내는 boolean 값입니다.
                if (entry.isIntersecting) {
                    // 요소가 보이면 'visible' 클래스를 추가하여 애니메이션을 트리거합니다.
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1 // 요소가 10% 보였을 때 콜백 함수를 실행합니다.
        });

        // 애니메이션을 적용할 모든 요소를 선택합니다.
        const fadeElements = document.querySelectorAll('.fade-in');
        
        // 각 요소를 관찰 대상으로 등록합니다.
        fadeElements.forEach(el => observer.observe(el));
    }
});