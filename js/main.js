(() => {
    let yOffset = 0;
    let prevScrollHeight = 0; // 현재 스크롤위치 보다
    let currentScene = 0; // 현재 활성화 된 씬
    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                massageA: document.querySelector('#scroll-section-0 .main-message .a'),
                massageB: document.querySelector('#scroll-section-0 .main-message .b'),
                massageC: document.querySelector('#scroll-section-0 .main-message .c'),
                massageD: document.querySelector('#scroll-section-0 .main-message .d')

            },
            values: {
                messageA_opacity: [0, 1] // 투명도 0 - 1

            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        }
    ];
    // 각 장면 scrollHeight 세팅
    function setLayout () {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            // ??? 5배 브라우저 길이 때문에
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if ( totalScrollHeight > yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    function playAnimation () {
        // 스크롤 될 때  현재 장면만 스타일 적용
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight;
        switch (currentScene) {
            case 0:
                //css
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];

                break;
            case 1:
                break;
            case 2:
                break;
            case 3:

                break;
        }
    }
    // 각 세션마다  범의 내에서 값을 보여야함
    // 현재 스크롤 섹션에서 얼마나 스크롤이 됬는지 필요 (비율)
    function calcValues(value, currentYOffset) {



    }


    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }

        if (yOffset < prevScrollHeight) {
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
            if (currentScene === 0) return;
            currentScene--;
        }



        document.body.setAttribute('id', `show-scene-${currentScene}`)
        playAnimation();
    }




    window.addEventListener("scroll", () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    window.addEventListener("DomContentedLoad",setLayout );
    window.addEventListener("load", setLayout );
    window.addEventListener("resize", setLayout);

    setLayout();
})();


