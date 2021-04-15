var currentHealth, maximumHealth, ultimateLevel, missingHealth, trueDamage;
var errorRange, currentKill = 0, maximumKill = 0;

// min 이상 max 이하인 정수 난수 생성 함수
function getRandomInt(min, max)
{
    min = Math.ceil(min); // Math.ceil(): 인자보다 크거나 같은 최소 정수 반환
    max = Math.floor(max); // Math.floor(): 인자보다 작거나 같은 최대 정수 반환
    return Math.floor(Math.random() * (max - min + 1)) + min; // Math.random(): 0 이상 1 미만의 구간에서 근사적으로 균일한(approximately uniform) 부동소숫점 의사난수를 반환. 암호학적으로 안전한 난수를 제공하지는 않음
}

// 데마시아의 정의(Demacian Justice) 시뮬레이터
function demacianJustice()
{
    currentHealth = document.getElementById('currentHealth').value;
    maximumHealth = document.getElementById('maximumHealth').value;
    ultimateLevel = document.getElementById('ultimateLevel').value;
    missingHealth = maximumHealth - currentHealth;

    // 에러 체크
    if (currentHealth == "" || maximumHealth == "" || ultimateLevel == "")
    {
        alert('올바른 값을 입력해주세요.');
        return;
    }
    else if (currentHealth < 1 || maximumHealth < 1)
    {
        alert('현재 체력과 최대 체력의 최솟값은 1입니다.')
        return;
    }
    else if (ultimateLevel < 1 || 3 < ultimateLevel)
    {
        alert('궁극기 레벨은 최소 1, 최대 3입니다.');
        return;
    }
    else if (missingHealth < 0)
    {
        alert('현재 체력이 최대 체력보다 높습니다.');
        return;
    }

    // 가렌 궁극기의 고정 대미지 계산 공식(대미지는 소수점 셋째 자리에서 반올림)
    trueDamage = (ultimateLevel * 150 + missingHealth * (0.15 + 0.05 * ultimateLevel)).toFixed(2);

    /*
    ** 자바스크립트에서 정수와 실수를 비교하면 무조건 실수가 크다고 판단하므로
    ** 정수를 실수로 바꿔서(parseFloat 함수 사용) 값을 비교해주어야 함
    */
    if (trueDamage < parseFloat(currentHealth))
    {
        var rand = getRandomInt(1, 3);
        var teemoLaugh = new Audio('static/sound/Teemo_laugh' + rand + '.mp3')

        teemoLaugh.play();
        alert('티모가 살았습니다!');
    }
    else // (trueDamage >= currentHealth)
    {
        var teemoKill = new Audio('static/sound/jotmo_cut.wav')

        teemoKill.play();
        alert('티모가 죽었습니다!');
    }
}

// 체력바 실시간 조정
function healthBar()
{
    document.getElementById('healthBar').value = document.getElementById('currentHealth').value;
    document.getElementById('healthBar').max = document.getElementById('maximumHealth').value;
    document.querySelector('.HP').innerHTML = document.getElementById('healthBar').value + '/' + document.getElementById('healthBar').max;
}

// 사용자 설정 모드
function customMode()
{
    // 설정 초기화
    document.querySelector('#currentHealth').value = 1;
    document.querySelector('#maximumHealth').value = 1;
    document.querySelector('#ultimateLevel').value = 1;
    healthBar();
    
    document.getElementById('introduce').innerHTML = "티모의 현재 체력과 최대 체력을 입력하고 궁극기 아이콘을 클릭해보세요!";
    document.querySelector('.testMode').style.display = 'none';
    document.querySelector('.customMode').style.display = 'block';
}

// 킬각 확인
function isKillgak(bool)
{
    if (trueDamage < parseFloat(currentHealth) && bool == 0 || trueDamage >= parseFloat(currentHealth) && bool == 1)
    {
        alert('정답입니다!');
        currentKill++;
        if (maximumKill < currentKill)
            maximumKill = currentKill;
    }
    else
    {
        alert('틀렸습니다.')
        currentKill = 0;
    }
    test();
}

// 오차 범위 설정 함수
function setErrorRange()
{
    if (currentKill < 70)
        errorRange = Math.pow(10, 3 - parseInt(currentKill / 10));
    else // (40 <= currentKill)
        errorRange = 1;
}

// 시험
function test()
{
    setErrorRange();

    ultimateLevel = getRandomInt(1, 3);
    // 오차 범위 이내의 값이 설정될 때까지 반복
    do {
        maximumHealth = getRandomInt(475, 10000) // 2021/4/15 기준 1레벨 챔피언 최저 체력(나미, 475) 이상 10000 이하로 설정.
        currentHealth = getRandomInt(1, maximumHealth);
        missingHealth = maximumHealth - currentHealth;
        trueDamage = (ultimateLevel * 150 + missingHealth * (0.15 + 0.05 * ultimateLevel)).toFixed(2);
    } while (!(parseFloat(-1 * errorRange) <= trueDamage - parseFloat(currentHealth) && trueDamage - parseFloat(currentHealth) <= parseFloat(errorRange)));

    document.getElementById('healthBar').value = currentHealth;
    document.getElementById('healthBar').max = maximumHealth;
    document.querySelector('.HP').innerHTML = currentHealth + '/' + maximumHealth;

    document.querySelector('.currentKill').innerHTML = "현재 연속 킬 수: " + currentKill;
    document.querySelector('.maximumKill').innerHTML = "최대 연속 킬 수: " + maximumKill;
    document.querySelector('.testRlevel').innerHTML = "궁극기 레벨: " + ultimateLevel;
}

// 시험 모드
function testMode()
{
    document.getElementById('introduce').innerHTML = "궁극기 레벨과 티모의 체력바를 보고 킬각인지 아닌지 맞혀보세요!";
    document.querySelector('.testMode').style.display = 'block';
    document.querySelector('.customMode').style.display = 'none';
    test();
}