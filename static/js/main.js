var currentHealth, maximumHealth, ultimateLevel, missingHealth, trueDamage;

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
}

// 사용자 설정 모드
function customMode()
{
    document.getElementById('introduce').innerHTML = "티모의 현재 체력과 최대 체력을 입력하고 궁극기 아이콘을 클릭해보세요!";
    document.querySelector('.testMode').style.display = 'none';
    document.querySelector('.customMode').style.display = 'block';
}

// 시험 모드
function testMode()
{
    document.getElementById('introduce').innerHTML = "티모의 체력바를 보고 킬각인지 아닌지 맞혀보세요!";
    document.querySelector('.testMode').style.display = 'block';
    document.querySelector('.customMode').style.display = 'none';
}