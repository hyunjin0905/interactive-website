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
                container: document.querySelector('#scroll-section-0')
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

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        console.log(prevScrollHeight);
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }

        if (yOffset < prevScrollHeight) {
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
            if (currentScene === 0) return;
            currentScene--;
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`)

        console.log("current", currentScene);
    }

    window.addEventListener("scroll", () => {
        console.log("window.pageYOffset",window.pageYOffset);
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    window.addEventListener("DomContentedLoad",setLayout );
    window.addEventListener("load", setLayout );
    window.addEventListener("resize", setLayout);

    setLayout();
})();


